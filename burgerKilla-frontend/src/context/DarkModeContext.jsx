import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [themeSelected, setThemeSelected] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    } else {
      return 'light';
    }
  });

  useEffect(
    function () {
      localStorage.setItem('theme', themeSelected);
    },
    [themeSelected],
  );

  function handleTheme(theme) {
    setThemeSelected(theme);
  }
  return (
    <DarkModeContext.Provider value={[themeSelected, handleTheme]}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDakMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    return new Error('DarkModeContext is used outside the provider');
  }

  return context;
}

export { DarkModeProvider, useDakMode };
