import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { projects as fallbackProjects } from '../data';
import { db, ProjectData } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export function Portfolio() {
  const [firebaseProjects, setFirebaseProjects] = useState<ProjectData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Graphic Design',
    'Web & UI',
    'Microsoft Office',
    'Google Workspace',
    'AI & Technology',
    'Creative Skills',
    'Languages'
  ];

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs: ProjectData[] = [];
      snapshot.forEach((doc) => {
        projs.push({ id: doc.id, ...doc.data() } as ProjectData);
      });
      setFirebaseProjects(projs);
    });

    return () => unsubscribe();
  }, []);

  const displayProjects = firebaseProjects.length > 0 ? firebaseProjects : fallbackProjects;
  
  const filteredProjects = activeCategory === 'All' 
    ? displayProjects 
    : displayProjects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="relative z-10 py-32 px-8 md:px-12 bg-black/5 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase transition-colors duration-500">My Projects</h2>
              <div className="w-24 h-1 bg-indigo-500 mt-6" />
            </div>
            {/* Hidden admin trigger for the user - they can also just type #admin in URL */}
            <a href="#admin" className="opacity-0 w-8 h-8" aria-label="Admin Access"></a>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 border ${
                  activeCategory === category 
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : 'bg-transparent border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-32">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`group cursor-pointer ${index % 2 === 1 ? 'md:mt-32' : ''}`}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-colors duration-500">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay"></div>
              </div>
              
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-500 uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-indigo-500 dark:text-indigo-400 mt-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-500">{project.category}</p>
                  <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm leading-relaxed transition-colors duration-500">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
