import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import Layout from './components/Layout';
import Home from './views/Home';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import TerminalForm from './components/TerminalForm';
import CustomCursor from './components/CustomCursor';
import { ViewState } from './types';

const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  
  const [credentials, setCredentials] = useState<{user: string, pass: string} | null>({
    user: 'verzz',
    pass: 'pranay123'
  });
  
  const { colors } = useTheme();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setView('home');
  };

  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    setView('dashboard');
  };

  const renderView = () => {
    switch (view) {
      case 'home': return <Home onNavigate={setView} isLoggedIn={isLoggedIn} />;
      case 'contact': return (
        <div className="max-w-2xl mx-auto py-12">
          <h2 className="text-2xl font-bold uppercase mb-8" style={{ color: colors.primary }}>
            // INITIATE_CONTACT_PROTOCOL
          </h2>
          <TerminalForm />
        </div>
      );
      case 'login': return (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          registeredCredentials={credentials}
          onRegister={(u, p) => setCredentials({user: u, pass: p})}
        />
      );
      case 'dashboard': 
        if (!isLoggedIn) {
          return (
            <Login 
              onLoginSuccess={handleLoginSuccess} 
              registeredCredentials={credentials}
              onRegister={(u, p) => setCredentials({user: u, pass: p})}
            />
          );
        }
        return <Dashboard username={currentUser || 'AGENT'} />;
      default: return <Home onNavigate={setView} isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <CustomCursor />
      <Layout 
        viewName={view} 
        onNavigate={setView}
        currentView={view}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      >
        <div className="animate-in fade-in duration-700">
          {renderView()}
        </div>
      </Layout>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;