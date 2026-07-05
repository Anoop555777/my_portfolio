import { useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import Magnetic from './Magnetic';

const links = [
  { label: 'About', href: '#about', index: '01' },
  { label: 'Stack', href: '#skills', index: '02' },
  { label: 'Work', href: '#projects', index: '03' },
  { label: 'Contact', href: '#contact', index: '04' },
];

const Navbar = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);

  // Hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 200);
  });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[560] bg-accent"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: '-150%', opacity: 0 }}
        animate={{ y: hidden ? '-150%' : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 inset-x-0 z-[550] bg-ink/70 backdrop-blur-md border-b border-line"
      >
        <nav className="flex items-center justify-between px-6 lg:px-12 h-16">
          <Magnetic strength={0.25}>
            <a
              href="#home"
              className="font-display font-extrabold text-lg tracking-tight uppercase"
            >
              Anoop<span className="text-accent">©</span>
            </a>
          </Magnetic>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-paper/70 hover:text-paper transition-colors duration-300"
                >
                  <span className="text-accent mr-1.5">{link.index}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="inline-block px-5 py-2 bg-accent text-ink rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-paper transition-colors duration-300"
            >
              Hire Me
            </a>
          </Magnetic>
        </nav>
      </motion.header>
    </>
  );
};

export default Navbar;
