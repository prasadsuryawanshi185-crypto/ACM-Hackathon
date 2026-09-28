import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { problems } from '../data/problems';

const Block = ({ title, children }) => <section className="mt-8"><h2 className="text-lg font-semibold text-brand-teal">{title}</h2><div className="mt-2 text-white/70">{children}</div></section>;
const List = ({ items }) => <ul className="list-disc space-y-1 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>;

export default function ProblemDetails() {
  const { id } = useParams();
  const p = problems.find((x) => x.id === id);
  return (
    <div className="container-x min-h-screen max-w-3xl pb-20 pt-28">
      <Link to="/problems" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"><ArrowLeft size={16} /> All problems</Link>
      {!p ? <h1 className="mt-8 text-3xl font-bold">Problem statement not found</h1> : (
        <article>
          <p className="mt-6 font-mono text-sm text-brand-teal">{p.id.toUpperCase()} · <span className="capitalize">{p.track}</span> track · {p.domain}</p>
          <h1 className="mt-2 text-4xl font-bold">{p.title}</h1>
          {p.placeholder && <p className="tag mt-3 inline-block">Sample content - official statement pending</p>}
          <Block title="Description"><p>{p.short}</p></Block>
          <Block title="Background"><p>{p.background}</p></Block>
          <Block title="Expected solution"><p>{p.expected}</p></Block>
          <Block title="Constraints"><List items={p.constraints} /></Block>
          <Block title="Submission requirements"><List items={p.submission} /></Block>
        </article>
      )}
    </div>
  );
}
