import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

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
      // Animate greeting text
      gsap.from(textRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
      });

      // Slide in counter section as full page from left after namaste
      if (counterSectionRef.current) {
        gsap.from(counterSectionRef.current, {
          x: '-100vw',
          duration: 1,
          delay: 1.2, // After namaste animation completes
          ease: 'power3.out',
        });
      }

      // Animate counter with GSAP for smoother animation
      const counterObj = { value: 0 };
      gsap.to(counterObj, {
        value: 100,
        duration: 2.5,
        delay: 1.2, // Start with slide-in
        ease: 'power2.inOut',
        onUpdate: () => {
          setCounter(Math.floor(counterObj.value));
        },
      });

      // Animate progress bar
      if (progressRef.current) {
        gsap.from(progressRef.current, {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 2.5,
          delay: 1.2,
          ease: 'power2.inOut',
        });
      }

      // Phase 3: Hide counter section and prepare for breaking animation
      const timeline = gsap.timeline({ delay: 3.7 });
      timeline
        .to(counterRef.current, {
          scale: 1.5,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        })
        .to(counterSectionRef.current, {
          opacity: 0,
          duration: 0.4,
        }, '-=0.2')
        .to(textRef.current, {
          opacity: 0,
          duration: 0.3,
        }, '-=0.3');

      // Phase 4: Create breaking squares animation - happens AFTER counter section
      if (breakingSquaresRef.current) {
        const container = breakingSquaresRef.current;
        const cols = 15; // Number of columns
        const rows = 10; // Number of rows
        const squareWidth = 100 / cols;
        const squareHeight = 100 / rows;
        
        // Show the breaking squares container at the right time
        gsap.to(container, {
          opacity: 1,
          duration: 0.1,
          delay: 4.4, // Show just before animation starts
        });
        
        // Clear any existing squares
        container.innerHTML = '';
        
        // Create grid of squares
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
              background: #1a1a2e;
              border: 1px solid #1a1a2e;
              box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.03);
            `;
            
            container.appendChild(square);
            
            // Calculate delay based on position (bottom to top)
            const distanceFromBottom = rows - row - 1;
            const baseDelay = 4.5 + (distanceFromBottom * 0.06); // Start at 4.5s
            const randomOffset = gsap.utils.random(-0.02, 0.02);
            const delay = baseDelay + randomOffset;
            
            // Animate each square flying up
            gsap.to(square, {
              y: -(window.innerHeight + 200),
              rotation: gsap.utils.random(-120, 120),
              opacity: 0,
              duration: 1.3,
              delay: delay,
              ease: 'power2.in',
            });
            
            // Add horizontal drift
            gsap.to(square, {
              x: gsap.utils.random(-120, 120),
              duration: 1.1,
              delay: delay,
              ease: 'power1.out',
            });
          }
        }
      }

      // Phase 5: Hide entire loader after breaking animation completes
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        delay: 5.8, // After all squares have started flying
        ease: 'power2.inOut',
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
        },
      });
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-screen bg-primary z-[700] flex items-center justify-center pointer-events-none"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* Namaste text */}
      <div ref={textRef} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-[7.5vw] md:text-[3vw] leading-[1.3]">
            नमस्ते
          </h2>
          <h3 className="text-white text-[5vw] md:text-[2vw] leading-[1]">
            namaste
          </h3>
        </div>
      </div>

      {/* Counter section - Full page slide from left */}
      <div 
        ref={counterSectionRef} 
        className="absolute inset-0 w-full h-full bg-primary flex items-center justify-center"
      >
        <div className="text-center">
          <h2 
            ref={counterRef}
            className="text-white text-[5.5vw] md:text-[2vw] leading-[1.2] font-bold"
          >
            {counter}%
          </h2>
          <h3 className="text-white text-[6vw] md:text-[2.5vw] leading-[1.1] mt-4">
            Designed. Coded. Loved.
            <span className="block">By Anoop Singh.</span>
          </h3>
          <div className="h-[0.8vw] md:h-[0.2vw] bg-white/30 mt-4 mx-auto overflow-hidden max-w-[300px]">
            <div 
              ref={progressRef}
              className="h-full bg-white"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Breaking Squares Layer - appears after counter section */}
      <div 
        ref={breakingSquaresRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0"
      ></div>
    </div>
  );
}

