import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Rocket, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        {
          y: 100,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
          },
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power4.out',
        }
      );
    }
  }, []);

  const features = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and performant code with modern best practices',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Crafting beautiful, intuitive interfaces that users love to interact with',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Optimizing every aspect for lightning-fast load times and smooth animations',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge technologies and creative solutions',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-20 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          I am a <span className="gradient-text neon-glow font-bold">front-end developer</span> with a strong understanding of HTML, CSS, and Javascript. I have experience in React and Redux as well.
          </p> <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
I am passionate about the web and I love to create things that people can use on the internet.
</p>
<p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"> open for new opportunities.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 group shadow-xl"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default About;

