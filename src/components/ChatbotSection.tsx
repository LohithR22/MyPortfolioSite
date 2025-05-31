
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatbotSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your multilingual assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState("english");
  const messagesEndRef = useRef(null);

  const languages = [
    { id: "english", name: "English" },
    { id: "hindi", name: "Hindi" },
    { id: "tamil", name: "Tamil" },
    { id: "telugu", name: "Telugu" },
    { id: "bengali", name: "Bengali" },
    { id: "marathi", name: "Marathi" },
    { id: "spanish", name: "Spanish" },
    { id: "french", name: "French" },
    { id: "german", name: "German" },
    { id: "japanese", name: "Japanese" },
    { id: "chinese", name: "Chinese" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputValue }]);
    
    // Simulate chatbot response
    setTimeout(() => {
      let response = "";
      
      if (language === "english") {
        response = "I'm your professional assistant. I can tell you about my experience and skills. What would you like to know?";
      } else if (language === "hindi") {
        response = "मैं आपका व्यावसायिक सहायक हूँ। मैं आपको अपने अनुभव और कौशल के बारे में बता सकता हूँ। आप क्या जानना चाहेंगे?";
      } else if (language === "tamil") {
        response = "நான் உங்கள் தொழில்முறை உதவியாளர். எனது அனுபவம் மற்றும் திறன்களைப் பற்றி உங்களுக்குச் சொல்ல முடியும். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?";
      } else {
        response = "I'm your professional assistant. (This would be translated to your selected language)";
      }
      
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      scrollToBottom();
    }, 1000);
    
    setInputValue("");
  };

  return (
    <section
      id="chat"
      className="py-24 gradient-bg relative"
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
            <span className="gradient-text">Chat With Me</span>
          </h2>
          <div className="w-24 h-1 bg-tech-red mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Ask me anything about my professional experience in multiple languages.
            I'm fluent in various Indian languages and international languages too!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="tech-card">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Multilingual Assistant</CardTitle>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] p-4 rounded-md bg-gray-50 dark:bg-gray-900/50 mb-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.role === "user"
                            ? "bg-tech-blue text-white"
                            : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-tech-red hover:bg-tech-red/90 text-white">
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotSection;
