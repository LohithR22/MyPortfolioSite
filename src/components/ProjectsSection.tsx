
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const projects = [
  {
    title: "Speech Therapy using LLMs",
    description: "An AI-powered speech therapy app that generates personalized weekly plans using a Multi-Agent LLM architecture with RAG. It connects patients with certified SLPs and provides adaptive, real-time feedback.",
    tags: ["Python", "Flask", "React", "Gemini 2.0 Pro", "RAG", "ChromaDB", "Sentence Transformers"],
    image: "https://images.unsplash.com/photo-1678995632928-298d05d41671?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Telemedicine Bot with Multilingual Support",
    description: "A multilingual healthcare chatbot supporting 15+ Indian languages with real-time translation, symptom analysis, and specialist recommendations using advanced prompt engineering.",
    tags: ["Python", "Flask", "Streamlit", "Gemini API", "Sentence Transformers", "CORS", "HIPAA"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Image Forgery Detection",
    description: "A deep learning-based system to classify forged vs. authentic images using CNNs like ResNet50 and DenseNet121 with transfer learning and data augmentation.",
    tags: ["TensorFlow", "Keras", "OpenCV", "ResNet50", "DenseNet121", "NumPy", "Matplotlib"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Event Management System",
    description: "A desktop application with admin and client panels for secure event creation and management. Includes authentication and MySQL integration using JDBC.",
    tags: ["Java", "Swing", "JDBC", "MySQL"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
  },
];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section
      id="projects"
      className="py-24 bg-secondary/50 dark:bg-tech-blue-dark/80 relative"
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
            <span className="gradient-text">My Projects</span>
          </h2>
          <div className="w-24 h-1 bg-tech-red mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Here are some of the projects I've worked on. Each one represents a unique
            challenge and solution in the tech space.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="tech-card overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-tech-blue dark:text-tech-blue-light">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-tech-red text-accent-foreground dark:text-accent-foreground px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="text-tech-red hover:text-tech-red/90 hover:bg-tech-red/10 dark:hover:bg-accent px-2"
                  >
                    View Details →
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
