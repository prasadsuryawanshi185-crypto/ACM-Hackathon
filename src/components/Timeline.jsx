import { motion } from 'framer-motion';
import Section from './Section';
import { timeline } from '../data/timeline';

const dot = {
  completed: 'bg-brand-teal border-brand-teal',
  current: 'bg-brand-purple border-brand-purple shadow-[0_0_14px_#8659e6]',
  upcoming: 'bg-ink border-white/30'
};

export default function Timeline() {
  return (
    <Section id="timeline" eyebrow="Schedule" title="Event timeline">
      <ol className="relative ml-4 sm:ml-0">
        {/* Glowing center line */}
        <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-gradient-to-b from-brand-teal to-brand-purple shadow-[0_0_10px_rgba(47,230,172,0.5)] sm:left-1/2 sm:-translate-x-1/2" aria-hidden="true" />
        
        {timeline.map((t, i) => (
          <motion.li
            key={t.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            viewport={{ once: true, margin: '-40px' }}
            className={`relative mb-12 pl-10 sm:w-1/2 sm:pl-0 ${
              i % 2 ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12 sm:text-right'
            }`}
          >
            {/* Connector line (desktop only) */}
            <div className={`absolute top-6 hidden h-[2px] w-8 bg-gradient-to-r from-brand-teal/50 to-brand-purple/50 sm:block ${
              i % 2 ? 'left-4' : 'right-4'
            }`} aria-hidden="true" />
            
            {/* Animated Dot */}
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              animate={t.status === 'current' ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] } : {}}
              className={`absolute -left-[5px] top-5 z-10 h-3.5 w-3.5 rounded-full border-2 sm:top-5 ${dot[t.status]} ${
                i % 2 ? 'sm:-left-[7px]' : 'sm:-right-[7px] sm:left-auto'
              }`}
              aria-hidden="true"
            />
            
            {/* Glass Card */}
            <div className="card relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6">
              <span className="pointer-events-none absolute right-4 top-4 select-none font-mono text-4xl font-bold text-white/[0.05]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-mono text-xs text-brand-teal">
                {t.date} <span className="ml-1 uppercase text-white/40">{t.status}</span>
              </p>
              <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-white/60">{t.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
