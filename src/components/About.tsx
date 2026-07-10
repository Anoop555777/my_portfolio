import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TextReveal from './TextReveal';
import ParallaxLayer from './ParallaxLayer';
import ParallaxImage from './ParallaxImage';
import VelocitySkew from './VelocitySkew';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 10, suffix: '+', label: 'Projects Built' },
  { value: 15, suffix: '+', label: 'Technologies' },
  { value: 100, suffix: '%', label: 'Passion' },
];

const services = [
  { index: '01', title: 'Clean Code', blurb: 'Maintainable, scalable, performant' },
  { index: '02', title: 'Creative Design', blurb: 'Interfaces people love to touch' },
  { index: '03', title: 'Performance', blurb: 'Fast loads, 60fps animations' },
  { index: '04', title: 'Innovation', blurb: 'Modern tools, modern thinking' },
];

const StatCounter = ({ value, suffix, label }: (typeof stats)[number]) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${Math.floor(obj.value)}${suffix}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [inView, value, suffix]);

  return (
    <div>
      <span ref={ref} className="block text-5xl md:text-6xl font-display font-bold text-accent">
        0{suffix}
      </span>
      <span className="mt-2 block font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const squiggleRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // SVG squiggle draws itself in
      const path = squiggleRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: path, start: 'top 85%', once: true },
          }
        );
      }

      // Service rows slide up one after another
      gsap.from('.service-row', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.service-row', start: 'top 85%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 px-6 lg:px-12 border-t border-line overflow-hidden"
    >
      {/* Ghost word drifting on its own parallax layer behind the content */}
      <ParallaxLayer
        speed={0.7}
        className="absolute -right-8 top-1/4 pointer-events-none select-none hidden lg:block"
      >
        <span
          className="outline-text font-display font-extrabold uppercase text-[16vw] leading-none opacity-20"
          aria-hidden="true"
        >
          About
        </span>
      </ParallaxLayer>

      {/* Floating accent shapes on their own depth layers */}
      <ParallaxLayer
        speed={-0.4}
        className="absolute left-[6%] top-[30%] pointer-events-none hidden md:block"
      >
        <div
          className="w-20 h-20 rounded-full border border-accent/25"
          aria-hidden="true"
        />
      </ParallaxLayer>
      <ParallaxLayer
        speed={-0.65}
        className="absolute right-[12%] bottom-[18%] pointer-events-none hidden md:block"
      >
        <span
          className="block font-display text-4xl text-accent/40 select-none"
          aria-hidden="true"
        >
          +
        </span>
      </ParallaxLayer>

      <div className="relative max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sticky section label */}
        <div className="lg:col-span-3">
          <p className="sticky top-28 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            <span className="text-accent">01</span> — About
          </p>
        </div>

        <div className="lg:col-span-9">
          <SectionHeading
            segments={[
              { text: 'Developer with a ' },
              { text: 'designer’s eye', accent: true },
            ]}
            className="text-4xl md:text-6xl xl:text-7xl font-display font-bold uppercase leading-[1.02] mb-6 max-w-4xl"
          />

          {/* Self-drawing squiggle */}
          <svg
            viewBox="0 0 320 24"
            className="w-56 md:w-72 mb-12"
            fill="none"
            aria-hidden="true"
          >
            <path
              ref={squiggleRef}
              d="M4 14 C 30 4, 50 22, 78 12 S 130 4, 158 13 S 214 22, 242 10 S 296 6, 316 14"
              stroke="#D9FF3D"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-24">
            <div className="md:col-span-7">
              <TextReveal
                text="I am a front-end developer with a strong understanding of HTML, CSS and JavaScript, with hands-on experience in React and Redux. I am passionate about the web, I love building things people actually use — and I am open to new opportunities."
                className="text-xl md:text-3xl leading-relaxed font-light mb-16"
              />

              {/* Stats float slightly against the scroll for depth */}
              <ParallaxLayer speed={-0.15}>
                <div className="grid grid-cols-3 gap-8">
                  {stats.map((stat) => (
                    <StatCounter key={stat.label} {...stat} />
                  ))}
                </div>
              </ParallaxLayer>
            </div>

            {/* Portrait: wipe reveal on enter, drifts inside its frame on scroll */}
            <div className="md:col-span-5 group">
              <ParallaxImage
                src="/aj.jpg"
                alt="Portrait of Anoop Singh"
                className="aspect-[3/4] w-full max-w-sm mx-auto md:ml-auto md:mr-0 border border-line"
              />
              <p className="mt-4 max-w-sm mx-auto md:ml-auto md:mr-0 flex justify-between font-mono text-xs uppercase tracking-[0.25em] text-muted">
                <span>Anoop Singh</span>
                <span className="text-accent">© 2026</span>
              </p>
            </div>
          </div>

          {/* Service rows shear with scroll velocity */}
          <VelocitySkew>
            {services.map((service) => (
              <div
                key={service.index}
                className="service-row group relative border-t border-line last:border-b overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <div className="relative flex items-center justify-between gap-6 py-7 md:py-9 px-2 md:px-4 group-hover:text-ink transition-colors duration-500">
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <span className="font-mono text-xs md:text-sm text-muted group-hover:text-ink/60 transition-colors duration-500">
                      {service.index}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-display font-bold uppercase">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="hidden md:block text-sm text-muted group-hover:text-ink/70 transition-colors duration-500">
                      {service.blurb}
                    </span>
                    <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 shrink-0 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </VelocitySkew>
        </div>
      </div>
    </section>
  );
};

export default About;
