import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import EventStats from '../components/EventStats';
import About from '../components/About';
import HowItWorks from '../components/HowItWorks';
import Tracks from '../components/Tracks';
import Timeline from '../components/Timeline';
import ProblemStatements from '../components/ProblemStatements';
import Prizes from '../components/Prizes';
import Mentors from '../components/Mentors';
import Judges from '../components/Judges';
import Sponsors from '../components/Sponsors';
import Gallery from '../components/Gallery';
import FAQ from '../components/FAQ';
import Venue from '../components/Venue';
import RegistrationCTA from '../components/RegistrationCTA';

export default function Home() {
  const { hash, key } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80);
    return () => clearTimeout(t);
  }, [hash, key]);
  return (<><Hero /><EventStats /><About /><HowItWorks /><Tracks /><Timeline /><ProblemStatements /><Prizes /><Mentors /><Judges /><Sponsors /><Gallery /><FAQ /><Venue /><RegistrationCTA /></>);
}
