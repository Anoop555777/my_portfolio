import { useEffect, lazy, Suspense, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Loader from './components/Loader';
import Hero from './components/Hero';

// Lazy load components for better performance
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const SmoothScroll = lazy(() => import('./components/SmoothScroll'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    // Mark loader as complete after animation
    const timer = setTimeout(() => {
      setLoaderComplete(true);
    }, 3000); // Loader completes at ~6.4s

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <Loader />
      
      {loaderComplete && (
        <>
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <CustomCursor />
            <SmoothScroll />
          </Suspense>
          <main className="overflow-hidden">
            <Hero />
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <About />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Contact />
            </Suspense>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
