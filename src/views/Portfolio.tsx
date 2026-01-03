
import React from 'react';
import { useTheme } from '../ThemeContext';
import { ExternalLink, Github } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { colors } = useTheme();

  const projects = [
    {
      title: 'NEURAL_DASH_v1',
      desc: 'Decentralized monitoring system for edge node analytics.',
      tags: ['React', 'D3.js', 'Web3'],
      status: 'Stable'
    },
    {
      title: 'CRYPTO_CORE_SEC',
      desc: 'Open-source encryption library for modern web protocols.',
      tags: ['TypeScript', 'WASM', 'Rust'],
      status: 'Dev'
    },
    {
      title: 'DARK_NET_UI',
      desc: 'Experimental high-contrast interface for restricted access terminals.',
      tags: ['Tailwind', 'Motion', 'React'],
      status: 'Legacy'
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold uppercase tracking-tighter" style={{ color: colors.primary }}>
        // DECRYPTED_ASSETS
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((p, i) => (
          <div 
            key={i} 
            className="p-6 border-2 group hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
            style={{ borderColor: `${colors.primary}44` }}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 transition-transform group-hover:scale-150 rotate-45 opacity-10" style={{ backgroundColor: colors.primary }}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 border" style={{ borderColor: colors.primary, color: colors.primary }}>
                  {p.status}
                </span>
                <h3 className="text-xl font-bold mt-2 uppercase" style={{ color: colors.primary }}>{p.title}</h3>
              </div>
              <div className="flex gap-4">
                <Github size={18} className="cursor-pointer hover:scale-110 transition-transform" style={{ color: colors.primary }} />
                <ExternalLink size={18} className="cursor-pointer hover:scale-110 transition-transform" style={{ color: colors.primary }} />
              </div>
            </div>

            <p className="text-sm opacity-70 mb-4 max-w-xl" style={{ color: colors.accent }}>{p.desc}</p>
            
            <div className="flex flex-wrap gap-2">
              {p.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase font-mono tracking-widest opacity-60" style={{ color: colors.primary }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
