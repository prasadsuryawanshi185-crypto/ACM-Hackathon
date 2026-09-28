import { useEffect, useRef, useState } from 'react';
import { animate, useInView, motion } from 'framer-motion';
import { Users, Clock, Trophy, Target } from 'lucide-react';
import { event } from '../data/event';

function Count({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  
  useEffect(() => {
    if (!inView || typeof to !== 'number') return;
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  
  return <span ref={ref}>{typeof to === 'number' ? `${n}${suffix}` : to}</span>;
}

const getIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes('participant') || l.includes('user')) return Users;
  if (l.includes('team')) return Target;
  if (l.includes('hour') || l.includes('duration')) return Clock;
  if (l.includes('prize')) return Trophy;
  return Users;
};

export default function EventStats() {
  return (
    <section aria-label="Event statistics" className="border-y border-white/10 bg-white/[0.02] py-16 relative overflow-hidden">
      <div className="container-x grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {event.stats.map((s, i) => {
          const Icon = getIcon(s.label);
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: '-20px' }}
              whileHover={{ y: -5 }}
              className="card group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center shadow-lg backdrop-blur-sm transition-colors hover:border-brand-teal/30 hover:bg-white/[0.05]"
            >
              <div className="mb-4 rounded-full bg-white/5 p-3 text-brand-teal transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-purple">
                <Icon size={24} />
              </div>
              <div className="grad-text text-4xl font-extrabold sm:text-5xl drop-shadow-[0_0_15px_rgba(47,230,172,0.3)]">
                <Count to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/60">
                {s.label}
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs text-white/35">Placeholder figures - update in src/data/event.js</p>
    </section>
  );
}
