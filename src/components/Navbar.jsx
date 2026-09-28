import { useEffect, useState } from 'react';
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

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-white/10 bg-ink/85 backdrop-blur-lg' : 'bg-transparent'}`}>
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link to="/#home" className="font-mono text-sm font-bold tracking-wider">WCE<span className="grad-text">/ACM</span></Link>
        <ul className="hidden items-center gap-5 xl:flex">
          {links.map(([label, id]) => (
            <li key={id} className="relative">
              <Link to={`/#${id}`} className={`text-sm transition hover:text-white ${active === id ? 'text-white' : 'text-white/60'}`} aria-current={active === id ? 'true' : undefined}>{label}</Link>
              {active === id && <motion.span layoutId="nav-active" className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded bg-gradient-to-r from-brand-teal to-brand-purple" />}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <RegisterButton className="!min-h-[40px] !px-4" />
          <button className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="container-x overflow-hidden xl:hidden">
            {links.map(([label, id]) => (
              <li key={id}><Link to={`/#${id}`} onClick={() => setOpen(false)} className={`block border-b border-white/5 py-3 ${active === id ? 'text-brand-teal' : 'text-white/80'}`}>{label}</Link></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
