import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 1500; // 1.5 seconds

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.floor(currentProgress));
      
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 200); // Slight delay before unmounting
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  // Particle positions
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random(),
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Radial Glow Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-teal/20 blur-[100px] rounded-full mix-blend-screen" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-brand-purple/20 blur-[80px] rounded-full mix-blend-screen" />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full bg-white/40 blur-[1px]"
          style={{ top: p.top, left: p.left }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 grad-text gradient-shift">
            WCE ACM
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl font-medium tracking-[0.3em] text-white/80 uppercase"
          >
            Hackathon 2027
          </motion.div>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div 
          className="mt-12 w-64 md:w-80 flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-brand-teal">
            <span>INITIALIZING</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-teal to-brand-purple shadow-glow transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
