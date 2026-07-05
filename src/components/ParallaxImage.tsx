import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedImage from './OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Image in a masked frame: clip-path wipe reveal on enter,
// then the oversized image drifts vertically as you scroll (parallax)
const ParallaxImage = ({ src, alt, className = '' }: ParallaxImageProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    const ctx = gsap.context(() => {
      // Wipe reveal
      gsap.fromTo(
        frame,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: frame,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Parallax drift of the oversized image inside the frame
      gsap.fromTo(
        inner,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, frame);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <div ref={innerRef} className="absolute inset-[-12%] will-change-transform">
        <OptimizedImage
          src={src}
          alt={alt}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700 ease-out"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ParallaxImage;
