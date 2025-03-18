import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


//backgroun pic
const backgrounds = [
  "/pic/main-img-5.jpg",
  "/pic/menu3.jpg",
  "/pic/main-img-1.jpg",
];

// text for each pic
const texts = [
  {
    title: "Creative Design & Architecture",
    description: "Innovative solutions for modern spaces and timeless aesthetics",
  },
  {
    title: "Modern Living Spaces",
    description: "Experience the perfect blend of comfort and design",
  },
  {
    title: "Architecture & Innovation",
    description: "Transforming ideas into reality with cutting-edge designs",
  },
];

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 6000); 

    return () => clearInterval(interval);
  }, []);

  // وظيفة لتطبيق تأثير parallax على الخلفية
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const bgElement = document.querySelector(".hero-background");
    if (bgElement) {
      bgElement.style.transform = `translateY(${scrollPosition * 0.5}px)`; // خلفية تتحرك بمعدل 0.5 من سرعة التمرير
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center">
      {/* backgroun and contint */}
      <div className="absolute inset-0 w-full h-full hero-background">
        <AnimatePresence>
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${backgrounds[bgIndex]})`,
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center',
            }}
          >
            {/* المحتوى الذي يظهر مع الخلفية */}
            <div className="text-white text-center px-6">
              {/* حركة العنوان */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.5,
                }}
                className="text-5xl md:text-6xl font-light mb-6"
              >
                {texts[bgIndex].title}
              </motion.h1>

              {/* حركة النص */}
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.7,
                }}
                className="text-xl text-gray-300 mb-8 font-light"
              >
                {texts[bgIndex].description}
              </motion.p>

              {/* الزر مع الحركة */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold text-white px-8 py-3 flex items-center hover:bg-gray-800 transition-colors duration-300 uppercase text-sm tracking-widest"
              >
                View Portfolio
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
