import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';

const script = readFileSync(new URL('../src/public/static/theme.js', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/public/static/style.css', import.meta.url), 'utf8');

function luminance(hex: string) {
  const digits = hex.slice(1);
  const expanded = digits.length === 3 ? [...digits].map(digit => digit + digit).join('') : digits;
  const channels = expanded.match(/.{2}/g)!.map(channel => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(first: string, second: string) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

function setup(storedTheme: string | null, systemDark = false, storageBlocked = false) {
  const root = { dataset: {} as { theme?: string } };
  const preference = { matches: systemDark, addEventListener: vi.fn() };
  const toggle = { hidden: true, setAttribute: vi.fn(), addEventListener: vi.fn() };
  const themeColor = { setAttribute: vi.fn() };
  const document = {
    documentElement: root,
    querySelector: () => themeColor,
    getElementById: () => toggle,
    addEventListener: vi.fn(),
  };
  const localStorage = {
    getItem: vi.fn(() => {
      if (storageBlocked) throw new Error('Storage unavailable');
      return storedTheme;
    }),
    setItem: vi.fn(() => {
      if (storageBlocked) throw new Error('Storage unavailable');
    }),
  };

  runInNewContext(script, { document, localStorage, window: { matchMedia: () => preference } });
  document.addEventListener.mock.calls[0][1]();
  return { root, preference, toggle, themeColor, localStorage };
}

describe('theme switch', () => {
  it('follows changes to the system preference until a theme is selected', () => {
    const { root, preference, toggle, themeColor } = setup(null);
    expect(root.dataset.theme).toBeUndefined();
    expect(toggle.hidden).toBe(false);
    expect(toggle.setAttribute).toHaveBeenLastCalledWith('aria-pressed', 'false');

    preference.matches = true;
    preference.addEventListener.mock.calls[0][1]();
    expect(toggle.setAttribute).toHaveBeenLastCalledWith('aria-pressed', 'true');
    expect(themeColor.setAttribute).toHaveBeenLastCalledWith('content', '#1b1b1b');
  });

  describe('theme colors', () => {
    const light = styles.match(/:root\s*\{([^}]+)\}/)![1];
    const dark = styles.match(/:root\[data-theme="dark"\]\s*\{([^}]+)\}/)![1];
    const systemDark = styles.match(/:root:not\(\[data-theme\]\)\s*\{([^}]+)\}/)![1];

    function tokens(block: string) {
      return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[\da-f]+)/gi)].map(match => [match[1], match[2]]));
    }

    it.each([['light', light], ['dark', dark]])('%s colors meet normal text contrast requirements', (_, block) => {
      const colors = tokens(block);
      for (const [foreground, background] of [
        ['text', 'background'],
        ['link', 'background'],
        ['muted', 'background'],
        ['surface-text', 'surface'],
        ['muted', 'surface'],
        ['text', 'surface'],
      ]) {
        expect(contrast(colors[foreground], colors[background])).toBeGreaterThanOrEqual(4.5);
      }
    });

    it('uses the same dark colors for system and explicit preferences', () => {
      expect(tokens(systemDark)).toEqual(tokens(dark));
    });
  });

  it('persists an explicit selection and ignores subsequent system changes', () => {
    const { root, preference, toggle, localStorage } = setup(null, true);
    toggle.addEventListener.mock.calls[0][1]();
    expect(root.dataset.theme).toBe('light');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(toggle.setAttribute).toHaveBeenLastCalledWith('aria-pressed', 'false');

    preference.matches = false;
    preference.addEventListener.mock.calls[0][1]();
    expect(toggle.setAttribute).toHaveBeenLastCalledWith('aria-pressed', 'false');
    toggle.addEventListener.mock.calls[0][1]();
    expect(root.dataset.theme).toBe('dark');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('theme', 'dark');
  });

  it('restores a valid saved theme and ignores invalid values', () => {
    expect(setup('dark').root.dataset.theme).toBe('dark');
    expect(setup('light', true).root.dataset.theme).toBe('light');
    expect(setup('invalid', true).root.dataset.theme).toBeUndefined();
  });

  it('still switches themes when storage is unavailable', () => {
    const { root, toggle } = setup(null, false, true);
    toggle.addEventListener.mock.calls[0][1]();
    expect(root.dataset.theme).toBe('dark');
    expect(toggle.setAttribute).toHaveBeenLastCalledWith('aria-pressed', 'true');
  });
});
