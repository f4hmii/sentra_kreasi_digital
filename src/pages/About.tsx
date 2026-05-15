import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Smartphone, ShieldCheck, GraduationCap } from 'lucide-react';
import { fetchPages, CmsPage } from '../services/cmsApi';

const About = () => {
  const [pageData, setPageData] = useState<CmsPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const pages = await fetchPages();
        const aboutPage = pages.find((p) => p.slug === 'tentang-kami');
        if (aboutPage) {
          setPageData(aboutPage);
        }
      } catch (error) {
        console.error('Failed to fetch about page data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const heroBlock = pageData?.content?.find((block) => block.type === 'hero');
  const heroData = heroBlock?.data;

  const headline = heroData?.headline || "UMKM Sentra Kreasi Bandung";
  const subHeadline = heroData?.sub_headline || "UMKM Sentra Kreasi Bandung didirikan pada tahun 2018 sebagai wadah untuk memperkuat dan mempromosikan karya dan kreasi UMKM di Kabupaten Bandung. Kami berkomitmen untuk membantu para pengusaha lokal mengembangkan bisnis mereka dan memperkenalkan produk-produk unik Kabupaten Bandung ke pasar yang lebih luas.";
  const bgImage = heroData?.background_image || "https://sentrakreasi.org/_astro/kegiatan._9Pme9Eu_Z26Dj3w.webp";

  const words = headline.split(' ');
  const lastWord = words.length > 1 ? words.pop() : '';
  const firstPart = words.join(' ');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const services = [
    {
      icon: <Smartphone className="text-primary" size={32} />,
      title: "Mendukung Transformasi Digital UMKM",
      desc: "Mendampingi UMKM memanfaatkan teknologi seperti media sosial, website, dan marketplace untuk memperluas pasar."
    },
    {
      icon: <ShieldCheck className="text-emerald-400" size={32} />,
      title: "Peningkatan Kualitas dan Standarisasi Produk",
      desc: "Membantu UMKM memperoleh izin usaha, memperbaiki kemasan, dan menyusun laporan keuangan yang sesuai standar."
    },
    {
      icon: <GraduationCap className="text-amber-400" size={32} />,
      title: "Pengembangan Kapasitas melalui Pelatihan dan Komunitas",
      desc: "Mengadakan pelatihan konten kreatif dan pemasaran digital, serta membangun komunitas kolaboratif bagi pelaku UMKM."
    }
  ];

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen overflow-hidden relative">


      {/* Hero Section */}
      <section className="relative pt-12 pb-12 px-6 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="inline-block px-3 py-1 glass rounded-full">
                <span className="text-base uppercase tracking-[1px] text-primary font-bold">Tentang Kami</span>
              </div>
              <h1 className="text-3xl md:text-6xl font-display font-black text-slate-900 dark:text-white leading-tight">
                {firstPart} {lastWord && <span className="text-gradient">{lastWord}</span>}
                {!lastWord && <span className="text-gradient">{firstPart}</span>}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {subHeadline}
              </p>
              
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative group"
            >
              <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
                <img 
                  src={bgImage} 
                  alt="Tentang Kami" 
                  className="w-full h-full object-cover transition-all duration-700 opacity-60 dark:opacity-80"
                />
                <div className="absolute inset-0 bg-slate-900/40"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* What We Do Section */}
      <section className="pt-16 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 glass rounded-full mb-6">
              <span className="text-base uppercase tracking-[1px] text-primary font-bold">Fokus Kami</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white leading-tight">
              Apa yang <span className="text-gradient">Kami Lakukan</span>
            </h2>
          </div>

          {/* Wide Cinematic Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-20 relative group"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative aspect-[21/9] md:aspect-[3/1] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
              <img 
                src="https://sentrakreasi.org/_astro/about.5YO-U3_e_Z184lvk.webp" 
                alt="Aktivitas Sentra Kreasi" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 dark:opacity-100"
              />
              <div className="absolute inset-0 bg-slate-900/40"></div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group p-8 md:p-10 bg-white dark:bg-slate-800/40 rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 text-center lg:text-left flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>
                
                <div className="relative z-10 space-y-6 flex-grow">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-lg transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pt-16 pb-32 px-6 bg-slate-100/50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 glass rounded-full mb-6">
              <span className="text-base uppercase tracking-[1px] text-primary font-bold">Para Penggerak</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Tim <span className="text-gradient">Kami</span>
            </h2>
          </div>

          {/* Leaders Section */}
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { 
                name: "Asep Kurniawan", 
                role: "Ketua", 
                desc: "Memimpin arah dan strategi komunitas untuk kemajuan UMKM di Kabupaten Bandung.",
                image: "https://images.ctfassets.net/cdbs9kaqj6a1/4V9XxLTJePn36gdpuA99FL/f4405264f0a2321127f902f93d6ab017/IMG-20241211-WA0016.jpg" 
              },
              { 
                name: "Yuda Isparela", 
                role: "Wakil Ketua", 
                desc: "Mendukung implementasi program dan memastikan sinergi antar bidang berjalan optimal.",
                image: "https://images.ctfassets.net/cdbs9kaqj6a1/4BgF9mHEtH8boWeERdanwL/eed708e913e5ca0afbea0175619becc3/IMG-20241211-WA0020.jpg" 
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group p-8 glass border border-primary/20 rounded-[2.5rem] hover:border-primary/50 transition-all duration-500 flex flex-col h-full bg-primary/5"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 border border-white/10">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-60"></div>
                </div>
                <div className="space-y-4 flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary text-lg font-black uppercase tracking-widest">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full Team Label & Photo */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-12 relative group"
            >
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative aspect-[21/9] md:aspect-[3/1] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
                <img 
                  src="https://images.ctfassets.net/cdbs9kaqj6a1/5riHWNGzs3ZCyySuFZXCuS/ecb5390b64948ce72cc4229633a72518/IMG-20241211-WA0013.jpg" 
                  alt="Full Team Sentra Kreasi" 
                  className="w-full h-full object-cover object-[50%_30%] transition-transform duration-1000 group-hover:scale-105 opacity-80 dark:opacity-100"
                />
                <div className="absolute inset-0 bg-slate-900/40"></div>
              </div>
            </motion.div>

            <h3 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">Full Team</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Kampung Digital Sentra Kreasi dipimpin oleh tim pengurus inti yang berdedikasi untuk memberdayakan.
            </p>
          </div>

          {/* Other Members Horizontal Scroll */}
          <div className="flex overflow-x-auto gap-6 pb-12 px-4 -mx-4 snap-x no-scrollbar">
            {[
              { 
                name: "Defi Fahrurrozi", 
                role: "Sekretaris", 
                desc: "Memastikan administrasi dan tata kelola internal komunitas berjalan dengan lancar.",
                image: "https://images.ctfassets.net/cdbs9kaqj6a1/5HienO8dEGdPOAbkIzZLym/bd09fff9cabd2455c32e240fe05b549c/DefiFahrur.jpg" 
              },
              { 
                name: "Khalid Yusuf", 
                role: "Bendahara", 
                desc: "Mengelola keuangan secara transparan dan akuntabel untuk mendukung setiap inisiatif.",
                image: "https://images.ctfassets.net/cdbs9kaqj6a1/2QhNJiJtjKGSpUGQt9z7TE/18b1d56ce8b29153dd9a44f764e3b876/IMG-20241211-WA0014.jpg" 
              },
              { 
                name: "Jembar Hardian", 
                role: "Bidang Fotografi", 
                desc: "Menghadirkan keahlian visual melalui Bidang Fotografi untuk dokumentasi dan promosi.",
                image: "https://images.ctfassets.net/cdbs9kaqj6a1/4pEurGsGojYTjaLIvuwj9J/b5d64ccd2b12c9c0c783f2cd12ef7ffe/IMG-20241211-WA0013.jpg" 
              },
              { 
                name: "Anis Fahrunisa", 
                role: "Bidang Video Animasi", 
                desc: "Mengembangkan konten kreatif di Bidang Video Animasi untuk edukasi dan kampanye digital.",
                image: "https://images.ctfassets.net/cdbs9kaqj6a1/3mAcqW0ekVhbVCelCWEwrW/c28a089fe8f00b3f116e4ab71f0dc0c7/IMG-20241211-WA0018.jpg" 
              },
              { 
                name: "Dudy Sandani", 
                role: "Bidang Sosial Media", 
                desc: "Memimpin strategi digital melalui Bidang Sosial Media untuk jangkauan komunitas yang luas.",
                image: "https://images.ctfassets.net/cdbs9kaqj6a1/76jgWFS2v9v1fhlvcqfQVU/ac7c5eb6dbb7cab8b4d79297dca2ddb6/IMG-20241211-WA0017.jpg" 
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-center group p-6 glass border border-white/5 rounded-[2.5rem] hover:border-primary/30 transition-all duration-500 h-full"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 border border-white/10">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-60"></div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary/70 text-lg font-black uppercase tracking-widest">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light min-h-[60px]">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
