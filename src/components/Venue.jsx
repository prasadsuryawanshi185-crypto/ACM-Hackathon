import { MapPin, ExternalLink } from 'lucide-react';
import Section from './Section';
import { event } from '../data/event';

export default function Venue() {
  return (
    <Section id="venue" eyebrow="Venue" title="Walchand College of Engineering">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div role="img" aria-label="Placeholder campus image" className="grid aspect-video place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-teal/30 to-brand-purple/20 text-sm text-white/40">Campus image placeholder</div>
        <div>
          <p className="flex items-start gap-2 text-white/80"><MapPin className="mt-1 shrink-0 text-brand-teal" size={18} /><span>Sangli, Maharashtra, India<br />{event.venueAddress}</span></p>
          <p className="mt-4 text-white/65">{event.venueDescription}</p>
          <a href={event.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6">Open in Google Maps <ExternalLink size={16} /></a>
        </div>
      </div>
    </Section>
  );
}
