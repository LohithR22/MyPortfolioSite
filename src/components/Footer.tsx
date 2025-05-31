
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-tech-blue-dark/50 text-white py-6 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-400 text-sm"
        >
          <p>Built with ❤️ using React, TypeScript & Tailwind CSS</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
