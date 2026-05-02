import { motion } from 'motion/react';

const ArticleCard = ({ title, date, category, image, excerpt }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all h-full flex flex-col"
  >
    <div className="relative h-56 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover opacity-80" />
      <div className="absolute top-4 left-4 glass backdrop-blur-md text-primary font-bold text-base uppercase tracking-wider px-3 py-1 rounded-full">
        {category}
      </div>
    </div>
    <div className="p-8 flex flex-col flex-grow">
      <div className="text-base text-slate-500 font-medium mb-3">{date}</div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-snug line-clamp-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
        {excerpt}
      </p>
      <div className="mt-auto pt-4 flex items-center justify-between">
        <span className="text-primary font-bold text-sm cursor-pointer hover:underline">Baca Selengkapnya</span>
      </div>
    </div>
  </motion.div>
);

export default ArticleCard;
