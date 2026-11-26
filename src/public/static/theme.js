(() => {
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  let savedTheme;

  try {
    savedTheme = localStorage.getItem('theme');
  } catch {
    // The theme switch still works when storage is unavailable.
  }

  if (savedTheme === 'light' || savedTheme === 'dark') {
    root.dataset.theme = savedTheme;
  }

  function isDark() {
    return root.dataset.theme ? root.dataset.theme === 'dark' : preference.matches;
  }

  function updateTheme() {
    const dark = isDark();
    themeColor?.setAttribute('content', dark ? '#1b1b1b' : '#FFFFFF');
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.hidden = false;
    }
  }

  updateTheme();
  preference.addEventListener('change', updateTheme);
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    updateTheme();
    toggle?.addEventListener('click', () => {
      const theme = isDark() ? 'light' : 'dark';
      root.dataset.theme = theme;
      try {
        localStorage.setItem('theme', theme);
      } catch {
        // Keep the selected theme for this page even if it cannot be saved.
      }
      updateTheme();
    });
  });
})();
