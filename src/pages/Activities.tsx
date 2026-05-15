import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchPages, fetchPosts, CmsPage, CmsPost, fixDriveUrl, parseContent } from '../services/cmsApi';

const Activities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<CmsPage | null>(null);
  const [activitiesPosts, setActivitiesPosts] = useState<CmsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [pages, posts] = await Promise.all([fetchPages(), fetchPosts()]);
        
        const activitiesPage = pages.find((p) => p.slug === 'kegiatan');
        if (activitiesPage) {
          setPageData(activitiesPage);
        }

        const events = posts.filter(post => post.category === 'Event' && post.status === 'published');
        setActivitiesPosts(events);
      } catch (error) {
        console.error("Gagal mengambil data kegiatan:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const heroBlock = pageData?.content.find(block => block.type === 'hero');
  const heroData = heroBlock?.data || {
    headline: "Kegiatan Sentra Kreasi",
    sub_headline: "Telusuri berbagai inisiatif dan momen berharga yang telah kami lalui bersama untuk memajukan potensi kreatif di Kabupaten Bandung."
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(activitiesPosts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActivities = activitiesPosts.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Helper function to split headline and style the last two words
  const renderHeadline = (text: string) => {
    const words = text.split(' ');
    if (words.length <= 2) {
      return <>{text}</>;
    }
    const lastTwo = words.slice(-2).join(' ');
    const rest = words.slice(0, -2).join(' ');
    return (
      <>
        {rest} <span className="text-primary">{lastTwo}</span>
      </>
    );
  };

  return (
    <section className="pt-20 pb-32 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-block px-3 py-1 glass rounded-full mb-6">
            <span className="text-base uppercase tracking-[1px] text-primary font-bold">Agenda & Dokumentasi</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-display font-black text-slate-900 dark:text-white leading-tight">
            {renderHeadline(heroData.headline)}
          </h2>
          <p className="mt-6 text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-light">
            {heroData.sub_headline}
          </p>
        </div>
        
        <div className="space-y-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-24"
            >
              {currentActivities.map((act, i) => {
            const rawContent = parseContent(act.content);
            const eventContent = (Array.isArray(rawContent) ? rawContent[0] : rawContent) || {};
            const imageUrl = fixDriveUrl(eventContent.event_gallery?.[0]?.url || eventContent.featured_image) || 'https://via.placeholder.com/800x600?text=No+Image';
            const dateStr = eventContent.event_date 
              ? new Date(eventContent.event_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) 
              : 'Tanggal tidak tersedia';
            const categories = eventContent.event_labels || [];

            return (
            <motion.div 
              key={act.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Image Content */}
              <Link to={`/kegiatan/${act.slug}`} className="w-full lg:w-3/5 relative group block">
                <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>
                <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={imageUrl} 
                    alt={act.title} 
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 dark:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-60"></div>
                  
                  {/* Category Tags on Image */}
                  <div className="absolute top-8 left-8 flex flex-wrap gap-2 max-w-[calc(100%-4rem)]">
                    {categories.map((cat: string, idx: number) => (
                      <div key={idx} className="glass px-3 py-1.5 rounded-full flex items-center gap-2">
                        <Tag size={12} className="text-primary" />
                        <span className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">{cat}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Details Overlay on Hover (Optional but nice) */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-full flex items-center gap-2 text-primary font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Detail Kegiatan <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Text Content */}
              <div className="w-full lg:w-2/5 space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                    <Calendar size={14} />
                    <span className="text-base font-bold uppercase tracking-widest">{dateStr}</span>
                  </div>
                  <Link to={`/kegiatan/${act.slug}`} className="block">
                    <h3 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight hover:text-primary transition-colors">
                      {act.title}
                    </h3>
                  </Link>
                  <div className="w-16 h-1 bg-primary opacity-30 mx-auto lg:mx-0 rounded-full"></div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
                  {(act.excerpt || eventContent.excerpt || "Deskripsi kegiatan tidak tersedia.").replace(/&nbsp;/g, ' ')}
                </p>

                <div className="pt-4">
                  <Link 
                    to={`/kegiatan/${act.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-base hover:gap-4 transition-all"
                  >
                    Selengkapnya <ArrowRight size={16} />
                  </Link>
                </div>
                </div>
              </motion.div>
            )})}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base uppercase tracking-widest transition-all ${
                currentPage === 1 
                ? 'opacity-20 cursor-not-allowed text-slate-400 dark:text-slate-500 underline-none shadow-none bg-transparent' 
                : 'glass text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 text-sky-400'
              }`}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-primary font-display font-black text-xl">{currentPage}</span>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className="text-slate-500 dark:text-slate-400 font-bold">{totalPages}</span>
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base uppercase tracking-widest transition-all ${
                currentPage === totalPages 
                ? 'opacity-20 cursor-not-allowed text-slate-400 dark:text-slate-500 underline-none shadow-none bg-transparent' 
                : 'glass text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 text-sky-400'
              }`}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Activities;
