 const switchInput = document.getElementById('themeToggle');
  const darkLink    = document.getElementById('darkStylesheet');
  const storedTheme = localStorage.getItem('theme');

  // Init: zet de stylesheet en checkbox volgens eerder opgeslagen voorkeur of OS‐instelling
  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    darkLink.disabled   = false;
    switchInput.checked = true;
  } else {
    darkLink.disabled   = true;
    switchInput.checked = false;
  }

  // Luister naar wijzigingen op de checkbox
  switchInput.addEventListener('change', () => {
    if (switchInput.checked) {
      darkLink.disabled = false;
      localStorage.setItem('theme','dark');
    } else {
      darkLink.disabled = true;
      localStorage.setItem('theme','light');
    }
  });