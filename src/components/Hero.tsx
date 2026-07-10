import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail } from "lucide-react";
import Hero3D from "./Hero3D";
import Magnetic from "./Magnetic";
import RotatingBadge from "./RotatingBadge";

gsap.registerPlugin(ScrollTrigger);

// Splits a word into masked chars the intro timeline can roll up
const SplitWord = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => (
  <span
    className={`split-line inline-flex overflow-hidden ${className}`}
    aria-hidden="true"
  >
    {text.split("").map((char, i) => (
      <span key={i} className="hero-char inline-block will-change-transform">
        {char}
      </span>
    ))}
  </span>
);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Intro: chars roll up while the loader tiles are still flying away
      const intro = gsap.timeline({ delay: 0.6 });
      intro
        .from(".hero-char", {
          yPercent: 130,
          rotate: 10,
          stagger: 0.035,
          duration: 1.1,
          ease: "power4.out",
        })
        .from(
          ".hero-fade",
          {
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .from(
          badgeRef.current,
          { scale: 0, rotate: -90, duration: 0.9, ease: "back.out(1.6)" },
          "-=0.5",
        );

      // Parallax exit: layers leave at different speeds while scrolling away
      const scrub = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      scrub
        .to(titleRef.current, { yPercent: 28, opacity: 0.15, ease: "none" }, 0)
        .to(canvasRef.current, { y: -140, ease: "none" }, 0)
        .to(badgeRef.current, { y: -220, rotate: 60, ease: "none" }, 0);
    }, section);

    // Cursor tilt: the whole title block leans in 3D toward the mouse
    const rotX = gsap.quickTo(titleRef.current, "rotationX", {
      duration: 0.6,
      ease: "power3",
    });
    const rotY = gsap.quickTo(titleRef.current, "rotationY", {
      duration: 0.6,
      ease: "power3",
    });
    const handleMouseMove = (e: MouseEvent) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      rotX(-py * 7);
      rotY(px * 7);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden grid-bg pt-24 pb-10 px-6 lg:px-12"
    >
      {/* 3D wireframe backdrop */}
      <div ref={canvasRef} className="absolute inset-0 will-change-transform">
        <Hero3D />
      </div>

      {/* Meta row */}
      <div className="relative z-10 flex justify-between items-start font-mono text-xs uppercase tracking-[0.25em] text-muted">
        <span className="hero-fade">// Portfolio — 2026</span>
        <span className="hero-fade hidden sm:block">Based in India</span>
      </div>

      {/* Title block */}
      <div
        ref={titleRef}
        className="relative z-10 will-change-transform"
        style={{ transformStyle: "preserve-3d", perspective: "900px" }}
      >
        <p
          className="hero-fade font-mono text-sm md:text-base text-accent tracking-[0.3em] uppercase mb-4"
          aria-hidden="true"
        >
          ( Hi, I am )
        </p>

        <h1
          className="font-display font-extrabold uppercase leading-[0.9] tracking-tight"
          aria-label="Anoop Singh — Frontend Developer"
        >
          <span className="block text-[17vw] lg:text-[13vw]">
            <SplitWord text="ANOOP" />
          </span>
          <span className="block text-[17vw] lg:text-[13vw] outline-text">
            <SplitWord text="SINGH" />
          </span>
        </h1>

        <div className="mt-8 flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
          <p className="hero-fade text-2xl md:text-3xl font-display font-semibold">
            Frontend <span className="text-accent">Developer</span>
            <span className="text-accent animate-blink">_</span>
          </p>
          <p className="hero-fade max-w-sm text-sm md:text-base text-muted leading-relaxed">
            I build fast, animated, pixel-obsessed interfaces with React,
            TypeScript and a healthy respect for whitespace.
          </p>
        </div>
      </div>

      {/* Bottom row: socials + spinning badge */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="hero-fade flex gap-3">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "#contact", label: "Email" },
          ].map((social) => (
            <Magnetic key={social.label} strength={0.5}>
              <a
                href={social.href}
                aria-label={social.label}
                className="inline-flex w-12 h-12 items-center justify-center rounded-full border border-line hover:border-accent hover:text-accent transition-colors duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            </Magnetic>
          ))}
        </div>

        <div ref={badgeRef} className="will-change-transform">
          <Magnetic strength={0.3}>
            <a href="#about" aria-label="Scroll to about">
              <RotatingBadge />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default Hero;
