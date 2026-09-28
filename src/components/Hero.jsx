import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
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

const orbs = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  size: Math.random() * 200 + 100,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 10,
  opacity: Math.random() * 0.1 + 0.05
}));

export default function Hero() {
  const ms = useCountdown(event.date);
  const s = ms === null ? null : Math.floor(ms / 1000);
  const units = [['Days', s === null ? null : Math.floor(s / 86400)], ['Hours', s === null ? null : Math.floor(s / 3600) % 24], ['Minutes', s === null ? null : Math.floor(s / 60) % 60], ['Seconds', s === null ? null : s % 60]];
  const up = (i) => ({ 
    initial: { opacity: 0, y: 30 }, 
    animate: { opacity: 1, y: 0 }, 
    transition: { type: 'spring', damping: 20, stiffness: 100, delay: 0.1 * i } 
  });

  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24"
    >
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      
      {/* Mouse Follow Glow */}
      <div 
        className="pointer-events-none absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/10 blur-[100px] transition-opacity duration-300"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%, -50%)` }} 
      />

      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-teal/25 blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand-purple/25 blur-[120px]" aria-hidden="true" />
      
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Twinkle particles */}
        {Array.from({ length: 16 }, (_, i) => (
          <span key={`twinkle-${i}`} className="twinkle absolute h-1 w-1 rounded-full bg-brand-teal" style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`, animationDelay: `${(i % 5) * 0.8}s` }} />
        ))}
        
        {/* Floating Orbs */}
        {orbs.map((orb) => (
          <motion.div
            key={`orb-${orb.id}`}
            className="absolute rounded-full bg-brand-purple blur-[50px]"
            style={{ width: orb.size, height: orb.size, left: orb.left, top: orb.top, opacity: orb.opacity }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0]
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay
            }}
          />
        ))}

        {code.map((c, i) => (
          <code key={c} className="float absolute hidden font-mono text-xs text-white/25 md:block" style={{ left: `${6 + i * 32}%`, top: `${22 + i * 22}%`, animationDelay: `${i}s` }}>{c}</code>
        ))}
      </div>

      <div className="container-x relative text-center z-10">
        <motion.p {...up(0)} className="eyebrow tracking-[0.2em] sm:tracking-[0.3em] font-semibold">
          {event.organizer}
        </motion.p>
        
        <motion.h1 {...up(1)} className="mt-4 text-5xl font-extrabold leading-none tracking-tight sm:text-7xl lg:text-8xl">
          <motion.span 
            className="grad-text inline-block"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% auto' }}
          >
            HACKATHON
          </motion.span>{' '}
          <span className="text-white drop-shadow-[0_0_20px_rgba(47,230,172,0.4)]">2027</span>
        </motion.h1>

        <motion.p {...up(2)} className="mt-5 text-xl font-semibold sm:text-2xl inline-block relative overflow-hidden">
          <span className="relative z-10">{event.tagline}</span>
          <motion.span 
            className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          />
        </motion.p>

        <motion.p {...up(3)} className="mx-auto mt-4 max-w-xl text-white/65">{event.description}</motion.p>

        <motion.div {...up(4)} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded bg-gradient-to-r from-brand-teal to-brand-purple opacity-30 blur transition duration-300 group-hover:opacity-100"></div>
            <RegisterButton 
              label={
                <span className="flex items-center gap-2 justify-center">
                  REGISTER NOW
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              } 
              className="relative w-full" 
            />
          </div>
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded bg-gradient-to-r from-brand-purple to-brand-teal opacity-30 blur transition duration-300 group-hover:opacity-100"></div>
            <Link to="/problems" className="btn btn-ghost relative flex items-center gap-2 bg-ink/90 backdrop-blur">
              <Sparkles size={18} className="text-brand-purple" />
              EXPLORE PROBLEM STATEMENTS
            </Link>
          </div>
        </motion.div>

        <motion.div {...up(5)} className="mx-auto mt-12 grid max-w-xl grid-cols-4 gap-2 sm:gap-4" role="timer" aria-label="Countdown to the hackathon">
          {units.map(([label, v]) => (
            <div key={label} className="card relative overflow-hidden px-1 py-3 border border-white/10 bg-white/[0.03] backdrop-blur-sm sm:py-4 hover:border-brand-teal/30 hover:bg-white/[0.06] transition-all duration-300">
              <div className="absolute -inset-px opacity-0 hover:opacity-100 transition duration-500 rounded bg-gradient-to-r from-brand-teal/20 to-brand-purple/20 pointer-events-none" />
              <div className="font-mono text-2xl font-bold tabular-nums sm:text-4xl h-[40px] flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={v}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="inline-block"
                  >
                    {v === null ? '--' : String(v).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50 sm:text-xs">{label}</div>
            </div>
          ))}
        </motion.div>
        
        {ms === null && <p className="mt-3 text-xs text-white/40">Event date to be announced</p>}
      </div>
    </section>
  );
}
