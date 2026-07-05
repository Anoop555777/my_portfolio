import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface HeadingSegment {
  text: string;
  accent?: boolean;
  outline?: boolean;
}

interface SectionHeadingProps {
  segments: HeadingSegment[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

// Heading whose characters roll up from behind a mask when scrolled into view
const SectionHeading = ({ segments, className = '', as = 'h2' }: SectionHeadingProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll('.sh-char');
    const tween = gsap.fromTo(
      chars,
      { yPercent: 120, rotate: 8, opacity: 0 },
      {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={segments.map((s) => s.text).join('')}
    >
      {segments.map((segment, si) => {
        const words = segment.text.split(' ');
        return words.map((word, wi) => (
          <span key={`${si}-${wi}`} aria-hidden="true">
            <span className="split-line inline-flex overflow-hidden">
              {word.split('').map((char, ci) => (
                <span
                  key={ci}
                  className={`sh-char inline-block will-change-transform ${
                    segment.accent ? 'text-accent' : ''
                  } ${segment.outline ? 'outline-text' : ''}`}
                >
                  {char}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        ));
      })}
    </Tag>
  );
};

export default SectionHeading;
