import React from 'react';
import { useTheme } from '../ThemeContext';
import { ThemeID, ViewState } from '../types';
import { useSound } from '../hooks/useSound';
import BackgroundGrid from './BackgroundGrid';

interface LayoutProps {
  children: React.ReactNode;
  viewName: string;
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, viewName, onNavigate, currentView, isLoggedIn, onLogout }) => {
  const { colors, theme, setTheme } = useTheme();
  const { play } = useSound();

  const cycleTheme = () => {
    play('click');
    const themes: ThemeID[] = ['matrix', 'amber', 'arctic', 'synthwave'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const handleNav = (v: ViewState) => {
    play('click');
    onNavigate(v);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-8 font-mono overflow-x-hidden bg-black">
      {/* Window Wrapper */}
      <div 
        className="w-full max-w-6xl h-[92vh] sm:h-[85vh] bg-black/40 border-[1px] rounded-lg overflow-hidden flex flex-col relative transition-all duration-500 backdrop-blur-sm"
        style={{ borderColor: colors.primary, boxShadow: `0 0 40px -10px ${colors.glow}` }}
      >
        {/* The 3D Grid Floor - Rendered inside the window container */}
        <BackgroundGrid />

        {/* CRT Scanline */}
        <div className="scanline"></div>

        {/* Header Bar */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 sm:h-16 shrink-0 select-none z-20 border-b-[1px] transition-colors duration-500 gap-3"
          style={{ 
            borderColor: `${colors.primary}33`,
            backgroundColor: `${colors.secondary}ee`, 
            backdropFilter: 'blur(12px)'
          }}
        >
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-[10px] sm:text-sm font-bold tracking-widest uppercase ml-2" style={{ color: colors.primary }}>
              TeamXD Terminal
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleNav('home')}
              onMouseEnter={() => play('hover')}
              className={`px-3 sm:px-4 py-1.5 border text-[9px] sm:text-[10px] font-bold uppercase transition-all hover:bg-white/10 ${currentView === 'home' ? 'bg-white/20' : ''}`}
              style={{ borderColor: `${colors.primary}44`, color: colors.primary }}
            >
              Home
            </button>

            {isLoggedIn && (
              <button
                onClick={() => handleNav('dashboard')}
                onMouseEnter={() => play('hover')}
                className={`px-3 sm:px-4 py-1.5 border text-[9px] sm:text-[10px] font-bold uppercase transition-all hover:bg-white/10 ${currentView === 'dashboard' ? 'bg-white/20' : ''}`}
                style={{ borderColor: `${colors.primary}44`, color: colors.primary }}
              >
                Dashboard
              </button>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  play('click');
                  onLogout();
                }}
                onMouseEnter={() => play('hover')}
                className="px-3 sm:px-4 py-1.5 border text-[9px] sm:text-[10px] font-bold uppercase transition-all bg-red-500/10 hover:bg-red-500/20"
                style={{ borderColor: `rgba(239, 68, 68, 0.4)`, color: '#ef4444' }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => handleNav('login')}
                onMouseEnter={() => play('hover')}
                className={`px-3 sm:px-4 py-1.5 border text-[9px] sm:text-[10px] font-bold uppercase transition-all hover:bg-white/10 ${currentView === 'login' ? 'bg-white/20' : ''}`}
                style={{ borderColor: `${colors.primary}44`, color: colors.primary }}
              >
                Login
              </button>
            )}
            
            <button
              onClick={cycleTheme}
              onMouseEnter={() => play('hover')}
              className="px-3 sm:px-4 py-1.5 border text-[9px] sm:text-[10px] font-bold uppercase transition-all hover:bg-white/10"
              style={{ borderColor: colors.primary, color: colors.primary, backgroundColor: `${colors.primary}11` }}
            >
              <span className="hidden xs:inline">Theme: </span><span className="capitalize">{theme}</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto relative z-10 custom-scrollbar overflow-x-hidden">
          {children}
        </main>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        @media (min-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.primary};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${colors.accent};
        }
      `}</style>
    </div>
  );
};

export default Layout;