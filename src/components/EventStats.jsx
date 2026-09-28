import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
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

export default function EventStats() {
  return (
    <section aria-label="Event statistics" className="border-y border-white/10 bg-white/[0.02] py-12">
      <div className="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {event.stats.map((s) => (
          <div key={s.label}>
            <div className="grad-text text-4xl font-extrabold sm:text-5xl"><Count to={s.value} suffix={s.suffix} /></div>
            <div className="mt-1 text-sm uppercase tracking-widest text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-white/35">Placeholder figures - update in src/data/event.js</p>
    </section>
  );
}
