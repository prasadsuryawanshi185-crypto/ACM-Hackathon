import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { event } from '../data/event';

export const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-16 py-20 sm:py-28 ${className}`}>
      <div className="container-x">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function RegisterButton({ label = 'Register Now', className = '' }) {
  const cls = `btn btn-primary ${className}`;
  return event.registrationUrl
    ? <motion.a whileHover={{ scale: 1.04 }} href={event.registrationUrl} target="_blank" rel="noreferrer" className={cls}>{label}</motion.a>
    : <Link to="/#register" className={cls}>{label}</Link>;
}
