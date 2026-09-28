import { Lightbulb, Users, Cpu, GraduationCap, Network, Award } from 'lucide-react';
import Section, { Reveal } from './Section';
import { event } from '../data/event';

const features = [[Lightbulb, 'Innovation'], [Users, 'Teamwork'], [Cpu, 'Technology'], [GraduationCap, 'Mentorship'], [Network, 'Networking'], [Award, 'Recognition']];

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="About WCE ACM Hackathon">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <svg viewBox="0 0 400 320" className="w-full" role="img" aria-label="Abstract illustration of connected technology nodes">
            <defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#2fe6ac" /><stop offset="1" stopColor="#8659e6" /></linearGradient></defs>
            {[140, 105, 70].map((r, i) => <circle key={r} cx="200" cy="160" r={r} fill="none" stroke="url(#ag)" strokeOpacity={0.6 - i * 0.15} strokeDasharray={i ? '4 6' : '0'} />)}
            {[[200, 20], [320, 90], [330, 220], [200, 300], [70, 230], [80, 90]].map(([x, y], i) => (<g key={i}><line x1="200" y1="160" x2={x} y2={y} stroke="#fff" strokeOpacity=".15" /><circle cx={x} cy={y} r="9" fill="url(#ag)" /></g>))}
            <text x="200" y="172" textAnchor="middle" fontSize="40" fontFamily="monospace" fill="url(#ag)">{'</>'}</text>
          </svg>
        </Reveal>
        <div>
          {event.about.map((t) => <p key={t} className="mb-4 text-white/70">{t}</p>)}
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {features.map(([Icon, name], i) => (
              <Reveal key={name} delay={i * 0.05}>
                <li className="card flex flex-col items-center gap-2 p-4 text-center"><Icon className="text-brand-teal" size={22} aria-hidden="true" /><span className="text-sm font-medium">{name}</span></li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
