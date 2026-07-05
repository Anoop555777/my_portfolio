import { ArrowDown } from 'lucide-react';

interface RotatingBadgeProps {
  text?: string;
  className?: string;
}

// Circular SVG text that spins forever, with an arrow at its core
const RotatingBadge = ({
  text = 'FRONTEND DEVELOPER ✦ OPEN TO WORK ✦ ',
  className = '',
}: RotatingBadgeProps) => {
  return (
    <div className={`relative w-32 h-32 md:w-40 md:h-40 ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full animate-spin-slower"
        aria-hidden="true"
      >
        <defs>
          <path
            id="badge-circle"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <text className="fill-paper font-mono text-[15.5px] uppercase tracking-[3.5px]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-line flex items-center justify-center">
          <ArrowDown className="w-5 h-5 text-accent" />
        </div>
      </div>
    </div>
  );
};

export default RotatingBadge;
