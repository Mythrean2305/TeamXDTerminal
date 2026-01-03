import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeID, ThemeColors } from './types';

interface ThemeContextType {
  theme: ThemeID;
  setTheme: (theme: ThemeID) => void;
  colors: ThemeColors;
}

const themes: Record<ThemeID, ThemeColors> = {
  matrix: {
    primary: '#00ff66',
    secondary: '#001a0a',
    accent: '#aaffcc',
    bg: '#000000',
    glow: 'rgba(0, 255, 102, 0.4)'
  },
  amber: {
    primary: '#FFB000',
    secondary: '#332200',
    accent: '#FFE0A3',
    bg: '#0a0a0a',
    glow: 'rgba(255, 176, 0, 0.5)'
  },
  arctic: {
    primary: '#00F0FF',
    secondary: '#002B36',
    accent: '#E0FFFF',
    bg: '#0a0a0a',
    glow: 'rgba(0, 240, 255, 0.5)'
  },
  synthwave: {
    primary: '#FF00FF',
    secondary: '#330033',
    accent: '#FFB3FF',
    bg: '#0a0a0a',
    glow: 'rgba(255, 0, 255, 0.5)'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeID>('matrix');

  useEffect(() => {
    const root = document.documentElement;
    const colors = themes[theme];
    root.style.setProperty('--primary', colors.primary);
    // Increased opacity for grid lines to match reference image vibrancy (hex 55 instead of 44)
    root.style.setProperty('--primary-fade', `${colors.primary}55`);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--bg', colors.bg);
    root.style.setProperty('--glow', colors.glow);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};