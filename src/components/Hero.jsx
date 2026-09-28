import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { event } from '../data/event';
import { RegisterButton } from './Section';

function useCountdown(date) {
  const target = date ? new Date(date).getTime() : NaN;
  const [ms, setMs] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    if (Number.isNaN(target)) return;
    const t = setInterval(() => setMs(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);
  return Number.isNaN(target) ? null : ms;
}

const code = ['const idea = build();', 'git commit -m "ship it"', 'while (learning) grow();'];

export default function Hero() {
  const ms = useCountdown(event.date);
  const s = ms === null ? null : Math.floor(ms / 1000);
  const units = [['Days', s === null ? null : Math.floor(s / 86400)], ['Hours', s === null ? null : Math.floor(s / 3600) % 24], ['Minutes', s === null ? null : Math.floor(s / 60) % 60], ['Seconds', s === null ? null : s % 60]];
  const up = (i) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1 * i } });

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-teal/25 blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand-purple/25 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} className="twinkle absolute h-1 w-1 rounded-full bg-brand-teal" style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`, animationDelay: `${(i % 5) * 0.8}s` }} />
        ))}
        {code.map((c, i) => (
          <code key={c} className="float absolute hidden font-mono text-xs text-white/25 md:block" style={{ left: `${6 + i * 32}%`, top: `${22 + i * 22}%`, animationDelay: `${i}s` }}>{c}</code>
        ))}
      </div>
      <div className="container-x relative text-center">
        <motion.p {...up(0)} className="eyebrow">{event.organizer}</motion.p>
        <motion.h1 {...up(1)} className="mt-4 text-5xl font-extrabold leading-none tracking-tight sm:text-7xl lg:text-8xl">
          <span className="grad-text">HACKATHON</span> 2027
        </motion.h1>
        <motion.p {...up(2)} className="mt-5 text-xl font-semibold sm:text-2xl">{event.tagline}</motion.p>
        <motion.p {...up(3)} className="mx-auto mt-4 max-w-xl text-white/65">{event.description}</motion.p>
        <motion.div {...up(4)} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <RegisterButton label="REGISTER NOW" />
          <Link to="/problems" className="btn btn-ghost">EXPLORE PROBLEM STATEMENTS</Link>
        </motion.div>
        <motion.div {...up(5)} className="mx-auto mt-12 grid max-w-xl grid-cols-4 gap-2 sm:gap-4" role="timer" aria-label="Countdown to the hackathon">
          {units.map(([label, v]) => (
            <div key={label} className="card px-1 py-3 sm:py-4">
              <div className="font-mono text-2xl font-bold tabular-nums sm:text-4xl">{v === null ? '--' : String(v).padStart(2, '0')}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50 sm:text-xs">{label}</div>
            </div>
          ))}
        </motion.div>
        {ms === null && <p className="mt-3 text-xs text-white/40">Event date to be announced</p>}
      </div>
    </section>
  );
}
