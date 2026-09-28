import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { event } from '../data/event';

export const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div 
    className={className} 
    initial={{ opacity: 0, y: 24 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, margin: '-60px' }} 
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
  >
    {children}
  </motion.div>
);

export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-16 py-20 sm:py-28 ${className}`}>
      <div className="container-x">
        <Reveal className="mb-12 max-w-2xl relative">
          <div className="absolute -top-4 left-0 h-[1px] w-32 bg-gradient-to-r from-brand-teal to-brand-purple/0 rounded-full" />
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function RegisterButton({ label = 'Register Now', className = '' }) {
  const cls = `btn btn-primary group relative overflow-hidden flex items-center justify-center gap-2 shadow-[0_0_15px_-5px_#2fe6ac] hover:shadow-[0_0_25px_-5px_#2fe6ac] transition-all ${className}`;
  
  const Inner = () => (
    <>
      {label}
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  return event.registrationUrl
    ? (
      <motion.a 
        whileHover={{ scale: 1.04 }} 
        href={event.registrationUrl} 
        target="_blank" 
        rel="noreferrer" 
        className={cls}
      >
        <Inner />
      </motion.a>
    ) : (
      <motion.div whileHover={{ scale: 1.04 }} className="inline-block">
        <Link to="/#register" className={cls}>
          <Inner />
        </Link>
      </motion.div>
    );
}
