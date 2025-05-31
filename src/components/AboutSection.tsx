import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const stats = [
    { value: 3, label: "Years Experience" },
    { value: 16, label: "Projects Completed" },
    { value: 15, label: "Technologies" },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-tech-blue-dark relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-tech-red mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            I'm a tech enthusiast and problem solver with a strong foundation in
            software development, artificial intelligence, and cutting-edge
            technologies. My journey in tech has led me to work on impactful
            projects across AI, machine learning, and full-stack development,
            often combining innovation with practical, user-focused solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">My Journey</h3>
            <p className="text-gray-700 dark:text-gray-300">
              My passion for technology began with a curiosity about how systems
              work and a drive to build meaningful solutions. Over the past few
              years, I’ve gained hands-on experience through academic learning,
              internships across the globe, and award-winning hackathon
              projects.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              I’ve developed expertise in artificial intelligence, deep
              learning, web development, and cloud-native
              applications—leveraging frameworks like TensorFlow, PyTorch,
              LangChain, and modern backend stacks with Flask and FastAPI. With
              a strong grasp of LLMs, prompt engineering, and vector databases,
              I’ve created scalable, intelligent systems across domains like
              healthcare, speech therapy, and fintech.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              I believe in creative problem-solving backed by solid engineering
              principles. Beyond coding, I lead tech initiatives at my
              university, contribute to developer communities, and continuously
              explore emerging technologies through research, hackathons, and
              open-source contributions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="tech-card flex flex-col items-center justify-center p-6"
              >
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyDelay={200}
                  className="text-4xl md:text-5xl font-bold text-tech-red mb-2"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
