import { useRef } from "react";
import { motion } from "framer-motion";
import AIBrain from "./AIBrain";
import GlassCube from "./GlassCube";
import OrbitingTechInterests from "./OrbitingTechInterests";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const constraintsRef = useRef(null);

  return (
    <section
      id="home"
      className="min-h-[100vh] flex items-center relative overflow-hidden gradient-bg"
      ref={constraintsRef}
    >
      {/* Floating elements */}
      <motion.div
        className="absolute hidden md:block w-16 h-16 rounded-full bg-tech-red/30 dark:bg-tech-red/20 blur-xl"
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute hidden md:block w-24 h-24 right-20 top-40 rounded-full bg-tech-blue-light/20 blur-xl"
        animate={{
          x: [0, -100, -50, 0],
          y: [0, 100, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        {/* Text Content with Glass Cube */}
        <div className="order-2 lg:order-1 space-y-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                  <span className="gradient-text">Hello, I'm</span>
                  <br />
                  <span className="text-foreground">Lohith R Gowda</span>
                </h1>
              </div>

              {/* Glass Cube beside the name */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0"
              >
                <GlassCube />
              </motion.div>
            </div>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-lg">
              A passionate innovator crafting impactful AI-driven and full-stack
              solutions. I thrive on transforming bold ideas into scalable,
              real-world technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-tech-red hover:bg-tech-red/90 text-white"
                asChild
              >
                <a href="#projects">View My Work</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-tech-blue text-tech-blue hover:bg-tech-blue/10 dark:border-tech-blue-light dark:text-tech-blue-light"
                asChild
              >
                <a href="#chat">Chat with my AI</a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* AI Brain - Full Right Column */}
        <div className="order-1 lg:order-2 relative h-[500px] md:h-[600px] w-full">
          {/* AI Brain covering the entire right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 w-full h-full z-20"
          >
            <AIBrain className="w-full h-full" />
          </motion.div>

          {/* Orbiting Tech Interests - Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute inset-0 w-full h-full z-0"
          >
            <OrbitingTechInterests
              interests={[
                "AI",
                "React",
                "TypeScript",
                "3D",
                "WebGL",
                "Machine Learning",
              ]}
            />
          </motion.div>

          {/* Interactive hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-4 right-4 text-xs text-gray-500 dark:text-gray-400 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 z-30"
          >
            Move your cursor to interact
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          Scroll Down
        </p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5L12 19M12 19L19 12M12 19L5 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
