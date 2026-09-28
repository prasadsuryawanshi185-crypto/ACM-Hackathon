// Edit this file to update the site. Empty values render as "coming soon" states.
export const event = {
  name: 'WCE ACM Hackathon 2027',
  organizer: 'WCE ACM Student Chapter',
  institution: 'Walchand College of Engineering',
  venue: 'Walchand College of Engineering, Sangli',
  tagline: 'Build. Innovate. Impact.',
  description: 'A platform where students collaborate, build innovative solutions and solve real-world problems using technology.',
  date: '', // ISO string e.g. "2027-03-15T09:00:00+05:30". Empty => "date to be announced"
  registrationUrl: '', // empty => "Registration opens soon"
  contactEmail: '',
  socialLinks: { instagram: '', linkedin: '', github: '' },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Walchand+College+of+Engineering+Sangli',
  venueAddress: 'Vishrambag, Sangli, Maharashtra, India', // [PLACEHOLDER] verify address
  venueDescription: 'The hackathon is planned for the WCE campus. [PLACEHOLDER] Halls, labs and stay details will be shared before the event.',
  about: [
    'WCE ACM Hackathon is a student-run innovation event organised by the WCE ACM Student Chapter at Walchand College of Engineering, Sangli.',
    'Teams pick a real-world problem, design and build a working solution, and present it to a panel. It is a chance to learn fast, ship something real and meet people who love building.',
  ],
  // Stats: numeric values animate. [PLACEHOLDER] figures - replace with official numbers.
  stats: [
    { value: 200, suffix: '+', label: 'Participants' },
    { value: 50, suffix: '+', label: 'Teams' },
    { value: 24, suffix: '+', label: 'Hours' },
    { value: '₹XX,XXX+', label: 'Prize Pool' },
  ],
  mentors: [], // { name, org, designation, expertise, image }
  judges: [],
  gallery: Array.from({ length: 6 }, (_, i) => ({ src: '', alt: `Placeholder gallery image ${i + 1}` })), // set src to real photos
};
