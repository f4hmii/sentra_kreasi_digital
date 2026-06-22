import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronLeft, ExternalLink, ArrowRight, Tag } from 'lucide-react';
import { fetchPosts } from '../services/cmsApi';
import { CanvaTemplate } from './Repository';

const TemplateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<CanvaTemplate | null>(null);
  const [recommendations, setRecommendations] = useState<CanvaTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const posts = await fetchPosts();
        const templatePosts = posts.filter(post => (post.template_type === 'Template' || post.category === 'Template') && post.status === 'published');
        
        const fixDriveUrl = (url: string) => {
          if (!url) return '';
          if (url.includes('drive.google.com')) {
            const idMatch = url.match(/[?&]id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
            if (idMatch && idMatch[1]) {
              // Format lh3.googleusercontent.com is the most reliable for embedding Drive images
              return `https://lh3.googleusercontent.com/d/${idMatch[1]}=w1200`;
            }
          }
          return url;
        };

        const parsedTemplates: any[] = templatePosts.map(post => {
          let rawContent = post.content;
          if (typeof rawContent === 'string') {
            try {
              rawContent = JSON.parse(rawContent);
            } catch (e) {
              rawContent = [];
            }
          }
          
          const content = (Array.isArray(rawContent) ? rawContent[0] : rawContent) || {};
          const rawTags = content.tags || ['Lainnya'];
          const normalizedTags = rawTags.map((t: string) => {
            let name = t.toLowerCase().split(' ').map((s: string) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            if (name === "Media Sosial") return "Sosial Media";
            return name;
          });

          return {
            id: post.id.toString(),
            title: post.title,
            category: normalizedTags[0],
            categories: normalizedTags,
            image: fixDriveUrl(content.featured_image) || 'https://via.placeholder.com/800x600?text=No+Image',
            description: content.short_description || post.excerpt || '',
            canvaUrl: content.cta?.[0]?.url || '#',
          };
        });

        const currentTemplate = parsedTemplates.find(t => t.id === id);
        if (currentTemplate) {
          setTemplate(currentTemplate as CanvaTemplate);
          const others = parsedTemplates.filter(t => t.id !== id);
          const shuffled = [...others].sort(() => 0.5 - Math.random());
          setRecommendations(shuffled.slice(0, 3) as CanvaTemplate[]);
          window.scrollTo(0, 0);
        } else {
          console.warn(`Template dengan ID ${id} tidak ditemukan`);
          navigate('/repository');
        }
      } catch (error) {
        console.error("Gagal mengambil detail template:", error);
        navigate('/repository');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!template) return null;

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-32 pb-24 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          to="/repository" 
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors mb-12 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-base font-bold uppercase tracking-widest">Kembali ke Galeri</span>
        </Link>

        {/* Detail Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
              <img 
                src={template.image} 
                alt={template.title} 
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {template.categories.map((cat, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full">
                    <Tag size={12} className="text-primary" />
                    <span className="text-base uppercase tracking-[1px] text-primary font-bold">{cat}</span>
                  </div>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-black leading-tight text-slate-900 dark:text-white">
                {template.title}
              </h1>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
              {template.description}
            </p>

            <div className="pt-8">
              <a 
                href={template.canvaUrl} 
                target="_blank" 
                rel="no-referrer"
                className="inline-flex items-center gap-3 bg-primary text-slate-900 px-8 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(5,152,73,0.3)]"
              >
                Gunakan Template <ExternalLink size={20} />
              </a>
              <p className="mt-4 text-slate-500 text-lg italic">
                *Tautan ini akan mengarahkan Anda langsung ke platform Canva.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Recommendations Section */}
        <section className="border-t border-slate-200 dark:border-white/5 pt-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-2">Rekomendasi Lainnya</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Pilih desain lain yang mungkin sesuai dengan UMKM Anda.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recommendations.map((rec) => (
              <Link 
                key={rec.id} 
                to={`/repository/${rec.id}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 mb-4 shadow-lg transition-all group-hover:border-primary/30">
                  <img 
                    src={rec.image} 
                    alt={rec.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 dark:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="text-white font-black text-base uppercase tracking-widest flex items-center gap-2">
                       Lihat Desain <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{rec.title}</h4>
                <p className="text-slate-500 text-lg uppercase tracking-widest mt-1">{rec.category}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default TemplateDetail;
