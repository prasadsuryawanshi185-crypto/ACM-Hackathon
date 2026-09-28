import { motion } from 'framer-motion';
import Section from './Section';
import { prizes } from '../data/prizes';

export default function Prizes() {
  return (
    <Section id="prizes" eyebrow="Rewards" title="Prizes">
      <div className="grid gap-6 md:grid-cols-3">
        {prizes.main.map((p, i) => (
          <motion.div key={p.rank} whileHover={{ y: -6 }} className={`card p-8 text-center ${i === 0 ? 'border-brand-purple/50 shadow-[0_0_40px_-10px_#8659e6]' : ''}`}>
            <div className="text-5xl" aria-hidden="true">{p.icon}</div>
            <h3 className="mt-3 font-semibold">{p.rank}</h3>
            <p className="grad-text mt-1 text-3xl font-extrabold">{p.amount}</p>
          </motion.div>
        ))}
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {prizes.special.map((s) => <li key={s} className="card p-4 text-center text-sm font-medium">{s}</li>)}
      </ul>
      <p className="mt-4 text-center text-xs text-white/35">Placeholder amounts until official prizes are announced.</p>
    </Section>
  );
}
