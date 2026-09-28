import { motion } from 'framer-motion';
import { Lightbulb, Users, Cpu, GraduationCap, Network, Award } from 'lucide-react';
import Section, { Reveal } from './Section';
import { event } from '../data/event';

const features = [[Lightbulb, 'Innovation'], [Users, 'Teamwork'], [Cpu, 'Technology'], [GraduationCap, 'Mentorship'], [Network, 'Networking'], [Award, 'Recognition']];

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="About WCE ACM Hackathon">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-brand-teal/20 blur-xl animate-pulse" />
            </div>
            <svg viewBox="0 0 400 320" className="w-full relative z-10" role="img" aria-label="Abstract illustration of connected technology nodes">
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#2fe6ac" />
                  <stop offset="1" stopColor="#8659e6" />
                </linearGradient>
              </defs>
              <g className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '200px 160px' }}>
                {[140, 105, 70].map((r, i) => (
                  <circle key={r} cx="200" cy="160" r={r} fill="none" stroke="url(#ag)" strokeOpacity={0.6 - i * 0.15} strokeDasharray={i ? '4 6' : '0'} />
                ))}
              </g>
              {[[200, 20], [320, 90], [330, 220], [200, 300], [70, 230], [80, 90]].map(([x, y], i) => (
                <g key={i}>
                  <line x1="200" y1="160" x2={x} y2={y} stroke="#fff" strokeOpacity=".15" />
                  <circle cx={x} cy={y} r="9" fill="url(#ag)" />
                </g>
              ))}
              <text x="200" y="172" textAnchor="middle" fontSize="40" fontFamily="monospace" fill="url(#ag)">{'</>'}</text>
            </svg>
          </div>
        </Reveal>
        <div>
          {event.about.map((t) => (
            <p key={t} className="mb-4 text-white/70 border-l-2 border-brand-teal/30 pl-4">{t}</p>
          ))}
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {features.map(([Icon, name], i) => (
              <Reveal key={name} delay={i * 0.05}>
                <motion.li 
                  whileHover={{ y: -4 }}
                  className="card group flex flex-col items-center gap-2 p-4 text-center border border-white/10 hover:border-brand-teal/50 hover:shadow-[0_0_15px_-5px_#2fe6ac] transition-colors"
                >
                  <Icon className="text-brand-teal transition-transform group-hover:scale-110" size={22} aria-hidden="true" />
                  <span className="text-sm font-medium">{name}</span>
                </motion.li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
