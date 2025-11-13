import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useState, memo } from 'react';
import OptimizedImage from './OptimizedImage';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(0);
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

  const nextProject = () => {
    setSelectedProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setSelectedProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[selectedProject];

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

        {/* Project Cards Carousel - Fanned Out Display */}
        <div className="relative h-[500px] mt-20">
          <motion.div 
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            dragElastic={0.3}
            dragTransition={{ 
              power: 0.2,
              timeConstant: 200,
              bounceStiffness: 300,
              bounceDamping: 20
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, { offset, velocity }) => {
              setIsDragging(false);
              const swipe = Math.abs(offset.x) * velocity.x;
              
              // Swipe left (next project) - reduced threshold
              if (swipe < -2000 || offset.x < -100) {
                nextProject();
              } 
              // Swipe right (previous project) - reduced threshold
              else if (swipe > 2000 || offset.x > 100) {
                prevProject();
              }
            }}
          >
            {projects.map((project, index) => {
              const offset = index - selectedProject;
              const absOffset = Math.abs(offset);
              
              // Calculate position and rotation for fan effect
              const rotation = offset * 8;
              const translateX = offset * 280;
              const translateY = absOffset * 20;
              const scale = index === selectedProject ? 1.1 : 0.85 - absOffset * 0.1;
              const zIndex = projects.length - absOffset;
              const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.3;

              return (
                <motion.div
                  key={project.title}
                  initial={false}
                  animate={{
                    rotateZ: rotation,
                    x: translateX,
                    y: translateY,
                    scale: scale,
                    zIndex: zIndex,
                    opacity: opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                    mass: 0.8,
                  }}
                  onClick={() => !isDragging && setSelectedProject(index)}
                  className="absolute cursor-pointer"
                  style={{
                    width: '400px',
                    height: '450px',
                  }}
                >
                  <div className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl ${
                    index === selectedProject ? 'ring-4 ring-primary' : ''
                  }`}>
                    {/* Card Background */}
                    <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 pointer-events-none">
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
                      <div className="p-6 h-1/3 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {index === selectedProject && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full shadow-lg"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default memo(Projects);

