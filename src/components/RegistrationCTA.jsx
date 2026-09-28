import { Reveal, RegisterButton } from './Section';
import { event } from '../data/event';

export default function RegistrationCTA() {
  return (
    <section id="register" className="scroll-mt-16 py-20 sm:py-28">
      <Reveal className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-teal/20 to-brand-purple/20 px-6 py-16 text-center">
          <h2 className="text-3xl font-extrabold sm:text-5xl">READY TO BUILD THE FUTURE?</h2>
          <p className="mt-3 text-white/70">Join {event.name}.</p>
          <div className="mt-8">
            {event.registrationUrl ? <RegisterButton label="REGISTER NOW" /> : <p className="grad-text text-xl font-bold tracking-widest">REGISTRATION OPENS SOON</p>}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
