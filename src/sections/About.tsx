import { motion } from 'motion/react';
import { services } from '../data';

export function About() {
  return (
    <section id="about" className="relative z-10 py-32 px-8 md:px-12 bg-black/5 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase leading-[0.9] transition-colors duration-500">
              About <span className="text-indigo-400 italic">Me</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-500 mt-6 mb-10" />
            
            <div className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed space-y-6 transition-colors duration-500">
              <p>
                I’m <strong className="text-slate-900 dark:text-white">Bakir M.T</strong>, a student and aspiring creative technologist from Kerala. I’m interested in the intersection of <strong className="text-indigo-400">design, technology, and artificial intelligence</strong>.
              </p>
              <p>
                I work with tools such as Adobe Photoshop, InDesign, Illustrator, Canva, and Pixellab, while also exploring HTML, CSS, Microsoft Office, and Google Workspace.
              </p>
              <p>
                I enjoy creating posters, layouts, digital designs, presentations, and web interfaces. I’m continuously learning new technologies and improving my creative and technical skills.
              </p>
              <div className="p-6 mt-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                 <p className="text-slate-900 dark:text-white italic text-xl font-bold leading-tight transition-colors duration-500">
                   “Building a future at the intersection of creativity, technology, and AI.”
                 </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-8 transition-colors duration-500">What I Do</h3>
            <div className="flex flex-col space-y-6">
              {services.map((service, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                  className="p-6 bg-white dark:bg-[#050506] border border-slate-200 dark:border-white/10 rounded-2xl hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-colors group"
                >
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 uppercase tracking-wide mb-2 transition-colors duration-500">{service.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-500">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
