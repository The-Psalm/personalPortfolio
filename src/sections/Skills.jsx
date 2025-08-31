import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSectionAnimation } from '../contexts/ScrollContext';
import { 
  faHtml5, 
  faCss3Alt, 
  faJs, 
  faReact, 
  faPython, 
  faGitAlt, 
  faGithub, 
  faFigma,
  faNodeJs
} from '@fortawesome/free-brands-svg-icons';
import { 
  faCode, 
  faDatabase, 
  faCogs, 
  faRocket,
  faBolt,
  faShield,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';

const Skills = () => {
  const { ref, isVisible } = useSectionAnimation();

  // Professional skill categories with proper icons
  const skillCategories = [
    {
      category: 'Frontend',
      icon: faCode,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      skills: [
        { name: 'HTML5', level: 95, icon: faHtml5, color: 'text-orange-500' },
        { name: 'CSS3', level: 90, icon: faCss3Alt, color: 'text-blue-500' },
        { name: 'JavaScript', level: 92, icon: faJs, color: 'text-yellow-500' },
        { name: 'React JS', level: 88, icon: faReact, color: 'text-cyan-500' },
        { name: 'TypeScript', level: 85, icon: faShield, color: 'text-blue-600' },
        { name: 'Tailwind CSS', level: 90, icon: faLayerGroup, color: 'text-teal-500' },
        { name: 'Framer Motion', level: 80, icon: faBolt, color: 'text-purple-500' },
      ]
    },
    {
      category: 'Backend',
      icon: faDatabase,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      skills: [
        { name: 'Python', level: 90, icon: faPython, color: 'text-yellow-400' },
        { name: 'Django', level: 85, icon: faRocket, color: 'text-green-600' },
        { name: 'RESTful API', level: 88, icon: faCogs, color: 'text-blue-400' },
        { name: 'SQL', level: 82, icon: faDatabase, color: 'text-gray-400' },
        { name: 'PostgreSQL', level: 80, icon: faDatabase, color: 'text-blue-600' },
      ]
    },
    {
      category: 'Tools & Design',
      icon: faCogs,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      skills: [
        { name: 'Git', level: 85, icon: faGitAlt, color: 'text-orange-600' },
        { name: 'GitHub', level: 88, icon: faGithub, color: 'text-gray-300' },
        { name: 'Figma', level: 75, icon: faFigma, color: 'text-pink-500' },
        { name: 'VS Code', level: 90, icon: faCode, color: 'text-blue-500' },
      ]
    }
  ];

  // Professional tech stack with proper categorization
  const techStack = {
    'Frontend': [
      { name: 'React', icon: faReact, color: 'text-cyan-400' },
      { name: 'Next.js', icon: faReact, color: 'text-white' },
      { name: 'TypeScript', icon: faShield, color: 'text-blue-500' },
      { name: 'JavaScript', icon: faJs, color: 'text-yellow-400' },
      { name: 'Tailwind CSS', icon: faLayerGroup, color: 'text-teal-400' },
      { name: 'Framer Motion', icon: faBolt, color: 'text-purple-400' },
    ],
    'Backend & Database': [
      { name: 'Python', icon: faPython, color: 'text-yellow-400' },
      { name: 'Django', icon: faRocket, color: 'text-green-500' },
      { name: 'PostgreSQL', icon: faDatabase, color: 'text-blue-500' },
      { name: 'RESTful APIs', icon: faCogs, color: 'text-blue-400' },
      { name: 'GraphQL', icon: faLayerGroup, color: 'text-pink-400' },
      { name: 'Redis', icon: faDatabase, color: 'text-red-500' },
    ],
    'DevOps & Tools': [
      { name: 'Git', icon: faGitAlt, color: 'text-orange-500' },
      { name: 'GitHub', icon: faGithub, color: 'text-gray-300' },
      { name: 'Docker', icon: faCogs, color: 'text-blue-400' },
      { name: 'AWS', icon: faRocket, color: 'text-orange-400' },
      { name: 'Vercel', icon: faRocket, color: 'text-white' },
      { name: 'Figma', icon: faFigma, color: 'text-pink-500' },
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  return (
    <section 
      ref={ref}
      id="skills" 
      className="py-20 relative overflow-hidden scroll-optimized"
      style={{ willChange: 'transform' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={categoryVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-[Delius] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              My Skills
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Transforming ideas into reality with a comprehensive toolkit of modern technologies
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Skills Overview */}
          <motion.div
            variants={categoryVariants}
            className="text-center mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { label: 'Years Experience', value: '4+', icon: faRocket, color: 'from-blue-400 to-cyan-500' },
                { label: 'Projects Completed', value: '50+', icon: faBolt, color: 'from-green-400 to-emerald-500' },
                { label: 'Technologies Mastered', value: '20+', icon: faCogs, color: 'from-purple-400 to-pink-500' },
                { label: 'Happy Clients', value: '50+', icon: faShield, color: 'from-orange-400 to-red-500' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 mx-auto shadow-lg`}>
                    <FontAwesomeIcon icon={stat.icon} className="text-xl text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                variants={categoryVariants}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon icon={category.icon} className="text-lg text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white font-[Delius]">{category.category}</h3>
                    <div className={`w-8 h-0.5 bg-gradient-to-r ${category.color} rounded-full mt-1`}></div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group/skill"
                    >
                      <FontAwesomeIcon 
                        icon={skill.icon} 
                        className={`text-sm ${skill.color} group-hover/skill:scale-110 transition-transform duration-300`} 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">{skill.name}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5 }}
                              className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                            />
                          </div>
                          <span className="text-xs text-gray-400 font-medium">{skill.level}%</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Professional Tech Stack */}
          <motion.div
            variants={categoryVariants}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-[Delius] text-white mb-4">
                Professional Tech Stack
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                A comprehensive ecosystem of modern technologies for building exceptional digital experiences
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.2 }}
                  className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
                >
                  <h4 className="text-xl font-semibold font-[Delius] text-white mb-6 pb-3 border-b border-gray-700/50">
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {technologies.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: categoryIndex * 0.2 + index * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 8px 25px rgba(139, 92, 246, 0.15)"
                        }}
                        className="flex items-center space-x-3 p-3 bg-slate-900/40 rounded-xl border border-slate-700/50 hover:border-purple-500/40 transition-all duration-300 cursor-pointer"
                      >
                        <FontAwesomeIcon 
                          icon={tech.icon} 
                          className={`text-base ${tech.color}`}
                        />
                        <span className="text-gray-300 font-medium text-sm">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Journey */}
          <motion.div
            variants={categoryVariants}
            className="mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-purple-500/20"
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold font-[Delius] text-white mb-4">
                Always Learning, Always Growing
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
                tools, and best practices to deliver cutting-edge solutions that exceed expectations.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
