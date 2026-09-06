import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db, googleProvider, ProjectData } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { X, Plus, Trash2, Edit2, LogOut, Check } from 'lucide-react';
import { projects as defaultProjects } from '../data';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', category: '', description: '', image: '', order: 0 });

  const ADMIN_EMAIL = 'bakirmannarkkad170@gmail.com';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;

    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs: ProjectData[] = [];
      snapshot.forEach((doc) => {
        projs.push({ id: doc.id, ...doc.data() } as ProjectData);
      });
      setProjects(projs);
    }, (error) => {
      toast.error('Failed to load projects: ' + error.message);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out');
      onClose();
    } catch (error: any) {
      toast.error('Logout failed');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', category: '', description: '', image: '', order: projects.length });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image) {
      toast.error('Title and Image are required');
      return;
    }

    try {
      if (editingId) {
        const docRef = doc(db, 'projects', editingId);
        await updateDoc(docRef, { ...formData });
        toast.success('Project updated');
      } else {
        await addDoc(collection(db, 'projects'), {
          ...formData,
          createdAt: serverTimestamp()
        });
        toast.success('Project added');
      }
      resetForm();
    } catch (error: any) {
      toast.error('Failed to save project: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      toast.success('Project deleted');
    } catch (error: any) {
      toast.error('Failed to delete project');
    }
  };

  const seedData = async () => {
    if (!confirm('This will add the default projects to your database. Continue?')) return;
    try {
      for (let i = 0; i < defaultProjects.length; i++) {
        const p = defaultProjects[i];
        await addDoc(collection(db, 'projects'), {
          title: p.title,
          category: p.category,
          description: p.description,
          image: p.image,
          order: i,
          createdAt: serverTimestamp()
        });
      }
      toast.success('Seeded default projects successfully');
    } catch (error: any) {
      toast.error('Seed failed: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-white/10"
      >
        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-widest">Admin Panel</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-white/5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center text-slate-500 py-8">Loading...</div>
          ) : !user ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Admin Access Only</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">Please sign in with your administrator account to manage your portfolio projects.</p>
              <button onClick={handleLogin} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors uppercase tracking-wider text-sm">
                Sign In with Google
              </button>
            </div>
          ) : user.email !== ADMIN_EMAIL ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">The account {user.email} does not have admin privileges.</p>
              <button onClick={handleLogout} className="px-8 py-4 bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-300 dark:hover:bg-white/20 transition-colors uppercase tracking-wider text-sm">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">
                  {editingId ? 'Edit Project' : 'Add New Project'}
                </h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Category</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select a category</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Web & UI">Web & UI</option>
                    <option value="Microsoft Office">Microsoft Office</option>
                    <option value="Google Workspace">Google Workspace</option>
                    <option value="AI & Technology">AI & Technology</option>
                    <option value="Creative Skills">Creative Skills</option>
                    <option value="Languages">Languages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Image URL</label>
                  <input 
                    type="text" 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Order (0 = first)</label>
                  <input 
                    type="number" 
                    value={formData.order} 
                    onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    {editingId ? <><Check size={16} /> Update</> : <><Plus size={16} /> Add</>}
                  </button>
                  {editingId && (
                    <button 
                      onClick={resetForm}
                      className="px-4 bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* List */}
              <div className="lg:col-span-2 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/10 pt-6 lg:pt-0 lg:pl-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Existing Projects</h3>
                  {projects.length === 0 && (
                     <button onClick={seedData} className="text-xs bg-indigo-600/10 text-indigo-500 px-3 py-1 rounded-full font-bold uppercase tracking-wider hover:bg-indigo-600/20 transition-colors">
                       Seed Default Data
                     </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {projects.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">No projects found. Add one or seed default data.</p>
                  ) : (
                    projects.map(p => (
                      <div key={p.id} className="flex gap-4 p-3 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 rounded-xl items-center group">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-white/10">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{p.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{p.category}</p>
                          <span className="text-[10px] bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full mt-1 inline-block">Order: {p.order}</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingId(p.id!);
                              setFormData({ title: p.title, category: p.category, description: p.description, image: p.image, order: p.order });
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(p.id!)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {user && user.email === ADMIN_EMAIL && (
           <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
             <span>Logged in as <strong>{user.email}</strong></span>
             <button onClick={handleLogout} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
               <LogOut size={14} /> Sign out
             </button>
           </div>
        )}
      </motion.div>
    </div>
  );
}
