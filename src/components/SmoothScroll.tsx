import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger,
// Lenis and every tween share one clock (no fighting rAF loops).
// Uses lerp-based smoothing: framerate-independent and more responsive
// at the start of a gesture than a fixed-duration ease.
const SmoothScroll = () => {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.5,
      overscroll: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anchor links scroll through Lenis so easing stays consistent
    const handleClick = (e: Event) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!link) return;
      const target = link.getAttribute('href');
      if (!target) return;
      e.preventDefault();
      if (target === '#' || target === '#home') {
        lenis.scrollTo(0, { duration: 1.4 });
        return;
      }
      const element = document.querySelector(target);
      if (element) {
        lenis.scrollTo(element as HTMLElement, {
          duration: 1.6,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
