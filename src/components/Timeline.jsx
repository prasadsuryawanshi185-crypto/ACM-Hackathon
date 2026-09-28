import { motion } from 'framer-motion';
import Section from './Section';
import { timeline } from '../data/timeline';

const dot = { completed: 'bg-brand-teal border-brand-teal', current: 'bg-brand-purple border-brand-purple shadow-[0_0_14px_#8659e6]', upcoming: 'bg-ink border-white/30' };

export default function Timeline() {
  return (
    <Section id="timeline" eyebrow="Schedule" title="Event timeline">
      <ol className="relative ml-3 border-l border-white/15 sm:ml-0 sm:border-l-0">
        <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-white/15 sm:block" aria-hidden="true" />
        {timeline.map((t, i) => (
          <motion.li key={t.title} initial={{ opacity: 0, x: i % 2 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} className={`relative mb-8 pl-8 sm:w-1/2 sm:pl-0 ${i % 2 ? 'sm:ml-auto sm:pl-10' : 'sm:pr-10 sm:text-right'}`}>
            <span className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 ${dot[t.status]} ${i % 2 ? '' : 'sm:-right-[7px] sm:left-auto'}`} aria-hidden="true" />
            <p className="font-mono text-xs text-brand-teal">{t.date} <span className="ml-1 uppercase text-white/40">{t.status}</span></p>
            <h3 className="mt-1 font-semibold">{t.title}</h3>
            <p className="text-sm text-white/60">{t.description}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
