import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchPages, CmsPage } from '../services/cmsApi';

const Contact = () => {
  const [pageData, setPageData] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPageData = async () => {
      try {
        const pages = await fetchPages();
        const contactPage = pages.find((p) => p.slug === 'kontak');
        if (contactPage) {
          setPageData(contactPage);
        }
      } catch (error) {
        console.error("Gagal mengambil data halaman kontak:", error);
      } finally {
        setLoading(false);
      }
    };

    getPageData();
  }, []);

  const heroBlock = pageData?.content.find(block => block.type === 'hero');
  const heroData = heroBlock?.data || {
    headline: "Mari Berkolaborasi Untuk Desa!",
    sub_headline: "Hubungi Kami"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[48px] overflow-hidden p-8 md:p-20 relative">
          <div className="grid lg:grid-cols-2 gap-16 relative z-10 items-stretch">
            <div>
              <div className="inline-block px-3 py-1 glass rounded-full mb-6">
                <span className="text-base uppercase tracking-[1px] text-primary font-bold">{heroData.sub_headline}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white leading-tight mb-8">
                {heroData.headline}
              </h2>
              <div className="space-y-6">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Jl.+Raya+Banjaran+Km+14+Gg.+Kesehatan+No+124+Kp.+Sepen+Rt+05+Rw+06+Desa+Sukasari+Kec.+Pameungpeuk+Kab.+Bandung"
                  target="_blank"
                  rel="no-referrer"
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 glass rounded-xl flex items-center justify-center text-sky-400 shadow-lg shadow-sky-400/5 group-hover:bg-sky-400 group-hover:text-white dark:group-hover:text-slate-900 transition-all duration-300 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Alamat</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed group-hover:text-primary transition-colors">
                      Jl. Raya Banjaran Km 14 Gg. Kesehatan No 124 Kp. Sepen Rt 05 Rw 06 Desa Sukasari Kec. Pameungpeuk Kab. Bandung
                    </p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/6289611284382"
                  target="_blank"
                  rel="no-referrer"
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 glass rounded-xl flex items-center justify-center text-sky-400 shadow-lg shadow-sky-400/5 group-hover:bg-sky-400 group-hover:text-white dark:group-hover:text-slate-900 transition-all duration-300 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">No Telepon</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-primary transition-colors">+62 896 1128 4382</p>
                  </div>
                </a>

                <a 
                  href="https://instagram.com/sentrakreasi.ukm"
                  target="_blank"
                  rel="no-referrer"
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 glass rounded-xl flex items-center justify-center text-sky-400 shadow-lg shadow-sky-400/5 group-hover:bg-sky-400 group-hover:text-white dark:group-hover:text-slate-900 transition-all duration-300 shrink-0">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Instagram</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-primary transition-colors">@sentrakreasi.ukm</p>
                  </div>
                </a>

                <a 
                  href="mailto:sentrakreasibandung@gmail.com"
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 glass rounded-xl flex items-center justify-center text-sky-400 shadow-lg shadow-sky-400/5 group-hover:bg-sky-400 group-hover:text-white dark:group-hover:text-slate-900 transition-all duration-300 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Email</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-primary transition-colors">sentrakreasibandung@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="glass p-8 md:p-12 rounded-3xl shadow-2xl relative bg-black/5 dark:bg-slate-800/40 flex flex-col">
              <form className="space-y-6 flex flex-col h-full">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Nama Lengkap</label>
                    <input type="text" placeholder="John Doe" className="w-full px-6 py-4 glass bg-white dark:bg-slate-900/50 border-slate-200 dark:border-white/5 rounded-xl text-slate-900 dark:text-white outline-none focus:border-primary/50 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 glass bg-white dark:bg-slate-900/50 border-slate-200 dark:border-white/5 rounded-xl text-slate-900 dark:text-white outline-none focus:border-primary/50 transition-all font-medium" />
                  </div>
                </div>
                <div className="space-y-2 flex flex-col flex-grow">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Pesan</label>
                  <textarea placeholder="Ceritakan ide Anda..." className="w-full px-6 py-4 glass bg-white dark:bg-slate-900/50 border-slate-200 dark:border-white/5 rounded-xl text-slate-900 dark:text-white outline-none focus:border-primary/50 transition-all font-medium flex-grow resize-none min-h-[150px]"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-slate-900 py-5 rounded-xl font-black text-lg shadow-xl shadow-primary/10 hover:scale-[1.02] active:scale-100 transition-all mt-auto">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
