import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import Section, { Reveal } from './Section';
import { sponsors } from '../data/sponsors';

const tiers = [['title', 'Title Partner'], ['gold', 'Gold Partners'], ['silver', 'Silver Partners'], ['community', 'Community Partners']];

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

export default function Sponsors() {
  const active = tiers.filter(([k]) => sponsors[k].length);
  return (
    <Section id="sponsors" eyebrow="Partners" title="Sponsors">
      {active.length === 0 ? (
        <Reveal>
          <div className="card relative overflow-hidden border border-white/10 p-12 text-center flex flex-col items-center justify-center gap-4 bg-white/5 backdrop-blur-sm before:absolute before:inset-0 before:bg-gradient-to-br before:from-brand-teal/10 before:to-brand-purple/10 before:opacity-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-teal to-brand-purple" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="p-4 rounded-full bg-white/5 border border-white/10">
              <Handshake size={48} className="text-brand-purple" />
            </motion.div>
            <p className="text-xl font-medium text-white/80 z-10">Sponsors will be announced soon.</p>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-brand-teal/50 to-brand-purple/50 z-10" />
          </div>
        </Reveal>
      ) : active.map(([k, label]) => (
        <div key={k} className="mb-10">
          <Reveal>
            <h3 className="mb-4 text-sm uppercase tracking-widest text-white/50">{label}</h3>
          </Reveal>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {sponsors[k].map((s) => (
              <motion.a 
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                key={s.name} 
                href={s.url} 
                target="_blank" 
                rel="noreferrer" 
                className="card relative grid h-28 place-items-center p-4 overflow-hidden group hover:border-brand-purple/50 hover:shadow-[0_0_20px_-5px_#8659e6] transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src={s.logo} alt={s.name} loading="lazy" className="max-h-full max-w-full object-contain relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      ))}
    </Section>
  );
}
