import { Instagram, Linkedin, Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { event } from '../data/event';

export default function Footer() {
  const s = event.socialLinks;
  const socials = [
    [Instagram, 'Instagram', s.instagram],
    [Linkedin, 'LinkedIn', s.linkedin],
    [Github, 'GitHub', s.github],
    [Mail, 'Email', event.contactEmail && `mailto:${event.contactEmail}`]
  ];
  
  const links = [
    ['Home', '#home'],
    ['About', '#about'],
    ['Timeline', '#timeline'],
    ['FAQ', '#faq']
  ];

  return (
    <footer id="contact" className="relative scroll-mt-16 bg-gradient-to-b from-brand-purple/5 to-transparent pb-8 pt-16">
      {/* Animated glow accent */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-teal to-transparent opacity-50 shadow-[0_0_15px_#2fe6ac]" />
      
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-3 md:items-center">
          
          {/* Branding Left */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="text-2xl font-bold tracking-tight">WCE <span className="text-brand-teal">ACM</span></span>
            <p className="mt-2 text-sm text-white/70">{event.organizer}</p>
            <p className="mt-1 text-sm text-white/50">{event.venue}</p>
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-brand-purple">
              Build. Innovate. Impact.
            </p>
          </div>
          
          {/* Nav Center */}
          <div className="flex flex-col items-center justify-center">
            <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-white/60">
              {links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="transition-colors hover:text-brand-teal">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Right */}
          <div className="flex justify-center md:justify-end">
            <ul className="flex gap-4">
              {socials.map(([Icon, label, url]) => (
                <li key={label}>
                  <motion.a
                    href={url || undefined}
                    aria-label={label}
                    aria-disabled={!url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-brand-teal hover:text-brand-teal hover:shadow-[0_0_15px_rgba(47,230,172,0.3)] ${
                      url ? '' : 'pointer-events-none opacity-40'
                    }`}
                  >
                    <Icon size={20} />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/40">© 2027 {event.organizer}. All Rights Reserved.</p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
