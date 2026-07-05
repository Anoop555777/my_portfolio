import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
}

// Paragraph whose words brighten one by one, scrubbed by scroll position
const TextReveal = ({ text, className = '' }: TextRevealProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitType(el, { types: 'words' });

    const tween = gsap.fromTo(
      split.words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.6,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
};

export default TextReveal;
