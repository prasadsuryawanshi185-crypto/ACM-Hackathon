import { motion } from 'framer-motion';
import Section from './Section';
import { tracks } from '../data/tracks';

export default function Tracks() {
  return (
    <Section id="tracks" eyebrow="Tracks" title="Choose your track">
      <div className="grid gap-6 md:grid-cols-2">
        {tracks.map((t) => (
          <motion.article key={t.id} whileHover={{ y: -6 }} className="card p-8">
            <h3 className="text-2xl font-bold uppercase tracking-wide"><span className="grad-text">{t.name}</span></h3>
            <p className="mt-3 text-white/70">{t.description}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/50"><span className="font-semibold text-white/80">Eligibility: </span>{t.eligibility}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
