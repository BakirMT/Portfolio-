import { motion } from 'motion/react';
import { skills, education } from '../data';
import { 
  PenTool, Palette, FileCode, BrainCircuit, 
  TableProperties, FileText, MonitorPlay, 
  Keyboard, MessageSquare, CheckCircle,
  Layout
} from 'lucide-react';

const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase();
  if (name.includes('adobe') || name.includes('image')) return <PenTool size={13} className="mr-1.5 opacity-70" />;
  if (name.includes('design') || name.includes('canva') || name.includes('pixellab')) return <Palette size={13} className="mr-1.5 opacity-70" />;
  if (name.includes('html') || name.includes('css') || name.includes('javascript') || name.includes('python')) return <FileCode size={13} className="mr-1.5 opacity-70" />;
  if (name.includes('ai')) return <BrainCircuit size={13} className="mr-1.5 opacity-70" />;
  if (name.includes('excel') || name.includes('sheets')) return <TableProperties size={13} className="mr-1.5 opacity-70" />;
  if (name.includes('word') || name.includes('docs') || name.includes('forms')) return <FileText size={13} className="mr-1.5 opacity-70" />;
  if (name.includes('powerpoint') || name.includes('slides')) return <MonitorPlay size={13} className="mr-1.5 opacity-70" />;
  if (name.includes('typing')) return <Keyboard size={13} className="mr-1.5 opacity-70" />;
  if (name.includes('communication')) return <MessageSquare size={13} className="mr-1.5 opacity-70" />;
  return <CheckCircle size={13} className="mr-1.5 opacity-70" />;
};

export function Skills() {
  return (
    <section id="skills" className="relative z-10 py-32 px-8 md:px-12 bg-slate-50 dark:bg-[#050506] border-t border-slate-200 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
             <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase leading-[0.9] transition-colors duration-500">
              Skills & <br/> <span className="text-indigo-400 italic">Expertise</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-500 mt-6 mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {skills.map((skillGroup, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + (idx * 0.1) }}
                    className="bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 transition-colors duration-500"
                  >
                    <h4 className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-4 transition-colors duration-500">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                       {skillGroup.items.map((item, i) => (
                          <span key={i} className="flex items-center px-3 py-1.5 bg-white dark:bg-[#050506] border border-slate-200 dark:border-white/10 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors duration-500 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-default">
                             {getSkillIcon(item)}
                             {item}
                          </span>
                       ))}
                    </div>
                  </motion.div>
               ))}
            </div>
          </motion.div>
        </div>

        <div id="education" className="w-full lg:w-1/2">
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase leading-[0.9] transition-colors duration-500">
              My <span className="text-indigo-400 italic">Education</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-500 mt-6 mb-10" />

            <div className="flex flex-col space-y-8 relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-300 dark:bg-white/10 transition-colors duration-500" />
              {education.map((edu, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                  className="relative pl-12"
                >
                   <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-slate-50 dark:bg-[#050506] border-2 border-indigo-500 flex items-center justify-center transition-colors duration-500">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                   </div>
                   <span className="text-[10px] font-bold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase transition-colors duration-500">{edu.year}</span>
                   <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-2 mb-2 transition-colors duration-500">{edu.school}</h4>
                   <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-500">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
