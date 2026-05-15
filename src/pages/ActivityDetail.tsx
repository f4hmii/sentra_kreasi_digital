import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, ChevronRight, ArrowRight } from 'lucide-react';
import Markdown from 'react-markdown';
import { fetchPosts, CmsPost, fixDriveUrl, parseContent } from '../services/cmsApi';

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>(); // This 'id' is actually the slug
  const [activity, setActivity] = useState<CmsPost | null>(null);
  const [otherActivities, setOtherActivities] = useState<CmsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEventData = async () => {
      try {
        setLoading(true);
        const posts = await fetchPosts();
        const events = posts.filter(post => post.category === 'Event' && post.status === 'published');
        
        const currentActivity = events.find(a => a.slug === id);
        if (currentActivity) {
          setActivity(currentActivity);
        }
        
        const others = events.filter(a => a.slug !== id).slice(0, 2);
        setOtherActivities(others);
      } catch (error) {
        console.error("Gagal mengambil data event detail:", error);
      } finally {
        setLoading(false);
      }
    };

    getEventData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center text-slate-900 dark:text-white p-6">
        <h2 className="text-3xl font-display font-bold mb-4">Kegiatan Tidak Ditemukan</h2>
        <Link to="/kegiatan" className="text-primary flex items-center gap-2 hover:underline">
          <ArrowLeft size={20} /> Kembali ke Kegiatan
        </Link>
      </div>
    );
  }

  const rawContent = parseContent(activity.content);
  const eventContent = (Array.isArray(rawContent) ? rawContent[0] : rawContent) || {};
  const imageUrl = fixDriveUrl(eventContent.event_gallery?.[0]?.url || eventContent.featured_image) || 'https://via.placeholder.com/800x600?text=No+Image';
  const dateStr = eventContent.event_date 
    ? new Date(eventContent.event_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) 
    : 'Tanggal tidak tersedia';
  const categories = eventContent.event_labels || [];
  const eventDescription = (eventContent.event_description || activity.excerpt || '').replace(/&nbsp;/g, ' ');

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="mb-12"
        >
          <Link to="/kegiatan" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Semua Kegiatan
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-6"
              >
                <div className="flex items-center gap-2 text-primary text-base font-black uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-xl">
                  <Calendar size={14} /> {dateStr}
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat: string, i: number) => (
                    <span key={i} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-base font-bold uppercase tracking-widest glass px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                      <Tag size={10} className="text-primary" /> {cat}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-6xl font-display font-black leading-tight text-slate-900 dark:text-white"
              >
                {activity.title}
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border-l-4 border-primary"
              >
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                  "{activity.excerpt || eventContent.excerpt}"
                </p>
              </motion.div>
            </div>

            {/* Featured Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative group h-[400px]"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000"></div>
              <div className="relative h-full rounded-[3rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
                <img 
                  src={imageUrl} 
                  alt={activity.title} 
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/40"></div>
              </div>
            </motion.div>

            {/* Detailed Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-slate dark:prose-invert max-w-none prose-lg md:prose-xl"
            >
              <div className="markdown-body text-justify leading-relaxed text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: eventDescription }}>
              </div>
            </motion.div>
          </div>

          {/* Sidebar: Recommendations & CTA */}
          <div className="lg:col-span-4 space-y-12">
            {/* CTA Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">Ingin Mengajak Kolaborasi?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 relative z-10 font-light leading-relaxed">
                Kami selalu terbuka untuk ide-ide baru dan kolaborasi yang membawa dampak positif. Hubungi kami untuk mendiskusikan rencana Anda.
              </p>
              <Link 
                to="/hubungi-kami" 
                className="w-full inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg active:scale-95"
              >
                Hubungi Kami <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Recommendations */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white px-2 border-l-4 border-primary">Kegiatan Lainnya</h4>
              <div className="grid gap-6">
                {otherActivities.map((other) => {
                  const otherContent = other.content?.[0] || {};
                  const otherImage = otherContent.event_gallery?.[0]?.url || otherContent.featured_image || 'https://via.placeholder.com/800x600?text=No+Image';
                  const otherDate = otherContent.event_date 
                    ? new Date(otherContent.event_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) 
                    : 'Tanggal tidak tersedia';
                  
                  return (
                  <Link 
                    key={other.id} 
                    to={`/kegiatan/${other.slug}`}
                    className="group flex gap-4 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/5"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-md">
                      <img src={fixDriveUrl(otherImage)} alt={other.title} crossOrigin="anonymous" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-lg text-primary font-black uppercase tracking-widest mb-1">{otherDate}</p>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                        {other.title}
                      </h5>
                    </div>
                  </Link>
                )})}
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default ActivityDetail;
