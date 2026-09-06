/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Background3D } from './canvas/Background3D';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Portfolio } from './sections/Portfolio';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { AdminPanel } from './components/AdminPanel';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      } else {
        setIsAdminOpen(false);
      }
    };
    
    // Check initial hash
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#050506] text-slate-900 dark:text-white font-sans selection:bg-indigo-500/30 overflow-hidden relative flex flex-col transition-colors duration-500">
        <Toaster position="bottom-right" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white' }} />
        {isAdminOpen && <AdminPanel onClose={() => window.location.hash = ''} />}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-20 transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <CustomCursor />
        <Background3D />
        
        <div className="relative z-10 flex-1 flex flex-col">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Contact />
        </div>
      </div>
    </ThemeProvider>
  );
}
