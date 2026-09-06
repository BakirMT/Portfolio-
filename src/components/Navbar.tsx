import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-40 flex items-center justify-between px-8 md:px-12 py-8 text-slate-900 dark:text-white w-full max-w-7xl mx-auto transition-colors duration-500"
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
        <div className="w-8 h-8 bg-indigo-500 rounded-lg rotate-12 flex items-center justify-center text-black font-black">B</div>
        <span className="text-xl font-bold tracking-tighter uppercase">Bakir<span className="text-indigo-400">.</span></span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors duration-500">
        <button onClick={() => scrollTo('about')} className="hover:text-slate-900 dark:hover:text-white transition-colors">About</button>
        <button onClick={() => scrollTo('skills')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Skills</button>
        <button onClick={() => scrollTo('projects')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Projects</button>
        <button onClick={() => scrollTo('education')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Education</button>
        <button onClick={() => scrollTo('contact')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</button>
      </div>

      <button
        onClick={toggleTheme}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-300 dark:border-white/20 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </motion.nav>
  );
}
