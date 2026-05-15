import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import Markdown from 'react-markdown';
import { fetchPosts, CmsPost, fixDriveUrl, parseContent } from '../services/cmsApi';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>(); // This is actually the slug
  const [article, setArticle] = useState<CmsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      try {
        setLoading(true);
        const posts = await fetchPosts();
        const articlesList = posts.filter(post => post.category === 'Artikel' && post.status === 'published');
        const currentArticle = articlesList.find(a => a.slug === id);
        
        if (currentArticle) {
          setArticle(currentArticle);
        }
      } catch (error) {
        console.error("Gagal mengambil data article detail:", error);
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center text-slate-900 dark:text-white p-6">
        <h2 className="text-3xl font-display font-bold mb-4">Artikel Tidak Ditemukan</h2>
        <Link to="/artikel" className="text-primary flex items-center gap-2 hover:underline">
          <ArrowLeft size={20} /> Kembali ke Artikel
        </Link>
      </div>
    );
  }

  const rawContent = parseContent(article.content);
  const articleContent = (Array.isArray(rawContent) ? rawContent[0] : rawContent) || {};
  const imageUrl = fixDriveUrl(articleContent.featured_image) || 'https://via.placeholder.com/800x600?text=No+Image';
  const dateStr = article.created_at ? new Date(article.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const categories = articleContent.tags ? articleContent.tags.split(',').map((t: string) => t.trim()) : [];
  const articleExcerpt = (article.excerpt || articleContent.excerpt || '').replace(/&nbsp;/g, ' ');
  const bodyContent = (articleContent.body_content || '').replace(/&nbsp;/g, ' ');

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="mb-12"
        >
          <Link to="/artikel" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Kembali ke Artikel
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="space-y-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="flex items-center gap-2 text-primary text-base font-black uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              <Calendar size={14} /> {dateStr}
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat: string, i: number) => (
                <span key={i} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-base font-bold uppercase tracking-widest glass px-3 py-1 rounded-full">
                  <Tag size={12} /> {cat}
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
            {article.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 text-slate-600 dark:text-slate-400 border-l-4 border-primary pl-6 py-2 italic text-lg"
          >
            <p>{articleExcerpt}</p>
          </motion.div>
        </div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="aspect-video rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl mb-16"
        >
          <img 
            src={imageUrl} 
            alt={article.title} 
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg prose-slate dark:prose-invert prose-sky max-w-none"
        >
          <div className="markdown-body text-justify" dangerouslySetInnerHTML={{ __html: bodyContent }}>
          </div>
        </motion.div>

        {/* Author Footer */}
        <div className="mt-24 pt-12 border-t border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/5">
                <User size={24} className="text-slate-400" />
             </div>
             <div>
                <p className="text-lg text-slate-500 font-bold uppercase tracking-widest">Penulis</p>
                <p className="text-slate-900 dark:text-white text-lg font-bold">Tim Sentra Kreasi</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail;
