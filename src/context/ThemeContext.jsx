import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Auto Theme Logic based on local time
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour <= 6; // Night between 7PM to 6AM
    
    setTheme(isNight ? 'dark' : 'light');
    
    // Toggle body classes for both internal CSS and Tailwind
    if (isNight) {
      document.body.classList.add('dark-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
