import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target && target !== '#') {
          const element = document.querySelector(target);
          if (element) {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: {
                y: element,
                offsetY: 0,
              },
              ease: 'power4.inOut',
            });
          }
        }
      });
    });

    // Parallax effect for sections
    gsap.utils.toArray('section').forEach((section: any) => {
      const bg = section.querySelector('.parallax-bg');
      if (bg) {
        gsap.to(bg, {
          y: () => section.offsetHeight * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });
  }, []);

  return null;
};

export default SmoothScroll;

