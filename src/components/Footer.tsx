import { Link } from 'react-router-dom';
import { 
  ChevronRight, Instagram, Mail, MessageCircle
} from 'lucide-react';
import logo from '../assets/sentrakreasi.png';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 pt-24 pb-12 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          <div className="col-span-full lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <img 
                src={logo} 
                alt="Sentra Kreasi Logo" 
                className="h-16 md:h-20 w-auto"
              />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Komunitas penggerak literasi dan inovasi digital untuk kemajuan kampung-kampung di Indonesia.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={18} />, href: 'https://instagram.com/sentrakreasi.ukm' },
                { icon: <Mail size={18} />, href: 'mailto:sentrakreasibandung@gmail.com' },
                { icon: <MessageCircle size={18} />, href: 'https://wa.me/6289611284382' }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="no-referrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-base">Navigasi</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link to="/tentang-kami" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link to="/artikel" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Artikel & Berita</Link></li>
              <li><Link to="/kegiatan" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Agenda Kegiatan</Link></li>
              <li><Link to="/repository" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Repository Kode</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-base">Newsletter</h4>
            <div className="flex gap-2 p-2 glass rounded-xl">
              <input type="email" placeholder="Email Anda" className="w-full px-4 bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-500" />
              <button className="bg-primary text-slate-900 p-2 rounded-lg">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Sentra Kreasi Digital.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
