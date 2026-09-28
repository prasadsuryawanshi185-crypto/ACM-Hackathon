import { motion } from 'framer-motion';
import { Reveal, RegisterButton } from './Section';
import { event } from '../data/event';

export default function RegistrationCTA() {
  return (
    <section id="register" className="scroll-mt-16 py-20 sm:py-28 relative">
      <Reveal className="container-x">
        <div className="relative overflow-hidden rounded-3xl p-[1px] group">
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-teal via-brand-purple to-brand-teal animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative h-full w-full rounded-3xl bg-ink overflow-hidden px-6 py-16 sm:py-24 text-center">
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-bg opacity-30" />
            
            {/* Floating orbs */}
            <motion.div 
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute -top-20 -left-20 w-64 h-64 bg-brand-teal/20 rounded-full blur-[80px] pointer-events-none" 
            />
            <motion.div 
              animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-20 -right-20 w-72 h-72 bg-brand-purple/20 rounded-full blur-[80px] pointer-events-none" 
            />

            {/* Particles */}
            <div className="absolute inset-0 twinkle opacity-50 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold sm:text-6xl tracking-tight">
                <span className="grad-text drop-shadow-[0_0_20px_rgba(47,230,172,0.3)]">READY TO BUILD</span><br/>THE FUTURE?
              </h2>
              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
                Join {event.name} and turn your ideas into reality. Let's innovate together.
              </p>
              <div className="mt-10 flex justify-center">
                {event.registrationUrl ? (
                  <RegisterButton label="REGISTER NOW" className="px-8 py-4 text-lg" />
                ) : (
                  <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-brand-teal to-brand-purple">
                    <div className="px-8 py-4 rounded-full bg-ink">
                      <p className="grad-text text-xl font-bold tracking-widest">REGISTRATION OPENS SOON</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
