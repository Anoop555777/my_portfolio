import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VelocitySkewProps {
  children: ReactNode;
  /** Max shear in degrees at full scroll speed */
  max?: number;
  className?: string;
}

// Shears its content proportionally to scroll velocity, easing back to
// zero as scrolling settles — gives fast scrolls a liquid feel
const VelocitySkew = ({ children, max = 2.5, className = '' }: VelocitySkewProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const proxy = { skew: 0 };
    const setter = gsap.quickSetter(el, 'skewY', 'deg');
    const clamp = gsap.utils.clamp(-max, max);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -350);
        // Only chase larger spikes; the tween below decays back to zero
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => setter(proxy.skew),
          });
        }
      },
    });

    return () => trigger.kill();
  }, [max]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transformOrigin: 'center center' }}
    >
      {children}
    </div>
  );
};

export default VelocitySkew;
