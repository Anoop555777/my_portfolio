import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

// Perspective wrapper: children tilt in 3D toward the cursor
const TiltCard = ({ children, className = '', maxTilt = 8 }: TiltCardProps) => {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * maxTilt * 2,
      rotateX: -py * maxTilt * 2,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 900,
    });
  };

  const handleMouseLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return (
    <div
      className={className}
      style={{ perspective: '900px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
