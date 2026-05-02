import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, Search, Layers, Zap, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { templates } from '../data/templates';

const Repository = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'Sosial Media', label: 'Sosial Media' },
    { id: 'Poster', label: 'Poster' },
    { id: 'Branding', label: 'Branding' },
    { id: 'Dokumen', label: 'Dokumen' },
  ];

  const filteredTemplates = templates.filter(t => {
    const matchesFilter = filter === 'all' || t.category === filter;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="pt-20 pb-32 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header content from user request */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 glass rounded-full mb-6">
            <span className="text-base uppercase tracking-[1px] text-primary font-bold">Repository Tools</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white leading-tight mb-10">
            Katalog <span className="text-gradient">Galeri Digital</span>
          </h2>
          <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light text-center">
            <p>
              Repository Tools adalah platform berbasis web yang dirancang khusus untuk menyimpan, mengelola, dan membagikan koleksi gambar dan video dalam bentuk katalog galeri digital. Platform ini memberikan pengalaman yang mudah dan efisien bagi pengguna untuk menemukan, mengakses, dan memanfaatkan konten media secara cepat melalui tautan yang terintegrasi pada setiap gambar atau video.
            </p>
            <p>
              Repository Tools bertujuan untuk menjadi solusi utama dalam mengelola media digital, baik untuk kebutuhan pribadi maupun profesional. Dengan desain yang intuitif dan navigasi yang ramah pengguna, platform ini memungkinkan akses ke berbagai konten visual hanya dengan beberapa klik. Setiap gambar atau video dalam katalog dilengkapi dengan deskripsi serta tautan unik untuk meningkatkan fleksibilitas dan kemudahan akses.
            </p>
          </div>
        </div>

        {/* Features/Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "Koleksi Luas",
              desc: "Ribuan foto dan video dalam berbagai kategori, mulai dari alam, kreativitas hingga teknologi.",
              icon: <Layers className="text-primary" size={32} />
            },
            {
              title: "Kemudahan Akses",
              desc: "Klik tombol untuk langsung mengunduh foto atau video yang Anda pilih, tanpa repot.",
              icon: <Zap className="text-primary" size={32} />
            },
            {
              title: "Gratis dan Lisensi Aman",
              desc: "Jelajahi koleksi kami dengan tenang, karena kami menjamin konten yang tersedia telah dilengkapi lisensi penggunaan yang sesuai.",
              icon: <ShieldCheck className="text-primary" size={32} />
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="mb-16 space-y-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Cari katalog (contoh: Website, Video, Promosi...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-full py-4 pl-14 pr-6 text-slate-900 dark:text-white focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-light"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full text-base font-bold uppercase tracking-widest transition-all ${
                  filter === cat.id 
                  ? 'bg-primary text-slate-900 shadow-[0_0_20px_rgba(5,152,73,0.3)]' 
                  : 'glass text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, i) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <Link to={`/repository/${template.id}`} className="block relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 dark:opacity-100"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                    {template.title}
                  </h4>
                  <p className="text-primary text-base uppercase tracking-widest font-black">
                    {template.category}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 text-base font-black uppercase tracking-widest text-white hover:text-primary transition-colors">
                    Lihat Detail <ArrowRight size={14} />
                  </div>
                </div>

                {/* Corner Type Label */}
                <div className="absolute top-6 left-6 px-3 py-1 glass rounded-full">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">{template.category}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 font-light italic">Belum ada template dalam kategori ini.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Repository;
