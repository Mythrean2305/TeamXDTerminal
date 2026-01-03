
import React from 'react';
import { useTheme } from '../ThemeContext';
import { ViewState, Command } from '../types';
import { Terminal, Activity, LogIn } from 'lucide-react';

interface CommandNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isLoggedIn: boolean;
}

const CommandNav: React.FC<CommandNavProps> = ({ currentView, onNavigate, isLoggedIn }) => {
  const { colors } = useTheme();

  const commands: Command[] = [
    { label: 'whoami', action: 'home' },
    { label: 'sudo /dashboard', action: 'dashboard' },
    // Only show login if not already logged in
    ...(!isLoggedIn ? [{ label: 'auth /login', action: 'login' as ViewState }] : []),
    { label: 'cat /contact', action: 'contact' },
  ];

  // Filter commands based on auth status
  const visibleCommands = commands.filter(cmd => {
    if (cmd.action === 'dashboard' && !isLoggedIn) return false;
    return true;
  });

  return (
    <nav className="flex flex-wrap gap-4 mt-12 pt-8 border-t" style={{ borderColor: `${colors.primary}33` }}>
      {visibleCommands.map((cmd) => (
        <button
          key={cmd.action}
          onClick={() => onNavigate(cmd.action)}
          className={`glitch-hover px-4 py-2 text-sm font-mono border transition-all duration-200 uppercase flex items-center gap-2 ${
            currentView === cmd.action 
              ? 'bg-[var(--primary)] text-black font-bold' 
              : 'hover:bg-[var(--primary)] hover:text-black'
          }`}
          style={{ 
            borderColor: colors.primary, 
            boxShadow: currentView === cmd.action ? `0 0 10px ${colors.glow}` : 'none',
            color: currentView === cmd.action ? '#000' : colors.primary
          }}
        >
          {cmd.action === 'dashboard' ? <Activity size={14} /> : 
           cmd.action === 'login' ? <LogIn size={14} /> :
           <Terminal size={14} />}
          {cmd.label}
        </button>
      ))}
    </nav>
  );
};

export default CommandNav;
