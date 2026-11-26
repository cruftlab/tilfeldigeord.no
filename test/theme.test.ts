import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';

const script = readFileSync(new URL('../src/public/static/theme.js', import.meta.url), 'utf8');

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
