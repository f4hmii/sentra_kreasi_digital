import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPosts, CmsPost } from '../services/cmsApi';

const Articles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesData, setArticlesData] = useState<CmsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        const posts = await fetchPosts();
        const articlesList = posts.filter(post => post.category === 'Artikel' && post.status === 'published');
        setArticlesData(articlesList);
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(articlesData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articlesData.slice(startIndex, startIndex + itemsPerPage);

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

  return (
    <section className="pt-20 pb-32 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-block px-3 py-1 glass rounded-full mb-6">
            <span className="text-base uppercase tracking-[1px] text-primary font-bold">Artikel & Wawasan</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white leading-tight">
            Wawasan & Ide <span className="text-gradient">Kreatif</span>
          </h2>
          <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
            Kumpulan pemikiran dan berita terbaru seputar perkembangan teknologi di tingkat komunitas kampung.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {currentArticles.map((article, i) => {
                const articleContent = article.content?.[0] || {};
                const imageUrl = articleContent.featured_image || 'https://via.placeholder.com/800x600?text=No+Image';
                const dateStr = article.created_at ? new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
                const categories = articleContent.tags ? articleContent.tags.split(',').map((t: string) => t.trim()) : [];
                const articleExcerpt = (article.excerpt || articleContent.excerpt || '').replace(/&nbsp;/g, ' ');

                return (
                <motion.div 
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group py-8 flex flex-col md:flex-row gap-8 border-b border-slate-200 dark:border-white/5 last:border-0 hover:bg-slate-100/50 dark:hover:bg-white/[0.02] transition-all rounded-xl px-4 -mx-4"
                >
                  {/* Thumbnail - Fixed size for consistency */}
                  <div className="flex-shrink-0">
                    <Link to={`/artikel/${article.slug}`} className="block relative w-full md:w-48 aspect-video md:aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/5">
                      <img 
                        src={imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                    </Link>
                  </div>

                  {/* Content Side */}
                  <div className="flex-grow space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-base font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-widest">{dateStr}</span>
                      <div className="flex gap-2">
                        {categories.map((cat: string, idx: number) => (
                          <span key={idx} className="text-base font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1">
                            <Tag size={10} /> {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to={`/artikel/${article.slug}`}>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </h3>
                    </Link>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 max-w-3xl">
                      {articleExcerpt}
                    </p>

                    <div className="pt-1">
                      <Link to={`/artikel/${article.slug}`} className="inline-flex items-center gap-2 text-base font-black text-slate-500 dark:text-slate-500 group-hover:text-primary uppercase tracking-[2px] transition-all duration-300">
                        Read Insight <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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

export default Articles;
