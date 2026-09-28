import { motion } from 'framer-motion';
import { Star, Palette, Brain, Award } from 'lucide-react';
import Section, { Reveal } from './Section';
import { prizes } from '../data/prizes';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

const specialIcons = [Star, Palette, Brain, Award];

export default function Prizes() {
  return (
    <Section id="prizes" eyebrow="Rewards" title="Prizes">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-6 md:grid-cols-3 items-end"
      >
        {prizes.main.map((p, i) => {
          const isFirst = i === 0;
          return (
            <motion.div 
              key={p.rank} 
              variants={itemVariants}
              whileHover={{ y: -10 }} 
              className={`card relative overflow-hidden text-center p-8 ${isFirst ? 'md:-translate-y-4 border-brand-purple/50 shadow-[0_0_40px_-10px_#8659e6] py-12' : ''}`}
            >
              {isFirst && (
                <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/10 to-transparent pointer-events-none" />
              )}
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className={`text-5xl ${isFirst ? 'text-7xl mb-4' : ''}`} 
                aria-hidden="true"
              >
                {p.icon}
              </motion.div>
              <h3 className="mt-4 font-semibold text-sm">
                <span className="bg-gradient-to-r from-brand-teal to-brand-purple text-transparent bg-clip-text uppercase tracking-widest">{p.rank}</span>
              </h3>
              <p className={`grad-text mt-1 font-extrabold ${isFirst ? 'text-4xl' : 'text-3xl'}`}>{p.amount}</p>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.ul 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {prizes.special.map((s, i) => {
          const Icon = specialIcons[i % specialIcons.length];
          return (
            <motion.li 
              key={s} 
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="card flex flex-col items-center justify-center p-4 text-center text-sm font-medium gap-2 border-white/5 hover:border-brand-teal/30 hover:bg-white/5 transition-colors"
            >
              <Icon size={18} className="text-brand-teal" />
              <span>{s}</span>
            </motion.li>
          );
        })}
      </motion.ul>
      <Reveal>
        <p className="mt-6 text-center text-xs text-white/40">Placeholder amounts until official prizes are announced.</p>
      </Reveal>
    </Section>
  );
}
