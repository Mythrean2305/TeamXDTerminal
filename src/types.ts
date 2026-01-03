
export type ThemeID = 'matrix' | 'amber' | 'arctic' | 'synthwave';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  glow: string;
}

// Removed 'portfolio' to satisfy request
export type ViewState = 'home' | 'login' | 'dashboard' | 'contact';

export interface Command {
  label: string;
  action: ViewState;
  icon?: string;
}