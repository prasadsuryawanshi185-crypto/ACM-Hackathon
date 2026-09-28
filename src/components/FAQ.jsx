import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Section from './Section';
import { faq } from '../data/faq';

export default function FAQ() {
  const [open, setOpen] = useState([0]);
  const toggle = (i) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o.slice(-1), i])); // max 2 open
  return (
    <Section id="faq" eyebrow="Questions" title="Frequently asked questions">
      <div className="mx-auto max-w-3xl space-y-3">
        {faq.map((f, i) => (
          <div key={f.q} className="card">
            <h3><button className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium" aria-expanded={open.includes(i)} aria-controls={`faq-${i}`} onClick={() => toggle(i)}>
              {f.q}<ChevronDown size={18} className={`shrink-0 transition ${open.includes(i) ? 'rotate-180' : ''}`} />
            </button></h3>
            <AnimatePresence initial={false}>
              {open.includes(i) && <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="px-5 pb-5 text-sm text-white/65">{f.a}</p></motion.div>}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
