import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Hero3D from './Hero3D';

const Hero = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>(['', '', '']);
  const [showCursor, setShowCursor] = useState<boolean[]>([false, false, false]);

  const lines = ['Hi;', "I'm Anoop,", 'web developer'];

  useEffect(() => {

    // Typewriter effect - starts after loader completes (6.8 second delay)
    // Loader timeline: Namaste (1.2s) → Counter (3.7s) → Squares (5.8s) → Fade out (6.4s)
    const startDelay = 6800; // Wait for loader to completely finish
    const typingSpeed = 100; // milliseconds per character
    const lineDelay = 300; // delay between lines

    const typeLines = async () => {
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        
        // Show cursor for current line
        setShowCursor(prev => {
          const newCursors = [...prev];
          newCursors[lineIndex] = true;
          return newCursors;
        });

        // Type each character
        for (let charIndex = 0; charIndex <= line.length; charIndex++) {
          await new Promise(resolve => setTimeout(resolve, typingSpeed));
          setDisplayedLines(prev => {
            const newLines = [...prev];
            newLines[lineIndex] = line.substring(0, charIndex);
            return newLines;
          });
        }

        // Hide cursor after line is complete
        setShowCursor(prev => {
          const newCursors = [...prev];
          newCursors[lineIndex] = false;
          return newCursors;
        });

        // Wait before next line
        if (lineIndex < lines.length - 1) {
          await new Promise(resolve => setTimeout(resolve, lineDelay));
        }
      }
    };

    const timer = setTimeout(() => {
      typeLines();
    }, startDelay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/20" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-70">
        <Hero3D />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Typewriter Text */}
        <div className="min-h-[300px] flex flex-col items-center justify-center">
          {displayedLines.map((line, index) => (
            <div
              key={index}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4"
            >
              {line.split('').map((char, charIndex) => (
                <motion.span
                  key={`${index}-${charIndex}`}
                  className={`inline-block transition-all duration-300 ${
                    index === 1 ? "gradient-text neon-glow" : "text-white"
                  }`}
                  whileHover={{
                    scale: [1, 0.85, 1.1, 1],
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    // Toggle color class
                    if (target.classList.contains('gradient-text')) {
                      target.classList.remove('gradient-text', 'neon-glow');
                      target.classList.add('text-white');
                    } else {
                      target.classList.remove('text-white');
                      target.classList.add('gradient-text', 'neon-glow');
                    }
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              {showCursor[index] && (
                <span className="inline-block w-1 h-16 md:h-20 lg:h-24 bg-primary ml-2 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 8.5, duration: 0.8 }}
          className="flex flex-wrap gap-6 justify-center items-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            View My Work
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 9, duration: 0.8 }}
          className="mt-16 flex gap-6 justify-center"
        >
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#contact', label: 'Email' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 glass rounded-full hover:bg-white/10 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 9.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            const nextSection = document.querySelector('section:nth-of-type(2)');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="cursor-pointer"
        >
          <ArrowDown className="w-8 h-8 text-white/50 hover:text-white/80 transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

