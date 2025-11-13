import { motion } from 'framer-motion';

const Skills = () => {

  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 87 },
        { name: 'Express', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'MySQL', level: 82 },
        { name: 'MongoDB', level: 88 },
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Git', level: 90 },

        { name: 'VS Code', level: 95 },
      ],
      color: 'from-orange-500 to-red-500',
    },
  ];


  return (
    <section id="skills" className="min-h-screen py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((cat, categoryIndex) => (
            <motion.div
              key={cat?.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl"
            >
              <h3 className={`text-3xl font-bold mb-8 bg-gradient-to-r ${cat?.color} bg-clip-text text-transparent`}>
                {cat?.category}
              </h3>
              
              <div className="space-y-6">
                {cat?.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-lg font-medium">{skill.name}</span>
                      
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        className={`skill-bar h-full bg-gradient-to-r ${cat?.color} rounded-full`}
                        style={{ width: `${skill.level}%` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: skillIndex * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

