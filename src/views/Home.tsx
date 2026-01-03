import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { Video, Globe, Palette, X, Mail, Phone, ShieldCheck, Cpu, Wifi } from 'lucide-react';
import { ViewState } from '../types';
import Typewriter from '../components/Typewriter';
import { useSound } from '../hooks/useSound';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
  isLoggedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ onNavigate, isLoggedIn }) => {
  const { colors } = useTheme();
  const { play } = useSound();
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="relative min-h-full">
      <div className="space-y-16 sm:space-y-24 pb-32">
        {/* Hero Section */}
        <section className="space-y-6 sm:space-y-8 max-w-4xl">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight min-h-[4.5rem] sm:min-h-[6rem] md:min-h-[7.5rem]"
            style={{ color: colors.primary }}
          >
            <Typewriter 
              text="Crafting Visual Stories That Resonate" 
              speed={20} 
              onChar={() => play('typing')}
              onComplete={() => play('success')}
            />
          </h1>
          <p className="text-sm sm:text-base md:text-lg opacity-80 max-w-2xl leading-relaxed" style={{ color: colors.primary }}>
            We're a creative agency specializing in video editing, website design, and graphic design.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => {
                play('click');
                onNavigate('login');
              }}
              onMouseEnter={() => play('hover')}
              className="w-full sm:w-auto px-8 py-3 sm:py-4 border-2 text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] transition-all hover:bg-[var(--primary)] hover:text-black"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Get Started'}
            </button>
            {/* Portfolio button removed as requested */}
          </div>
        </section>

        {/* Services Section */}
        <section className="space-y-12 flex flex-col items-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-widest uppercase" style={{ color: colors.primary }}>
              <Typewriter text="Our Services" speed={40} delay={1000} showCursor={false} />
            </h2>
            <p className="text-xs sm:text-sm opacity-60 max-w-lg font-mono tracking-widest" style={{ color: '#fff' }}>
              We offer a range of creative services to help your business thrive.
            </p>
          </div>

          <div className="w-full max-w-2xl space-y-6">
            <ServiceCard 
              title="Video Editing"
              icon={<Video size={18} className="text-white" />}
              description="Cinematic cuts, reels, promos."
              onExplore={() => {
                play('click');
                setShowContact(true);
              }}
            />
            <ServiceCard 
              title="Website Design"
              icon={<Globe size={18} className="text-white" />}
              description="Responsive, modern, user-friendly."
              onExplore={() => {
                play('click');
                setShowContact(true);
              }}
            />
            <ServiceCard 
              title="Graphic Design"
              icon={<Palette size={18} className="text-white" />}
              description="Logos, branding, marketing assets."
              onExplore={() => {
                play('click');
                setShowContact(true);
              }}
            />
          </div>
        </section>
      </div>

      {/* Footer Status Bar */}
      <footer 
        className="mt-12 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 border rounded-sm shrink-0 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider select-none transition-all duration-700 gap-2 sm:gap-0"
        style={{ 
          borderColor: `${colors.primary}33`,
          backgroundColor: `${colors.secondary}ee`,
          backdropFilter: 'blur(12px)',
          color: colors.primary,
          boxShadow: `0 0 20px -5px ${colors.glow}`
        }}
      >
        <div className="flex items-center gap-4 sm:gap-6 order-2 sm:order-1">
          <div className="flex items-center gap-2 opacity-60">
            <Cpu size={10} />
            <span>CORE_TEMP: 34°C</span>
          </div>
          <div className="flex items-center gap-2 opacity-60">
            <Wifi size={10} />
            <span>LATENCY: 24MS</span>
          </div>
        </div>

        <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center gap-2 order-1 sm:order-2">
          <span className="opacity-40 text-[7px] sm:text-[9px]">Made with ❤️ by</span>
          <span className="animate-pulse" style={{ color: colors.accent }}>Nitheesh and Mythrean</span>
        </div>

        <div className="flex items-center gap-4 opacity-60 order-3">
          <span>OS_VER: 1.0.42_X</span>
          <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: colors.primary }}></div>
        </div>
      </footer>

      {/* Contact Overlay Modal */}
      {showContact && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowContact(false)} />
          <div className="w-full max-w-lg bg-black border-2 relative z-10 p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-200" style={{ borderColor: colors.primary }}>
            <div className="flex justify-between items-start mb-10">
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest" style={{ color: colors.primary }}>COMM_ESTABLISHED</h3>
              <button onClick={() => setShowContact(false)} className="p-2 hover:bg-white/10" style={{ color: colors.primary }}><X size={20} /></button>
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase opacity-40" style={{ color: colors.primary }}>Gmail</span>
                <p className="text-lg sm:text-xl font-mono font-bold" style={{ color: colors.primary }}>mythreanxd@gmail.com</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase opacity-40" style={{ color: colors.primary }}>Gmail</span>
                <p className="text-lg sm:text-xl font-mono font-bold" style={{ color: colors.primary }}>knitheesh0360@gmail.com</p>
              </div>
            </div>
            <button onClick={() => setShowContact(false)} className="w-full mt-8 py-4 border-2 font-black uppercase text-[11px] tracking-widest" style={{ borderColor: colors.primary, color: colors.primary }}>[ TERMINATE ]</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ServiceCard: React.FC<{ title: string; icon: React.ReactNode; description: string; onExplore: () => void }> = ({ title, icon, description, onExplore }) => {
  const { colors } = useTheme();
  const { play } = useSound();
  return (
    <div 
      className="border-2 p-6 space-y-4 bg-black/80 transition-all hover:translate-y-[-2px] group relative"
      style={{ borderColor: colors.primary, boxShadow: `0 0 15px ${colors.glow}22` }}
      onMouseEnter={() => play('hover')}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold" style={{ color: colors.primary }}>&gt;</span>
        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide" style={{ color: colors.primary }}>{title}</h3>
      </div>
      <p className="text-xs sm:text-sm opacity-80 font-mono tracking-tight" style={{ color: '#fff' }}>{description}</p>
      <button 
        onClick={onExplore}
        className="w-full py-3 text-black font-black uppercase text-xs tracking-[0.3em] hover:brightness-110 transition-all shadow-lg active:scale-[0.98]"
        style={{ backgroundColor: colors.primary }}
      >
        Explore Service
      </button>
    </div>
  );
};

export default Home;