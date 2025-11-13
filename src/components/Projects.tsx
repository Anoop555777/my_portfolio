import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useState, memo, useCallback } from 'react';
import OptimizedImage from './OptimizedImage';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(3); // Start at middle item (3 of 5)
  const [isDragging, setIsDragging] = useState(false);
  const projects = [
    {
      title: 'Dashboard',
      description: 'A modern analytics dashboard built with React, featuring data visualization and intuitive user interface for efficient data management',
      image: '/project1.png',
      tech: ['React'],
      github: '#',
      live: 'https://dashboard-anoop.netlify.app/',
      size: 'large', // large takes full width
    },
    {
      title: 'Cabin Booking - Employee Side',
      description: 'Full-featured cabin booking management system for employees with real-time updates and efficient booking management',
      image: '/project8.png',
      tech: ['React', 'Styled Components', 'React Query'],
      github: '#',
      live: 'https://the-nature-paradise-employee.vercel.app/',
      size: 'medium',
    },
    {
      title: 'Cabin Booking - Client Side',
      description: 'User-friendly cabin booking platform for clients built with Next.js, featuring seamless booking experience and responsive design',
      image: '/project9.png',
      tech: ['Next.js', 'Tailwind CSS'],
      github: '#',
      live: 'https://the-nature-paradise.vercel.app/',
      size: 'medium',
    },
    {
      title: 'AJ Shop E-commerce',
      description: 'Full-stack e-commerce platform with complete shopping cart, payment integration, and admin dashboard for product management',
      image: '/project4.png',
      tech: ['MongoDB', 'Express', 'React', 'Node.js'],
      github: '#',
      live: 'https://ajshop-1.onrender.com/',
      size: 'small',
    },
    {
      title: 'AJCHAT',
      description: 'Real-time chat application built with MERN stack, featuring instant messaging, user authentication, and seamless communication',
      image: '/project7.png',
      tech: ['MongoDB', 'Express', 'React', 'Node.js'],
      github: '#',
      live: 'https://ajchat.vercel.app/',
      size: 'small',
    },
  ];

  const nextProject = useCallback(() => {
    setSelectedProject((prev) => {
      const next = prev + 1;
      // Stop at the last item, don't loop
      return next > projects.length ? prev : next;
    });
  }, [projects.length]);

  const prevProject = useCallback(() => {
    setSelectedProject((prev) => {
      const next = prev - 1;
      // Stop at the first item, don't loop
      return next < 1 ? prev : next;
    });
  }, [projects.length]);

  const moveToProject = useCallback((index: number) => {
    setSelectedProject(index);
  }, []);

  const currentProject = projects[selectedProject - 1] || projects[0];

  return (
    <section id="projects" className="min-h-screen py-20 px-6 lg:px-8 relative overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">


        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Header & Description */}
          <div>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-6xl md:text-8xl font-serif font-light mb-3 tracking-tight">
                Projects
              </h2>
              <p className="text-xl text-gray-400 font-light tracking-wide">
                Featured Excellence
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Projects matter when they showcase innovation and impact. My portfolio - from AI-powered dashboards to full-stack platforms - reflects a commitment to clean code, user experience, and cutting-edge technologies. Each project demonstrates problem-solving abilities, technical expertise, and a drive to create meaningful digital experiences that users love.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Featured Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                  {currentProject.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {currentProject.description}. This project showcases expertise in modern web development, combining performance optimization with intuitive user interfaces. Built with attention to detail and following best practices for scalability and maintainability.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    href={currentProject.live}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </motion.a>
                  <motion.a
                    href={currentProject.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 glass rounded-full text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Project Cards Carousel - 3D Carousel */}
        <div className="relative w-full mt-20 pb-32">
          {/* Carousel Body */}
          <div className="w-full py-5 pb-12 overflow-hidden">
            <motion.div
              className="relative flex cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragTransition={{ 
                power: 0.3,
                timeConstant: 200
              }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, { offset, velocity }) => {
                setIsDragging(false);
                const swipe = offset.x * velocity.x;
                
                // Swipe left (next project) - reduced threshold for better responsiveness
                if (swipe < -500 || offset.x < -50) {
                  nextProject();
                } 
                // Swipe right (previous project)
                else if (swipe > 500 || offset.x > 50) {
                  prevProject();
                }
              }}
              animate={{
                // Each card overlaps 50%, so we only move half the card width per step
                // Using clamp midpoint: (300 + 480) / 2 / 2 = ~195px per card
                x: `calc(${(selectedProject - 1) * -195}px + 40vw - 195px)`
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                mass: 1
              }}
            >
              {projects.map((project, index) => {
                const itemIndex = index + 1;
                const isActive = itemIndex === selectedProject;
                const rotation = isActive ? 0 : (itemIndex < selectedProject ? 40 : -40);
                
                // Z-index: active card should be highest, then decrease by distance from active
                const distance = Math.abs(itemIndex - selectedProject);
                const zIndex = isActive ? 50 : (50 - distance * 5);
                
                // Scale and shadow based on position
                const scale = isActive ? 1 : 0.95;
                const translateY = isActive ? -10 : 0;

                return (
                  <div
                    key={project.title}
                    className="relative flex-shrink-0"
                    style={{ 
                      width: 'clamp(300px, 28vw, 480px)',
                      height: '35vh',
                      minHeight: '300px',
                      marginLeft: index === 0 ? '0' : 'calc(clamp(300px, 28vw, 480px) * -0.5)',
                      zIndex: zIndex,
                      perspective: '1200px'
                    }}
                    onClick={() => !isDragging && moveToProject(itemIndex)}
                  >
                    {/* Card with 3D Rotation and Shadow Effect */}
                    <motion.div
                      className="relative w-full h-full cursor-pointer"
                      style={{
                        transformStyle: 'preserve-3d'
                      }}
                      animate={{
                        rotateY: rotation,
                        scale: scale,
                        y: translateY
                      }}
                      transition={{
                        duration: 0.8,
                        ease: 'easeInOut'
                      }}
                    >
                      <div 
                        className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden rounded-lg"
                        style={{
                          boxShadow: isActive 
                            ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 15px 30px -15px rgba(0, 0, 0, 0.6), 0 5px 15px -5px rgba(0, 0, 0, 0.4), 8px 8px 0px rgba(255, 255, 255, 0.1), 16px 16px 0px rgba(0, 0, 0, 0.2)'
                            : '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 5px 10px -5px rgba(0, 0, 0, 0.4), 4px 4px 0px rgba(255, 255, 255, 0.05), 8px 8px 0px rgba(0, 0, 0, 0.15)',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        {/* Project Image */}
                        <div className="h-2/3 overflow-hidden">
                          <OptimizedImage
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Card Content */}
                        <div className="p-6 h-1/3 flex flex-col justify-center bg-gradient-to-b from-gray-800 to-gray-900">
                          <h4 className="text-xl font-bold mb-2 text-white">
                            {project.title}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-white"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50"
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Bottom Shadow for Ground Effect */}
                    <div 
                      className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black rounded-full blur-xl transition-opacity duration-400 ${
                        isActive ? 'opacity-60' : 'opacity-30'
                      }`}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>


        </div>

      </div>
    </section>
  );
};

export default memo(Projects);

