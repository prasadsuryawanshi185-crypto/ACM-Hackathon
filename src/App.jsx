import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const Problems = lazy(() => import('./pages/Problems'));
const ProblemDetails = lazy(() => import('./pages/ProblemDetails'));

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollTop />
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemDetails />} />
            <Route path="*" element={<div className="container-x min-h-screen pt-32"><h1 className="text-3xl font-bold">Page not found</h1></div>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  );
}
