import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Globe, Smartphone, Cpu, Sparkles } from 'lucide-react';

const DomainIcon = ({ domain, className }) => {
  const d = domain.toLowerCase();
  if (d.includes('ai') || d.includes('ml') || d.includes('artificial')) return <Brain className={className} size={14} />;
  if (d.includes('web')) return <Globe className={className} size={14} />;
  if (d.includes('app') || d.includes('mobile')) return <Smartphone className={className} size={14} />;
  if (d.includes('iot') || d.includes('hardware')) return <Cpu className={className} size={14} />;
  return <Sparkles className={className} size={14} />;
};

export default function ProblemCard({ p }) {
  return (
    <motion.article 
      whileHover={{ y: -6 }}
      className="card group relative flex flex-col p-6 overflow-hidden border-white/10 hover:border-brand-teal/40 hover:shadow-[0_0_20px_-10px_#2fe6ac] transition-colors"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-teal to-brand-purple opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-mono text-brand-teal">{p.id.toUpperCase()}</span>
        <span className="flex gap-1.5 items-center">
          {p.placeholder && <span className="tag">Sample</span>}
          <span className="rounded-full bg-gradient-to-r from-brand-purple/20 to-brand-teal/20 border border-white/10 px-2.5 py-0.5 capitalize text-white/90 font-medium">
            {p.track}
          </span>
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
      <p className="mt-1 text-xs text-brand-purple flex items-center gap-1.5">
        <DomainIcon domain={p.domain} />
        {p.domain}
      </p>
      <p className="mt-3 flex-1 text-sm text-white/65">{p.short}</p>
      <Link 
        to={`/problems/${p.id}`} 
        aria-label={`View details for ${p.title}`} 
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal transition-all group-hover:text-brand-purple"
      >
        View Details 
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.article>
  );
}
