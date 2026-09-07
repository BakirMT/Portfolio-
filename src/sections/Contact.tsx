import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { db, SocialLinkData } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const BehanceIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 14.5c1.7 0 3-1.1 3-2.5s-1.3-2.5-3-2.5H4v5h4z" />
    <path d="M8 9.5c1.7 0 2.5-1 2.5-2s-1-2-2.5-2H4v4h4z" />
    <path d="M20 14.5c0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3 3-1.3 3-3z" />
    <path d="M15.5 11h3" />
    <path d="M4 18.5h5" />
    <path d="M4 5.5h5" />
  </svg>
);

const WhatsappIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [links, setLinks] = useState<SocialLinkData[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'socialLinks'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lnks: SocialLinkData[] = [];
      snapshot.forEach((doc) => {
        lnks.push({ id: doc.id, ...doc.data() } as SocialLinkData);
      });
      setLinks(lnks);
    }, (error) => {
      console.error('Failed to load links: ' + error.message);
    });

    return () => unsubscribe();
  }, []);

  const getIcon = (platform: string, size: number) => {
    switch (platform) {
      case 'LinkedIn': return <Linkedin size={size} />;
      case 'GitHub': return <Github size={size} />;
      case 'Behance': return <BehanceIcon size={size} />;
      case 'Instagram': return <Instagram size={size} />;
      case 'WhatsApp': return <WhatsappIcon size={size} />;
      default: return <Linkedin size={size} />;
    }
  };

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

              <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4">Connect with me</p>
                <div className="flex flex-wrap gap-4">
                  {links.map((link) => (
                    <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all hover:-translate-y-1" aria-label={link.platform}>
                      {getIcon(link.platform, 20)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-7/12">
          <motion.form
            action="https://formsubmit.co/bakirmannarkkad170@gmail.com"
            method="POST"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-8 p-10 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl transition-colors duration-500"
          >
            {/* Optional: disable captcha */}
            <input type="hidden" name="_captcha" value="false" />
            {/* Optional: set next URL after submit */}
            <input type="hidden" name="_next" value={window.location.href} />

            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Name</label>
              <input 
                type="text" 
                name="name"
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
                name="email"
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
                name="message"
                rows={4}
                required
                className="bg-transparent border-b border-slate-300 dark:border-white/20 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            
            <button 
              type="submit"
              className="self-start px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full flex items-center space-x-2 hover:scale-105 transition-transform text-sm uppercase tracking-wider mt-4"
            >
              <span>Send Message</span>
              <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-bold uppercase tracking-widest transition-colors duration-500">
        <p>© {new Date().getFullYear()} Bakir M.T.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {links.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-indigo-500 transition-colors" aria-label={link.platform}>
              {getIcon(link.platform, 18)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
