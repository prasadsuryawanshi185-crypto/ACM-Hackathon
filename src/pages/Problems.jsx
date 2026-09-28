import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import ProblemCard from '../components/ProblemCard';
import { problems } from '../data/problems';

const filters = ['All', 'Novice', 'Expert', 'AI/ML', 'Web', 'App', 'IoT', 'Open Innovation'];

export default function Problems() {
  const [q, setQ] = useState('');
  const [f, setF] = useState('All');
  const list = useMemo(() => problems.filter((p) =>
    (f === 'All' || p.track === f.toLowerCase() || p.domain === f) &&
    `${p.id} ${p.title} ${p.domain} ${p.short}`.toLowerCase().includes(q.toLowerCase())), [q, f]);
  return (
    <div className="container-x min-h-screen pb-20 pt-28">
      <p className="eyebrow">Challenges</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Problem statements</h1>
      <div className="relative mt-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search problems..." aria-label="Search problem statements" className="min-h-[44px] w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm placeholder:text-white/40" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter problems">
        {filters.map((x) => <button key={x} onClick={() => setF(x)} aria-pressed={f === x} className={`min-h-[40px] rounded-full border px-4 text-sm transition ${f === x ? 'border-transparent bg-gradient-to-r from-brand-teal to-brand-purple' : 'border-white/15 text-white/70 hover:bg-white/10'}`}>{x}</button>)}
      </div>
      <p className="mt-6 text-sm text-white/50" aria-live="polite">{list.length} problem{list.length !== 1 && 's'} · sample data, official statements coming soon</p>
      {list.length ? <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProblemCard key={p.id} p={p} />)}</div> : <p className="card mt-6 p-8 text-center text-white/60">No problem statements match your search.</p>}
    </div>
  );
}
