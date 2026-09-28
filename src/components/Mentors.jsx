import ProfileCards from './ProfileCards';
import { event } from '../data/event';
export default function Mentors() {
  return <ProfileCards id="mentors" eyebrow="Guidance" title="Mentors" people={event.mentors} emptyText="Mentors will be announced soon." />;
}
