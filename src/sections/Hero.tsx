import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="hero" className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-100px)] px-8 md:px-12 pt-10">
      <div className="max-w-4xl text-slate-900 dark:text-white transition-colors duration-500">
        <span className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">Student • Designer • Creative Technologist</span>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[90px] font-bold leading-[0.9] tracking-tight mb-8 uppercase"
        >
          Bakir <br />
          <span className="text-indigo-400 italic">M.T</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10 max-w-lg transition-colors duration-500"
        >
          I’m a student and creative designer passionate about technology, AI, graphic design, and web development. I enjoy turning ideas into clean, useful, and visually engaging digital experiences.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-4"
        >
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-sm uppercase tracking-wider"
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm uppercase tracking-wider"
          >
            Contact Me
          </button>
        </motion.div>
      </div>


    </section>
  );
}
