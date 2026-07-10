import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Frontend",
    blurb: "Interfaces that feel as good as they look.",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind", level: 92 },
    ],
  },
  {
    category: "Backend",
    blurb: "APIs and data layers built to hold up.",
    skills: [
      { name: "Node.js", level: 87 },
      { name: "Express", level: 90 },
      { name: "Python", level: 85 },
      { name: "MongoDB", level: 88 },
      { name: "MySQL", level: 82 },
    ],
  },
  {
    category: "Tools",
    blurb: "The kit that keeps everything moving.",
    skills: [
      { name: "Git", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Vite", level: 88 },
      { name: "Figma", level: 75 },
    ],
  },
];

const PANEL_COUNT = skillGroups.length + 2; // intro + groups + outro

// Shared skill row markup; `rowClass` tags it for the desktop (hs-row)
// or vertical (vs-row) scroll triggers. The line's default transform
// already reflects the level so reduced-motion users see correct values.
const SkillRow = ({
  name,
  level,
  rowClass,
}: {
  name: string;
  level: number;
  rowClass: string;
}) => (
  <div className={`${rowClass} group py-3`} data-level={level}>
    <div className="flex items-baseline justify-between gap-6">
      <h4 className="skill-name outline-text font-display font-extrabold uppercase text-5xl md:text-6xl xl:text-7xl leading-none group-hover:text-accent transition-colors duration-500">
        {name}
      </h4>
      <span className="font-mono text-sm md:text-base text-muted shrink-0">
        {level}%
      </span>
    </div>
    <div className="mt-3 h-px w-full bg-paper/10">
      <div
        className="skill-line h-full w-full bg-accent origin-left will-change-transform"
        style={{ transform: `scaleX(${level / 100})` }}
      />
    </div>
  </div>
);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // Desktop: pin the section and scrub the track horizontally
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = trackRef.current;
        if (!track) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        const horizontal = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
              if (counterRef.current) {
                const panel = Math.min(
                  PANEL_COUNT,
                  Math.floor(self.progress * PANEL_COUNT) + 1,
                );
                counterRef.current.textContent = String(panel).padStart(2, "0");
              }
            },
          },
        });

        // Skill lines scrub to their level as each row rides through the viewport
        gsap.utils.toArray<HTMLElement>(".hs-row", track).forEach((row) => {
          const level = Number(row.dataset.level) / 100;

          gsap.fromTo(
            row.querySelector(".skill-line"),
            { scaleX: 0 },
            {
              scaleX: level,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                containerAnimation: horizontal,
                start: "left 85%",
                end: "left 35%",
                scrub: 0.5,
              },
            },
          );

          gsap.fromTo(
            row.querySelector(".skill-name"),
            { color: "rgba(237, 237, 230, 0)" },
            {
              color: "#EDEDE6",
              ease: "none",
              scrollTrigger: {
                trigger: row,
                containerAnimation: horizontal,
                start: "left 80%",
                end: "left 40%",
                scrub: 0.5,
              },
            },
          );
        });

        // Giant background indices drift slower than the track for parallax depth
        gsap.utils.toArray<HTMLElement>(".hs-index", track).forEach((num) => {
          gsap.fromTo(
            num,
            { xPercent: 30 },
            {
              xPercent: -15,
              ease: "none",
              scrollTrigger: {
                trigger: num,
                containerAnimation: horizontal,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      },
    );

    // Mobile: classic vertical scrub on each row
    mm.add(
      "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils.toArray<HTMLElement>(".vs-row", section).forEach((row) => {
          const level = Number(row.dataset.level) / 100;

          gsap.fromTo(
            row.querySelector(".skill-line"),
            { scaleX: 0 },
            {
              scaleX: level,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                end: "top 45%",
                scrub: 0.5,
              },
            },
          );

          gsap.fromTo(
            row.querySelector(".skill-name"),
            { color: "rgba(237, 237, 230, 0)" },
            {
              color: "#EDEDE6",
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                end: "top 45%",
                scrub: 0.5,
              },
            },
          );
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative border-t border-line"
    >
      {/* ---- Desktop: pinned horizontal pipeline ---- */}
      <div className="relative hidden overflow-hidden lg:motion-safe:block">
        <div
          ref={trackRef}
          className="flex h-screen w-max will-change-transform"
        >
          {/* Intro panel */}
          <div className="relative flex h-full w-screen shrink-0 flex-col justify-center overflow-hidden px-12 xl:px-24">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8">
              <span className="text-accent">02</span> — Stack
            </p>
            <SectionHeading
              segments={[
                { text: "What I " },
                { text: "work with", accent: true },
              ]}
              className="text-5xl md:text-7xl xl:text-8xl font-display font-bold uppercase leading-[1.02] max-w-4xl"
            />
            <p className="mt-8 max-w-md text-muted leading-relaxed">
              A pipeline of the tools I reach for every day — from the interface
              down to the infrastructure.
            </p>
            <div className="mt-16 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Scroll
              <span className="inline-block h-px w-16 bg-accent" />
              <span className="text-accent">→</span>
            </div>
          </div>

          {/* Category panels */}
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              className="relative flex h-full w-screen shrink-0 flex-col justify-center overflow-hidden border-l border-line px-12 xl:px-24"
            >
              <span
                aria-hidden="true"
                className="hs-index outline-text pointer-events-none absolute -right-8 top-16 select-none font-display text-[20rem] font-extrabold leading-none opacity-30"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 max-w-3xl">
                <p className="mb-2 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  <span className="inline-block h-px w-8 bg-accent" />
                  {group.category}
                  <span className="text-paper/30">
                    {String(group.skills.length).padStart(2, "0")} skills
                  </span>
                </p>
                <p className="mb-10 text-sm text-muted">{group.blurb}</p>

                {group.skills.map((skill) => (
                  <SkillRow key={skill.name} {...skill} rowClass="hs-row" />
                ))}
              </div>
            </div>
          ))}

          {/* Outro panel */}
          <div className="relative flex h-full w-screen shrink-0 flex-col items-center justify-center overflow-hidden border-l border-line px-12">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              — And counting
            </p>
            <h3 className="text-center font-display text-7xl font-extrabold uppercase leading-[0.95] xl:text-9xl">
              Always{" "}
              <span className="text-accent">
                shipping<span className="animate-blink">.</span>
              </span>
            </h3>
            <a
              href="#projects"
              className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-muted transition-colors duration-300 hover:text-accent"
            >
              See it in the projects <span className="text-accent">↓</span>
            </a>
          </div>
        </div>

        {/* Progress rail, pinned with the section */}
        <div className="absolute bottom-8 left-12 right-12 z-10 flex items-center gap-6 xl:left-24 xl:right-24">
          <span className="shrink-0 font-mono text-xs text-muted">
            <span ref={counterRef} className="text-accent">
              01
            </span>{" "}
            / {String(PANEL_COUNT).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-paper/10">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 bg-accent will-change-transform"
            />
          </div>
        </div>
      </div>

      {/* ---- Mobile & reduced-motion: vertical fallback ---- */}
      <div className="block px-6 py-28 lg:motion-safe:hidden lg:px-12">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">02</span> — Stack
        </p>
        <SectionHeading
          segments={[{ text: "What I " }, { text: "work with", accent: true }]}
          className="text-4xl md:text-6xl font-display font-bold uppercase leading-[1.02] mb-16 max-w-4xl"
        />

        {skillGroups.map((group) => (
          <div key={group.category} className="mb-20 last:mb-0">
            <p className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              <span className="inline-block h-px w-8 bg-accent" />
              {group.category}
            </p>
            {group.skills.map((skill) => (
              <SkillRow key={skill.name} {...skill} rowClass="vs-row" />
            ))}
          </div>
        ))}

        <p className="mt-20 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Always shipping <span className="text-accent">—</span>
        </p>
      </div>
    </section>
  );
};

export default Skills;
