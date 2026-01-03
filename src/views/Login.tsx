
import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { ShieldAlert, ShieldCheck, Lock, UserPlus, LogIn, ChevronRight } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface LoginProps {
  onLoginSuccess: (username: string) => void;
  registeredCredentials: {user: string, pass: string} | null;
  onRegister: (user: string, pass: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, registeredCredentials, onRegister }) => {
  const { colors } = useTheme();
  const { play } = useSound();
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [status, setStatus] = useState<'idle' | 'checking' | 'failed' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !pass) return;

    play('click');
    setStatus('checking');
    setErrorMessage('');
    
    setTimeout(() => {
      if (mode === 'register') {
        onRegister(username, pass);
        play('success');
        setStatus('success');
        setTimeout(() => {
          setMode('login');
          setStatus('idle');
          setPass('');
        }, 1500);
      } else {
        // Login check
        if (!registeredCredentials) {
          play('error');
          setErrorMessage('CRITICAL: DATABASE EMPTY. REGISTER FIRST.');
          setStatus('failed');
          setTimeout(() => setStatus('idle'), 3000);
          return;
        }

        const inputUser = username.toLowerCase();
        const storedUser = registeredCredentials.user.toLowerCase();

        if (inputUser === storedUser && pass === registeredCredentials.pass) {
          play('success');
          setStatus('success');
          setTimeout(() => {
            onLoginSuccess(username);
          }, 1000);
        } else {
          play('error');
          setErrorMessage('CRITICAL: ACCESS DENIED. BAD CREDENTIALS.');
          setStatus('failed');
          setTimeout(() => setStatus('idle'), 2000);
        }
      }
    }, 1200);
  };

  const toggleMode = () => {
    play('click');
    setMode(mode === 'login' ? 'register' : 'login');
    setErrorMessage('');
    setStatus('idle');
    setUsername('');
    setPass('');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6 py-12">
      {/* Icon Status Indicator */}
      <div 
        className={`p-6 rounded-full border-4 transition-all duration-500 ${status === 'failed' ? 'animate-shake' : ''}`}
        style={{ 
          borderColor: status === 'success' ? '#10b981' : status === 'failed' ? '#ef4444' : colors.primary,
          boxShadow: `0 0 20px ${status === 'success' ? 'rgba(16,185,129,0.5)' : status === 'failed' ? 'rgba(239,68,68,0.5)' : colors.glow}`
        }}
      >
        {status === 'success' ? (
          <ShieldCheck size={48} color="#10b981" />
        ) : status === 'failed' ? (
          <ShieldAlert size={48} color="#ef4444" />
        ) : mode === 'register' ? (
          <UserPlus size={48} color={colors.primary} />
        ) : (
          <Lock size={48} color={colors.primary} />
        )}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: colors.primary }}>
          {mode === 'register' ? 'SYSTEM_INITIALIZATION' : 'ACCESS_CONTROL'}
        </h2>
        <p className="text-[10px] opacity-60 mt-2 uppercase tracking-[0.2em]" style={{ color: colors.accent }}>
          {mode === 'register' ? 'Configure New Operator Profile' : 'Identify to Establish Session'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase opacity-50 ml-1" style={{ color: colors.primary }}>Operator_ID</label>
          <input 
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => {
              play('typing');
              setUsername(e.target.value);
            }}
            disabled={status === 'checking' || status === 'success'}
            className="w-full bg-black/50 border-2 p-3 text-center font-mono outline-none transition-all uppercase placeholder:opacity-30"
            style={{ 
              borderColor: `${colors.primary}44`, 
              color: colors.primary,
              boxShadow: `inset 0 0 10px ${colors.glow}22`
            }}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase opacity-50 ml-1" style={{ color: colors.primary }}>Access_Code</label>
          <input 
            type="password"
            placeholder="••••••••"
            value={pass}
            onChange={(e) => {
              play('typing');
              setPass(e.target.value);
            }}
            disabled={status === 'checking' || status === 'success'}
            className="w-full bg-black/50 border-2 p-3 text-center font-mono outline-none transition-all"
            style={{ 
              borderColor: `${colors.primary}44`, 
              color: colors.primary,
              boxShadow: `inset 0 0 10px ${colors.glow}22`
            }}
          />
        </div>

        <button 
          type="submit"
          onMouseEnter={() => play('hover')}
          disabled={status === 'checking' || status === 'success'}
          className="w-full py-4 bg-[var(--primary)] text-black font-black uppercase text-xs tracking-[0.3em] hover:brightness-110 transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
        >
          {status === 'checking' ? 'SYNCING...' : mode === 'register' ? 'INITIALIZE_CORE' : 'AUTHORIZE_SESSION'}
          {status !== 'checking' && <ChevronRight size={14} />}
        </button>
      </form>

      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        {/* Error Messages */}
        <div className="h-4 text-center">
          {status === 'failed' && (
            <p className="text-[10px] text-red-500 font-bold uppercase animate-pulse leading-tight">
              {errorMessage}
              <br/>
              <span className="opacity-60 text-[8px] mt-1 block">HINT: USE REGISTER IF ACCOUNT IS MISSING</span>
            </p>
          )}
          {status === 'success' && (
            <p className="text-[10px] text-green-500 font-bold uppercase animate-pulse">
              {mode === 'register' ? 'DATA SAVED. RETURNING TO LOGIN...' : 'ACCESS GRANTED. REDIRECTING...'}
            </p>
          )}
        </div>

        {/* Mode Toggle at the Bottom */}
        <div className="w-full pt-6 border-t border-dashed" style={{ borderColor: `${colors.primary}22` }}>
          <button 
            type="button"
            onClick={toggleMode}
            onMouseEnter={() => play('hover')}
            className="w-full text-[10px] uppercase opacity-60 hover:opacity-100 transition-opacity flex flex-col items-center gap-1 group"
            style={{ color: colors.primary }}
          >
            <span className="opacity-40">{mode === 'login' ? "Don't have an operator account?" : "Returning operator?"}</span>
            <span className="font-bold tracking-widest flex items-center gap-2">
              {mode === 'login' ? <UserPlus size={12}/> : <LogIn size={12}/>}
              {mode === 'login' ? 'REGISTER NOW' : 'BACK TO LOGIN'}
            </span>
            <div className="w-0 group-hover:w-24 h-[1px] bg-current transition-all duration-300 mt-1 opacity-40"></div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.15s linear 3; }
      `}</style>
    </div>
  );
};

export default Login;
