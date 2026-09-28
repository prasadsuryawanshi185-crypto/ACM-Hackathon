import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from './Section';
import { faq } from '../data/faq';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  const toggle = (i) => setOpen(open === i ? -1 : i);

  return (
    <Section id="faq" eyebrow="Questions" title="Frequently asked questions">
      <div className="mx-auto max-w-3xl space-y-4">
        {faq.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true, margin: '-20px' }}
              className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                isOpen 
                  ? 'border-brand-teal/30 bg-white/[0.05] shadow-[0_0_15px_rgba(47,230,172,0.15)]' 
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <h3>
                <button
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => toggle(i)}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-brand-teal/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] sm:text-base">{f.q}</span>
                  </div>
                  <div className="relative h-5 w-5 shrink-0 text-white/70">
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </motion.span>
                    <motion.span
                      animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </motion.span>
                  </div>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pl-[4.5rem] text-sm leading-relaxed text-white/65">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
