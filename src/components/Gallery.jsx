import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from './Section';
import { event } from '../data/event';

const items = event.gallery;
const Pic = ({ it, i, cls = '' }) => it.src
  ? <img src={it.src} alt={it.alt} loading="lazy" className={`h-full w-full object-cover ${cls}`} />
  : <div role="img" aria-label={it.alt} className={`grid h-full w-full place-items-center ${cls}`} style={{ background: `linear-gradient(135deg,hsl(${220 + i * 25} 70% 28%),hsl(${260 + i * 15} 60% 14%))` }}><ImageIcon className="text-white/40" /></div>;

export default function Gallery() {
  const [idx, setIdx] = useState(null);
  useEffect(() => {
    if (idx === null) return;
    const k = (e) => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [idx]);

  return (
    <Section id="gallery" eyebrow="Moments" title="Gallery">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.button key={i} whileHover={{ scale: 1.03 }} onClick={() => setIdx(i)} aria-label={`Open image ${i + 1}`} className={`overflow-hidden rounded-xl border border-white/10 ${i === 0 ? 'col-span-2 aspect-[2/1] md:col-span-2' : 'aspect-square'}`}>
            <Pic it={it} i={i} cls="transition duration-500 hover:brightness-125" />
          </motion.button>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-white/35">Placeholder images - add real photos in src/data/event.js</p>
      <AnimatePresence>
        {idx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => setIdx(null)}>
            <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10" onClick={() => setIdx(null)} aria-label="Close"><X /></button>
            <button className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-white/10" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + items.length) % items.length); }} aria-label="Previous"><ChevronLeft /></button>
            <motion.div key={idx} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="aspect-video w-full max-w-4xl overflow-hidden rounded-xl" onClick={(e) => e.stopPropagation()}><Pic it={items[idx]} i={idx} /></motion.div>
            <button className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-white/10" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % items.length); }} aria-label="Next"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
