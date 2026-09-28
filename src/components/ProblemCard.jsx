import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ProblemCard({ p }) {
  return (
    <article className="card flex flex-col p-6">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-mono text-brand-teal">{p.id.toUpperCase()}</span>
        <span className="flex gap-1.5">{p.placeholder && <span className="tag">Sample</span>}<span className="rounded-full border border-white/15 px-2.5 py-0.5 capitalize text-white/70">{p.track}</span></span>
      </div>
      <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
      <p className="mt-1 text-xs text-brand-purple">{p.domain}</p>
      <p className="mt-3 flex-1 text-sm text-white/65">{p.short}</p>
      <Link to={`/problems/${p.id}`} aria-label={`View details for ${p.title}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal transition-all hover:gap-2">View Details <ArrowRight size={16} /></Link>
    </article>
  );
}
