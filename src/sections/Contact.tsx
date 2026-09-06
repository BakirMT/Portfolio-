import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative z-10 py-32 px-8 md:px-12 bg-white dark:bg-[#050506] transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        
        <div className="w-full md:w-5/12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8 uppercase leading-[0.9] transition-colors duration-500">
              Let's create <br/> something great.
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 transition-colors duration-500">
              Whether it’s a design project, website, digital idea, or technology project, I’m always interested in learning, creating, and collaborating.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-4 text-slate-900 dark:text-white group w-full transition-colors duration-500">
                <div className="w-16 h-16 shrink-0 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-colors">
                  <Mail size={24} className="text-indigo-500 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Email</p>
                  <p className="text-sm sm:text-base md:text-lg font-bold tracking-wide group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors break-all md:break-normal">bakirmannarkkad170@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-slate-900 dark:text-white group w-full transition-colors duration-500">
                <div className="w-16 h-16 shrink-0 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-colors">
                  <MapPin size={24} className="text-indigo-500 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Location</p>
                  <p className="text-sm sm:text-base md:text-lg font-bold tracking-wide group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">Kerala, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-7/12">
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col space-y-8 p-10 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl transition-colors duration-500"
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="bg-transparent border-b border-slate-300 dark:border-white/20 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="What's your name?"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                className="bg-transparent border-b border-slate-300 dark:border-white/20 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="hello@example.com"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Message</label>
              <textarea 
                id="message" 
                rows={4}
                required
                className="bg-transparent border-b border-slate-300 dark:border-white/20 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            
            <button 
              type="submit"
              disabled={status !== 'idle'}
              className="self-start px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full flex items-center space-x-2 hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100 text-sm uppercase tracking-wider mt-4"
            >
              <span>
                {status === 'idle' ? 'Send Message' : status === 'sending' ? 'Sending...' : 'Message Sent!'}
              </span>
              {status === 'idle' && <Send size={18} />}
            </button>
          </motion.form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-bold uppercase tracking-widest transition-colors duration-500">
        <p>© {new Date().getFullYear()} Bakir M.T.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://www.linkedin.com/in/muhammedunil-bakhir-mt/" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/BakirMT" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </section>
  );
}
