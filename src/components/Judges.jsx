import ProfileCards from './ProfileCards';
import { event } from '../data/event';
export default function Judges() {
  return <ProfileCards id="judges" eyebrow="Jury" title="Judges" people={event.judges} emptyText="Judges will be announced soon." />;
}
