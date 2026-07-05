import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
}

// Infinite marquee strip whose speed and direction react to scroll velocity
const Marquee = ({
  items,
  speed = 60,
  className = '',
  itemClassName = '',
  separator = '✦',
}: MarqueeProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });

      // Scroll velocity nudges the marquee faster / reverses direction
      ScrollTrigger.create({
        trigger: track,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = gsap.utils.clamp(-4, 4, velocity / 400);
          gsap.to(tween, {
            timeScale: boost === 0 ? 1 : boost,
            duration: 0.4,
            overwrite: true,
            onComplete: () => {
              gsap.to(tween, { timeScale: velocity < 0 ? -1 : 1, duration: 1.2 });
            },
          });
        },
      });
    }, track);

    return () => ctx.revert();
  }, [speed]);

  // Duplicate the sequence so xPercent: -50 loops seamlessly
  const sequence = [...items, ...items];

  return (
    <div className={`relative overflow-hidden py-6 select-none ${className}`}>
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        {sequence.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-6 pr-6 text-4xl md:text-6xl font-display font-bold uppercase tracking-tight ${itemClassName}`}
          >
            {item}
            <span className="text-accent text-2xl md:text-4xl">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
