
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'natural' | 'dark' | 'light' | 'blue';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Check if a theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeType) || 'natural';
  });

  useEffect(() => {
    // Save theme to localStorage when it changes
    localStorage.setItem('theme', theme);
    
    // Apply theme class to document body
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
