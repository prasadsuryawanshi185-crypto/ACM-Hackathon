import { motion } from 'framer-motion';
import Section from './Section';

const steps = ['Register', 'Form Team', 'Choose Problem', 'Build Solution', 'Present', 'Win'];

export default function HowItWorks() {
  return (
    <Section id="how" eyebrow="Process" title="How it works">
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        <motion.div className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] origin-left bg-gradient-to-r from-brand-teal to-brand-purple lg:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} aria-hidden="true" />
        <motion.div className="absolute bottom-6 left-6 top-6 w-px origin-top bg-gradient-to-b from-brand-teal to-brand-purple sm:hidden" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} aria-hidden="true" />
        {steps.map((s, i) => (
          <motion.li key={s} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="relative flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
            <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand-teal/60 bg-ink font-mono text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-sm font-semibold uppercase tracking-wider">{s}</span>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
