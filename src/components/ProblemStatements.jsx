import { Link } from 'react-router-dom';
import Section from './Section';
import ProblemCard from './ProblemCard';
import { problems } from '../data/problems';

export default function ProblemStatements() {
  return (
    <Section id="problems" eyebrow="Challenges" title="Problem statements">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{problems.slice(0, 3).map((p) => <ProblemCard key={p.id} p={p} />)}</div>
      <div className="mt-10 text-center"><Link to="/problems" className="btn btn-primary">View all problem statements</Link></div>
    </Section>
  );
}
