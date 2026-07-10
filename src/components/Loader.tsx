import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Timeline: namaste (0-0.9s) → counter (0.9-2.3s) → tiles reveal page (2.5-3.8s)
export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterSectionRef = useRef<HTMLDivElement>(null);
  const breakingSquaresRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Phase 1: greeting
      gsap.from(textRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
      });

      // Phase 2: counter section slides in as a full page
      if (counterSectionRef.current) {
        gsap.from(counterSectionRef.current, {
          x: '-100vw',
          duration: 0.7,
          delay: 0.9,
          ease: 'power3.out',
        });
      }

      const counterObj = { value: 0 };
      gsap.to(counterObj, {
        value: 100,
        duration: 1.4,
        delay: 0.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCounter(Math.floor(counterObj.value));
        },
      });

      if (progressRef.current) {
        gsap.from(progressRef.current, {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.4,
          delay: 0.9,
          ease: 'power2.inOut',
        });
      }

      // Phase 3: counter zooms out, solid layers disappear so the
      // tile grid is the only thing covering the real page
      const timeline = gsap.timeline({ delay: 2.3 });
      timeline
        .to(counterRef.current, {
          scale: 1.5,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
        .set(breakingSquaresRef.current, { opacity: 1 })
        .set(loaderRef.current, { backgroundColor: 'transparent' })
        .set([counterSectionRef.current, textRef.current], { display: 'none' });

      // Phase 4: tiles fly away bottom-to-top, revealing the page underneath
      if (breakingSquaresRef.current) {
        const container = breakingSquaresRef.current;
        const cols = 15;
        const rows = 10;
        const squareWidth = 100 / cols;
        const squareHeight = 100 / rows;

        container.innerHTML = '';

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const square = document.createElement('div');
            square.className = 'breaking-square';
            square.style.cssText = `
              position: absolute;
              width: ${squareWidth}%;
              height: ${squareHeight}%;
              left: ${col * squareWidth}%;
              top: ${row * squareHeight}%;
              background: #121216;
              border: 1px solid rgba(237, 237, 230, 0.04);
            `;

            container.appendChild(square);

            const distanceFromBottom = rows - row - 1;
            const baseDelay = 2.65 + distanceFromBottom * 0.05;
            const delay = baseDelay + gsap.utils.random(-0.02, 0.02);

            gsap.to(square, {
              y: -(window.innerHeight + 200),
              rotation: gsap.utils.random(-120, 120),
              opacity: 0,
              duration: 1.1,
              delay,
              ease: 'power2.in',
            });

            gsap.to(square, {
              x: gsap.utils.random(-120, 120),
              duration: 1,
              delay,
              ease: 'power1.out',
            });
          }
        }
      }

      // Phase 5: remove the loader once every tile is gone
      gsap.set(loaderRef.current, {
        display: 'none',
        delay: 4.1,
      });
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-screen bg-ink z-[700] flex items-center justify-center pointer-events-none"
    >
      {/* Namaste text */}
      <div ref={textRef} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-accent font-display text-[9vw] md:text-[4.5vw] leading-[1.3]">
            नमस्ते
          </h2>
          <h3 className="text-paper font-mono uppercase tracking-[0.4em] text-[3.5vw] md:text-[1.1vw] leading-[1] mt-2">
            namaste
          </h3>
        </div>
      </div>

      {/* Counter section - Full page slide from left */}
      <div
        ref={counterSectionRef}
        className="absolute inset-0 w-full h-full bg-ink flex items-center justify-center"
      >
        <div className="text-center px-6">
          <h2
            ref={counterRef}
            className="text-accent font-display font-extrabold text-[16vw] md:text-[8vw] leading-none"
          >
            {counter}%
          </h2>
          <h3 className="text-paper font-mono uppercase tracking-[0.3em] text-[3vw] md:text-[0.9vw] leading-relaxed mt-6">
            Designed. Coded. Loved.
            <span className="block mt-1">By Anoop Singh.</span>
          </h3>
          <div className="h-[2px] bg-paper/15 mt-6 mx-auto overflow-hidden max-w-[300px]">
            <div
              ref={progressRef}
              className="h-full bg-accent"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Breaking tiles layer - covers the page, then flies away to reveal it */}
      <div
        ref={breakingSquaresRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0"
      ></div>
    </div>
  );
}
