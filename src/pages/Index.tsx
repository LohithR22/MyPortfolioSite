
import { useEffect } from "react";
import ThemesProvider from "../components/ThemesProvider";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import ChatbotSection from "../components/ChatbotSection";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "My Tech Portfolio";
  }, []);

  return (
    <ThemesProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ChatbotSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemesProvider>
  );
};

export default Index;
