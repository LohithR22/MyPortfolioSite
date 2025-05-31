import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCube from "./AnimatedCube";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const skills = [
    {
      category: "AI & Machine Learning",
      items: [
        "TensorFlow, PyTorch, Scikit-learn",
        "Deep Neural Networks",
        "Large Language Models (LLMs)",
        "Computer Vision",
        "Generative AI",
      ],
    },
    {
      category: "Web Development",
      items: ["Flask", "React.js", "RESTful APIs", "MongoDB", "Express.js"],
    },
    {
      category: "Languages",
      items: ["Python", "Java", "C Programming", "SQL", "Solidity"],
    },
    {
      category: "Tools & Platforms",
      items: ["AWS", "Google Cloud", "Git/Github", "Hugging Face", "UiPath"],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="skills"
      className="py-24 gradient-bg relative overflow-hidden"
      ref={ref}
    >
      {/* Background 3D Cube - Positioned between skill card rows */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: "230px" }}
      >
        <div className="w-80 h-80 opacity-90">
          <AnimatedCube />
        </div>
      </div>

      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/3 dark:from-black/5 dark:via-transparent dark:to-white/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">My Skills</span>
          </h2>
          <div className="w-24 h-1 bg-tech-red mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-lg p-4 border border-white/10 dark:border-white/5">
            I've developed expertise in a wide range of technologies, with a
            strong focus on AI, ML, backend systems, and scalable solutions.
            Here are the key skills I bring to the table:
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              {/* More transparent skill card */}
              <div className="border border-white/15 dark:border-white/10 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-white/12 dark:hover:bg-black/18 hover:scale-105 hover:border-white/25 dark:hover:border-white/15">
                <h3 className="text-xl font-bold mb-4 text-tech-blue dark:text-tech-blue-light">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="flex items-center text-gray-800 dark:text-gray-200 font-medium"
                    >
                      <svg
                        className="w-5 h-5 text-tech-red mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                      <span className="text-lg">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-tech-red/20 via-tech-blue/20 to-tech-blue-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
