import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { RegisterButton } from './Section';

const links = [['Home', 'home'], ['About', 'about'], ['Tracks', 'tracks'], ['Timeline', 'timeline'], ['Problem Statements', 'problems'], ['Prizes', 'prizes'], ['Sponsors', 'sponsors'], ['FAQ', 'faq'], ['Contact', 'contact']];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { pathname } = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => {
    if (pathname !== '/') { setActive(''); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(([, id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('button[aria-label]')) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-white/10 bg-ink/85 bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      {/* Top Edge Gradient Line */}
      <AnimatePresence>
        {(scrolled || open) && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-teal/50 to-transparent" 
          />
        )}
      </AnimatePresence>

      <nav className="container-x relative flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link to="/#home" className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider">
          WCE<span className="grad-text">/ACM</span>
          <motion.span 
            className="h-2 w-2 rounded-full bg-brand-teal shadow-[0_0_8px_rgba(47,230,172,0.8)]"
            animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </Link>
        <ul className="hidden items-center gap-5 xl:flex">
          {links.map(([label, id]) => (
            <motion.li key={id} className="relative" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Link to={`/#${id}`} className={`text-sm transition hover:text-white ${active === id ? 'text-white' : 'text-white/60'}`} aria-current={active === id ? 'true' : undefined}>{label}</Link>
              {active === id && (
                <motion.span 
                  layoutId="nav-active" 
                  className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded bg-gradient-to-r from-brand-teal to-brand-purple shadow-[0_0_10px_rgba(47,230,172,0.5)]" 
                />
              )}
            </motion.li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <RegisterButton className="!min-h-[40px] !px-4" />
          <button 
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/5 transition-colors hover:bg-white/10 xl:hidden" 
            onClick={() => setOpen(!open)} 
            aria-label={open ? 'Close menu' : 'Open menu'} 
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={open ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>
      
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-full overflow-hidden bg-ink/95 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-xl border-b border-white/10 shadow-2xl xl:hidden"
          >
            <ul className="container-x py-4 flex flex-col">
              {links.map(([label, id], i) => (
                <motion.li 
                  key={id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <Link 
                    to={`/#${id}`} 
                    onClick={() => setOpen(false)} 
                    className={`block border-b border-white/5 py-3 ${active === id ? 'text-brand-teal' : 'text-white/80'} hover:text-white hover:bg-white/[0.02] px-2 rounded-t transition-colors`}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
