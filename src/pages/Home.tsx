import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight,
  ShoppingBag,
  Users,
  Zap,
  MapPin,
  Instagram,
  Phone,
  Mail
} from 'lucide-react';

import { fetchPages, fetchPosts, CmsPage, CmsPost, fixDriveUrl, parseContent } from '../services/cmsApi';

const Hero = ({ data }: { data?: any }) => {
  const headline = data?.headline || "Komunitas Kampung Digital Sentra Kreasi";
  const subHeadline = data?.sub_headline || "Kabupaten Bandung pada awalnya merupakan sebuah tempat/ komunitas dimana para pelaku UKM dari Kecamatan Pameungpeuk dan sekitarnya (Baleendah, Arjasari dan Banjaran) berkumpul.";
  const bgImage = data?.background_image || "https://sentrakreasi.org/_astro/bg.DyT21dKi_Z1WHrvR.webp";

  const words = headline.split(' ');
  const lastTwoWords = words.length > 2 ? words.splice(-2).join(' ') : '';
  const firstPart = words.join(' ');

  return (
    <section className="relative min-h-[80vh] flex items-center py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Community Innovation" 
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-80 dark:opacity-100 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-slate-50/30 dark:bg-slate-900/70"></div>
        {/* Soft glow behind text for maximum legibility without hiding the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[60%] bg-white/70 dark:bg-slate-900/50 blur-[100px] rounded-full pointer-events-none"></div>
      </div>



      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black leading-tight mb-6 text-slate-900 dark:text-white">
            {firstPart} {lastTwoWords && <span className="text-gradient">{lastTwoWords}</span>}
            {!lastTwoWords && <span className="text-gradient">{firstPart}</span>}
          </h1>
          <p className="text-lg text-black dark:text-slate-400 mb-10 leading-relaxed font-semibold mx-auto">
            {subHeadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4 sm:px-0">
            <Link to="/repository" className="w-full sm:w-auto px-8 py-4 bg-primary text-slate-900 rounded-lg font-bold hover:scale-105 transition-all flex items-center justify-center gap-2">
              Lihat Repository <ArrowRight size={20} />
            </Link>
            <Link to="/tentang-kami" className="w-full sm:w-auto px-8 py-4 glass rounded-lg font-bold text-slate-900 dark:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              Kenali Kami
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductHighlights = ({ data, products }: { data?: any, products: CmsPost[] }) => {

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-block px-3 py-1 glass rounded-full mb-6">
            <span className="text-base uppercase tracking-[1px] text-primary font-bold">Highlight Produk</span>
          </div>
          {data?.content ? (
            <h2 
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 dark:text-white leading-snug [&_strong]:text-primary break-words"
              dangerouslySetInnerHTML={{ __html: data.content.replace(/<\/?h2>/g, '') }}
            />
          ) : (
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 dark:text-white leading-snug break-words">
              Produk UKM <span className="text-gradient">Sentral Kreasi</span>
            </h2>
          )}
        </div>

        <div className="space-y-32">
          {products.map((product, i) => {
            const rawContent = parseContent(product.content);
            const content = (Array.isArray(rawContent) ? rawContent[0] : rawContent) || {};
            const imageUrl = fixDriveUrl(content.featured_image || content.product_gallery?.[0]?.url) || 'https://via.placeholder.com/800x600?text=No+Image';
            
            const excerptParts = (product.excerpt || content.excerpt || '').split('\n').map((s: string) => s.trim()).filter(Boolean);
            const tagline = excerptParts.length > 0 ? excerptParts[0] : 'Produk Unggulan';
            const footer = excerptParts.length > 1 ? excerptParts.slice(1).join(' ') : '';
            
            const features = content.specifications || [];

            return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={imageUrl} 
                    alt={product.title} 
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-900/60"></div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                <div>
                  <p className="text-primary text-lg font-black uppercase tracking-widest mb-3">{tagline}</p>
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
                    {product.title}
                  </h3>
                  <div className="w-20 h-1 bg-primary/30 mx-auto lg:mx-0 rounded-full"></div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 py-4">
                  {features.map((feature: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">{feature.label}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{feature.value}</p>
                    </div>
                  ))}
                </div>

                {footer && (
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed border-l-2 border-primary/20 pl-6 italic max-w-lg mx-auto lg:mx-0">
                    {footer}
                  </p>
                )}

                <div className="pt-4">
                  <Link to="/hubungi-kami" className="px-8 py-4 bg-primary text-slate-900 rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20 inline-flex items-center gap-2">
                    Pesan Sekarang <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};

const EventsSection = ({ events }: { events: CmsPost[] }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-primary/20"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-end mb-24">
          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 glass rounded-full mb-6">
              <span className="text-base uppercase tracking-[1px] text-primary font-bold">UKM SENTRA KREASI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white leading-snug break-words">
              Event - event yang <br/> <span className="text-primary">Telah Diselenggarakan</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link to="/kegiatan" className="w-full lg:w-auto px-8 py-4 glass text-slate-900 dark:text-white rounded-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
              Lihat Semua Event <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
          {events.slice(0, 4).map((event, i) => {
            const rawContent = parseContent(event.content);
            const eventContent = (Array.isArray(rawContent) ? rawContent[0] : rawContent) || {};
            const imageUrl = fixDriveUrl(eventContent.event_gallery?.[0]?.url || eventContent.featured_image) || 'https://via.placeholder.com/800x600?text=No+Image';
            const eventExcerpt = (event.excerpt || eventContent.excerpt || "Deskripsi kegiatan tidak tersedia.").replace(/&nbsp;/g, ' ');

            return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="space-y-6">
                <Link to={`/kegiatan/${event.slug}`} className="block aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={imageUrl} 
                    alt={event.title} 
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 max-w-[calc(100%-2rem)]">
                    <div className="glass px-2 py-0.5 rounded-full">
                      <span className="text-primary font-display font-black text-xs">0{i + 1}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-slate-900/40 opacity-60"></div>
                </Link>

                <div className="space-y-4 px-2">
                  <Link to={`/kegiatan/${event.slug}`} className="block">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {event.title}
                    </h2>
                  </Link>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                    {eventExcerpt}
                  </p>
                  <Link to={`/kegiatan/${event.slug}`} className="text-primary text-base font-black uppercase tracking-widest flex items-center gap-2 py-2 group/btn">
                    Baca Selengkapnya <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};

const FindUsSection = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 glass rounded-full mb-6">
            <span className="text-base uppercase tracking-[1px] text-primary font-bold">Find Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white leading-snug break-words">
            Kunjungi <span className="text-gradient">Kami</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Alamat</h4>
                  <a 
                    href="https://maps.google.com/?q=-7.0145892,107.5794717"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed hover:text-primary transition-colors block"
                  >
                    Jl. Raya Banjaran Km 14 Gg. Kesehatan No 124 Kp. Sepen Rt 05 Rw 06 Desa Sukasari Kec. Pameungpeuk Kab. Bandung
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <Instagram className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Instagram</h4>
                  <a 
                    href="https://instagram.com/sentrakreasi.ukm" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed hover:text-primary transition-colors block"
                  >
                    @sentrakreasi.ukm
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">No Telepon</h4>
                  <a 
                    href="https://wa.me/6289611284382"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed hover:text-primary transition-colors block"
                  >
                    089611284382
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Email</h4>
                  <a 
                    href="mailto:sentrakreasibandung@gmail.com"
                    className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed hover:text-primary transition-colors block"
                  >
                    sentrakreasibandung@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
              <p className="text-primary text-lg font-medium leading-relaxed italic">
                "Lokasi Kami: Jl. Raya Banjaran KM 14, Gg. Kesehatan No 124, RT 05/ RW 06, Desa Sukasari, Kec. Pameungpeuk Bandung"
              </p>
            </div>
          </motion.div>

          {/* Map Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full min-h-[400px] lg:min-h-full"
          >
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <iframe 
                src="https://maps.google.com/maps?q=-7.0145892,107.5794717&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full min-h-[450px] border-0"
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [pageData, setPageData] = useState<CmsPage | null>(null);
  const [latestEvents, setLatestEvents] = useState<CmsPost[]>([]);
  const [latestProducts, setLatestProducts] = useState<CmsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pages, posts] = await Promise.all([fetchPages(), fetchPosts()]);
        
        const homePage = pages.find((p) => p.slug === 'home');
        if (homePage) {
          setPageData(homePage);
        }

        const events = posts.filter(post => post.category === 'Event' && post.status === 'published');
        events.sort((a, b) => b.id - a.id); // Terbesar (terbaru) di atas
        setLatestEvents(events);

        const products = posts.filter(post => post.category === 'Produk' && post.status === 'published');
        products.sort((a, b) => b.id - a.id);
        setLatestProducts(products);
      } catch (error) {
        console.error('Failed to fetch home page data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const heroBlock = pageData?.content?.find((block) => block.type === 'hero');
  const richTextBlock = pageData?.content?.find((block) => block.type === 'rich-text');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Hero data={heroBlock?.data} />
      <ProductHighlights data={richTextBlock?.data} products={latestProducts} />
      <EventsSection events={latestEvents} />
      <FindUsSection />
    </>
  );
};

export default Home;
