import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import Typewriter from '../components/Typewriter';
import { Calendar, Activity, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

interface DashboardProps {
  username: string;
}

interface TimelineEvent {
  date: string;
  event: string;
  description: string;
}

interface DocumentAsset {
  id: string;
  title: string;
  filename: string;
  size: string;
  url: string;
}

const Dashboard: React.FC<DashboardProps> = ({ username }) => {
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const timelineData: TimelineEvent[] = [
    { date: '2026-01-01', event: 'UNDERSTANDING THE ASSIGNMENT', description: 'Understanding the assignment and making sure all functionalities of the assignment is understood.' },
    { date: '2026-01-03', event: 'DESIGNING ', description: 'Designing the website with the ideas from STEP 1.' },
    { date: '2026-01-08', event: 'DEVELOPMENT', description: 'Developing the website.' },
    { date: '2026-01-17', event: 'TESTING 1', description: 'Testing for bugs and glitches.' },
    { date: '2026-01-18', event: 'REVIEW', description: 'Review from the client to ensure all things are satisfied' },
    { date: '2026-01-26', event: 'FINAL_HANDOVER', description: 'Handovering the website to the client' },
  ];

  const documents: DocumentAsset[] = [
    {
      id: 'doc-1',
      title: 'Software Requirements',
      filename: 'srs.pdf',
      size: '1.4 MB',
      url: 'https://drive.google.com/file/d/1WyWIMmfPwUKfgF7Jky6TwLcLYqxZcpEC/view?usp=share_link'
    },
    {
      id: 'doc-2',
      title: '',
      filename: 'non-disclosure-agreement.pdf',
      size: '2.1 MB',
      url: 'https://drive.google.com/file/d/1rann62ezO-WjIETlAF2GT9Aqkq9ot6s5/view?usp=share_link'
    }
  ];

  const systemLogs = [
    { time: '14:02:11', status: 'OK', msg: 'Creating the documents' }
  ];

  // Calculate progress percentage for the completion line
  const progressPercentage = (activeIndex / (timelineData.length - 1)) * 100;

  return (
    <div className="space-y-12 sm:space-y-16 font-mono pb-20 md:pb-32 overflow-x-hidden">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="space-y-2">
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2 sm:gap-4 break-all"
            style={{ color: colors.primary }}
          >
            <span className="shrink-0">&gt;</span>
            <Typewriter text={username.toLowerCase()} speed={40} showCursor={false} />
          </h1>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-40 ml-6 sm:ml-10" style={{ color: colors.accent }}>
            Session established_active_node
          </p>
        </div>
      </div>

      {/* Terminal Content Sections */}
      <div className="space-y-16 sm:space-y-24">
        
        {/* Project Details Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-base sm:text-lg font-bold" style={{ color: colors.primary }}>
            <span className="opacity-80">&gt;</span>
            <Typewriter text="project_details" speed={30} delay={500} />
          </div>
          <div className="pl-4 sm:pl-10 border-l-[1px] py-2 ml-1" style={{ borderColor: `${colors.primary}44` }}>
            <div className="bg-white/5 p-4 sm:p-6 border border-dashed border-white/10 rounded-sm">
              <p className="opacity-70 text-xs sm:text-sm md:text-base leading-relaxed tracking-wide italic" style={{ color: colors.primary }}>
                "This project is about creating a clean, engaging website that clearly explains what Verzz is and why it matters. 
                The focus is on strong branding, smooth user experience, and building trust with users and potential investors. 
                From design to deployment, the goal is to deliver a polished, reliable website that reflects the quality of the product behind it."
              </p>
              <div className="mt-4 flex gap-4">
                <div className="h-1 flex-1 bg-white/5 overflow-hidden">
                  <div className="h-full w-1/3 animate-pulse" style={{ backgroundColor: colors.primary }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-base sm:text-lg font-bold" style={{ color: colors.primary }}>
            <span className="opacity-80">&gt;</span>
            <Typewriter text="cat /var/log/timeline" speed={30} delay={1000} />
          </div>

          <div className="pl-4 sm:pl-10 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest" style={{ color: colors.primary }}>Timeline</h2>
            
            <div className="relative py-8 overflow-x-auto no-scrollbar pb-6">
              {/* Ghost Background Line (Track) */}
              <div 
                className="absolute top-[52px] sm:top-1/2 left-0 w-[600px] sm:w-full h-[1px] -translate-y-1/2" 
                style={{ backgroundColor: `${colors.primary}22` }}
              ></div>
              
              {/* Dynamic Progress/Completion Line */}
              <div 
                className="absolute top-[52px] sm:top-1/2 left-0 h-[2px] -translate-y-1/2 transition-all duration-700 ease-in-out" 
                style={{ 
                  backgroundColor: colors.primary, 
                  width: `calc(${progressPercentage}% * (600 / 600))`, 
                  maxWidth: '100%',
                  boxShadow: `0 0 10px ${colors.glow}`
                }}
              ></div>
              
              <div className="flex justify-between items-center relative z-10 w-[600px] sm:w-full min-w-full px-4 sm:px-0">
                {timelineData.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="group relative flex flex-col items-center justify-center"
                    aria-label={`View milestone ${index + 1}`}
                  >
                    <div 
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm font-bold ${activeIndex >= index ? 'scale-110' : 'hover:scale-110'}`}
                      style={{ 
                        backgroundColor: activeIndex >= index ? colors.primary : 'black',
                        borderColor: colors.primary,
                        color: activeIndex >= index ? 'black' : colors.primary,
                        boxShadow: activeIndex === index ? `0 0 15px ${colors.glow}` : 'none'
                      }}
                    >
                      {index + 1}
                    </div>
                    {activeIndex === index && (
                      <div className="absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full animate-ping opacity-40" style={{ backgroundColor: colors.primary }}></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div 
              className="p-4 sm:p-6 border bg-black/40 backdrop-blur-sm min-h-[140px] sm:min-h-[160px] flex flex-col justify-center transition-all duration-500"
              style={{ borderColor: `${colors.primary}22` }}
            >
              <div key={activeIndex} className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-2">
                  <Calendar size={14} style={{ color: colors.accent }} />
                  <span className="text-[9px] sm:text-xs font-bold uppercase opacity-60" style={{ color: colors.accent }}>
                    TIMESTAMP: {timelineData[activeIndex].date}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-black tracking-widest uppercase" style={{ color: colors.primary }}>
                  {timelineData[activeIndex].event}
                </h3>
                
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed max-w-2xl italic" style={{ color: colors.primary }}>
                  {timelineData[activeIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-base sm:text-lg font-bold" style={{ color: colors.primary }}>
            <span className="opacity-80">&gt;</span>
            <Typewriter text="tail -f /var/log/system" speed={30} delay={1500} />
          </div>

          <div className="pl-4 sm:pl-10 space-y-6">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest flex items-center gap-3" style={{ color: colors.primary }}>
              <Activity size={20} />
              Logs
            </h2>
            
            <div className="space-y-2 border-l-[1px] pl-4 sm:pl-6 overflow-x-auto" style={{ borderColor: `${colors.primary}22` }}>
              {systemLogs.map((log, i) => (
                <div key={i} className="flex gap-2 sm:gap-4 text-[9px] sm:text-xs font-mono opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span style={{ color: colors.accent }}>[{log.time}]</span>
                  <span className="font-bold" style={{ color: log.status === 'OK' ? '#10b981' : log.status === 'WARN' ? '#f59e0b' : colors.primary }}>
                    [{log.status}]
                  </span>
                  <span style={{ color: colors.primary }}>{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* File Access Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-base sm:text-lg font-bold" style={{ color: colors.primary }}>
            <span className="opacity-80">&gt;</span>
            <Typewriter text="cat secure_document.ptr" speed={30} delay={2000} />
          </div>

          <div className="pl-4 sm:pl-10 space-y-6">
            <div className="flex items-center gap-3">
              <FileText size={18} style={{ color: colors.primary }} />
              <span className="text-[10px] sm:text-sm font-bold opacity-40 uppercase tracking-widest" style={{ color: colors.primary }}>Manifest Access</span>
            </div>
            
            <div className="grid grid-cols-1 gap-6 max-w-2xl">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-6 sm:p-10 border-2 border-dashed bg-black/60 relative overflow-hidden group"
                  style={{ borderColor: `${colors.primary}33` }}
                >
                  <div className="space-y-6 relative z-10">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                       <div className="p-3 bg-white/5 rounded-sm shrink-0" style={{ color: colors.primary }}>
                         <FileText size={32} />
                       </div>
                       <div className="min-w-0 flex-1">
                         <p className="text-[9px] uppercase opacity-40" style={{ color: colors.primary }}>Source: Remote_Vault</p>
                         <h4 className="text-base sm:text-lg font-bold tracking-tight uppercase truncate" style={{ color: colors.primary }}>{doc.filename}</h4>
                         <p className="text-[10px] opacity-60 italic" style={{ color: colors.primary }}>Ref: {doc.title}</p>
                       </div>
                    </div>

                    <div className="h-[1px] w-full bg-white/10"></div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-green-500" />
                        <span className="text-[10px] font-bold uppercase text-green-500">Security Scan Passed</span>
                      </div>
                      <span className="text-[10px] opacity-40 uppercase" style={{ color: colors.primary }}>Size: {doc.size}</span>
                    </div>

                    <a 
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 border-2 transition-all hover:bg-[var(--primary)] hover:text-black flex items-center justify-center gap-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      <ExternalLink size={16} />
                      [ OPEN_REMOTE_DOCUMENT ]
                    </a>
                  </div>

                  {/* Decorative Corner Accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: colors.primary }}></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: colors.primary }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Dashboard;