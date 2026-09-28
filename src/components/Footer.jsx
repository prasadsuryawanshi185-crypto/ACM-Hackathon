import { Instagram, Linkedin, Github, Mail } from 'lucide-react';
import { event } from '../data/event';

export default function Footer() {
  const s = event.socialLinks;
  const socials = [[Instagram, 'Instagram', s.instagram], [Linkedin, 'LinkedIn', s.linkedin], [Github, 'GitHub', s.github], [Mail, 'Email', event.contactEmail && `mailto:${event.contactEmail}`]];
  return (
    <footer id="contact" className="scroll-mt-16 border-t border-white/10 py-12">
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <div><p className="font-semibold">{event.organizer}</p><p className="text-sm text-white/60">{event.venue}</p></div>
        <ul className="flex gap-3">
          {socials.map(([Icon, label, url]) => (
            <li key={label}><a href={url || undefined} aria-label={label} aria-disabled={!url} target="_blank" rel="noreferrer" className={`grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:bg-white/10 ${url ? '' : 'pointer-events-none opacity-40'}`}><Icon size={18} /></a></li>
          ))}
        </ul>
        <p className="flex gap-4 text-sm text-white/60"><a href="#" className="hover:text-white">Privacy Policy</a><a href="#" className="hover:text-white">Terms &amp; Conditions</a></p>
        <p className="text-xs text-white/40">© 2027 {event.organizer}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
