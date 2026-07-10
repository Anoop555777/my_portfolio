import { useEffect, lazy, Suspense, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Loader from './components/Loader';
import Hero from './components/Hero';

// Lazy load components for better performance
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const SmoothScroll = lazy(() => import('./components/SmoothScroll'));
const Navbar = lazy(() => import('./components/Navbar'));
const Marquee = lazy(() => import('./components/Marquee'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const techStack = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Tailwind',
  'MongoDB',
  'GSAP',
];

function App() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    // Mount the page just before the loader tiles fly away and reveal it
    const timer = setTimeout(() => {
      setLoaderComplete(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaderComplete) return;
    // Recalculate trigger positions once lazy sections have mounted
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => clearTimeout(refresh);
  }, [loaderComplete]);

  return (
    <div className="relative">
      <Loader />

      {loaderComplete && (
        <>
          <div className="noise-overlay" />
          <Suspense fallback={null}>
            <CustomCursor />
            <SmoothScroll />
            <Navbar />
          </Suspense>
          <main className="overflow-hidden">
            <Hero />
            <Suspense fallback={null}>
              <Marquee
                items={techStack}
                className="border-y border-line bg-ink-2"
                itemClassName="outline-text hover:text-paper transition-colors duration-500"
              />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen bg-ink" />}>
              <About />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen bg-ink" />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen bg-ink" />}>
              <Projects />
            </Suspense>
            <Suspense fallback={null}>
              <Marquee
                items={["Let's Work Together", 'Open To Opportunities']}
                className="border-y border-line"
                itemClassName="text-accent"
                separator="✳"
              />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen bg-ink" />}>
              <Contact />
            </Suspense>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
