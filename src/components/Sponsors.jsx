import Section from './Section';
import { sponsors } from '../data/sponsors';

const tiers = [['title', 'Title Partner'], ['gold', 'Gold Partners'], ['silver', 'Silver Partners'], ['community', 'Community Partners']];

export default function Sponsors() {
  const active = tiers.filter(([k]) => sponsors[k].length);
  return (
    <Section id="sponsors" eyebrow="Partners" title="Sponsors">
      {active.length === 0 ? <p className="card p-8 text-center text-white/60">Sponsors will be announced soon.</p> : active.map(([k, label]) => (
        <div key={k} className="mb-10">
          <h3 className="mb-4 text-sm uppercase tracking-widest text-white/50">{label}</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sponsors[k].map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="card grid h-28 place-items-center p-4"><img src={s.logo} alt={s.name} loading="lazy" className="max-h-full max-w-full object-contain" /></a>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
