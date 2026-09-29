import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Deterministic particle positions (avoid re-randomizing on re-render)
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: ((i * 73 + 17) % 100),
  y: ((i * 47 + 29) % 100),
  size: (i % 3) + 1,
  delay: (i % 7) * 0.15,
}));

const GRID_LINES_H = 12;
const GRID_LINES_V = 20;

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'reveal'

  useEffect(() => {
    let start = null;
    const duration = 2000;

    const tick = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setPhase('reveal');
        setTimeout(onComplete, 800);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#050510' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* ── Animated Grid ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Horizontal grid lines */}
        {Array.from({ length: GRID_LINES_H }, (_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 h-px w-full"
            style={{
              top: `${((i + 1) / (GRID_LINES_H + 1)) * 100}%`,
              background: 'linear-gradient(90deg, transparent, rgba(47,230,172,0.06), transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: i * 0.04, ease: 'easeOut' }}
          />
        ))}
        {/* Vertical grid lines */}
        {Array.from({ length: GRID_LINES_V }, (_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 w-px h-full"
            style={{
              left: `${((i + 1) / (GRID_LINES_V + 1)) * 100}%`,
              background: 'linear-gradient(180deg, transparent, rgba(134,89,230,0.05), transparent)',
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: i * 0.03, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* ── Radial glows ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(47,230,172,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/4 top-1/3 rounded-full"
          style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(134,89,230,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* ── Floating particles ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-brand-teal"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0], y: [0, -30, 0] }}
            transition={{
              duration: 2.5,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Geometric ring decoration ── */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <motion.div
          className="absolute -left-[150px] -top-[150px] h-[300px] w-[300px] rounded-full border border-white/[0.04]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -left-[200px] -top-[200px] h-[400px] w-[400px] rounded-full border border-brand-teal/[0.06]"
          style={{ borderStyle: 'dashed' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -left-[260px] -top-[260px] h-[520px] w-[520px] rounded-full border border-brand-purple/[0.04]"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Large percentage counter */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span
            className="block font-mono text-[120px] font-black leading-none tracking-tighter sm:text-[160px] md:text-[200px]"
            style={{
              background: 'linear-gradient(135deg, #2fe6ac 0%, #8659e6 50%, #2fe6ac 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(47,230,172,0.2))',
            }}
          >
            {String(progress).padStart(2, '0')}
          </span>
          {/* Percentage sign */}
          <span
            className="absolute -right-6 top-4 font-mono text-2xl font-bold sm:-right-8 sm:text-3xl"
            style={{ color: 'rgba(47,230,172,0.5)' }}
          >
            %
          </span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mt-6 w-48 sm:w-64"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2fe6ac, #8659e6)',
                boxShadow: '0 0 20px rgba(47,230,172,0.5)',
              }}
              transition={{ duration: 0.05 }}
            />
          </div>
        </motion.div>

        {/* Branding */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-brand-teal/50" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              WCE ACM
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-brand-purple/50" />
          </div>
          <h1
            className="text-lg font-bold uppercase tracking-[0.2em] sm:text-xl"
            style={{
              background: 'linear-gradient(90deg, #2fe6ac, #8659e6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hackathon 2027
          </h1>
        </motion.div>

        {/* Status text */}
        <motion.p
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {progress < 30 ? 'Initializing' : progress < 60 ? 'Loading assets' : progress < 90 ? 'Preparing experience' : 'Almost ready'}
        </motion.p>
      </div>

      {/* ── Corner accents ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Top-left */}
        <div className="absolute left-6 top-6">
          <div className="h-12 w-px bg-gradient-to-b from-brand-teal/40 to-transparent" />
          <div className="absolute left-0 top-0 h-px w-12 bg-gradient-to-r from-brand-teal/40 to-transparent" />
        </div>
        {/* Top-right */}
        <div className="absolute right-6 top-6">
          <div className="h-12 w-px bg-gradient-to-b from-brand-purple/40 to-transparent ml-auto" />
          <div className="absolute right-0 top-0 h-px w-12 bg-gradient-to-l from-brand-purple/40 to-transparent" />
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-6 left-6">
          <div className="h-12 w-px bg-gradient-to-t from-brand-purple/40 to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-12 bg-gradient-to-r from-brand-purple/40 to-transparent" />
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-6 right-6">
          <div className="h-12 w-px bg-gradient-to-t from-brand-teal/40 to-transparent ml-auto" />
          <div className="absolute bottom-0 right-0 h-px w-12 bg-gradient-to-l from-brand-teal/40 to-transparent" />
        </div>
      </div>

      {/* ── Scan line effect ── */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(47,230,172,0.15) 50%, transparent 100%)',
          boxShadow: '0 0 15px rgba(47,230,172,0.1)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />

      {/* ── Screen flash on complete ── */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            className="absolute inset-0 z-20"
            style={{ background: 'radial-gradient(circle, rgba(47,230,172,0.15), transparent 60%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
