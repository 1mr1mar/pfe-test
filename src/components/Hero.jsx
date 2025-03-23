import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import Svg from "./svgn2";
import Herosvg from "../herosvg";
import "../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// background images
const backgrounds = [
  "/pic/home-8-img-shop-5.jpg",
  "/pic/menu1.jpg",
  "/pic/main-img-1.jpg",
];

// text for each background image
const texts = [
  {
    tage: "Wellcom to our delicious corner",
    title: "Creative Design & Architecture",
    description:
      "Innovative solutions for modern spaces and timeless aesthetics",
  },
  {
    tage: "Wellcom to our delicious corner",
    title: "Modern Living Spaces",
    description: "Experience the perfect blend of comfort and design",
  },
  {
    tage: "Wellcom to our delicious corner",
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

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const bgElement = document.querySelector(".hero-background");
    if (bgElement) {
      bgElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative z-21 h-screen flex items-center">
      {/* background and content */}
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
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
            }}
          >
            <Navbar />
            <div className="text-yellow-gold text-center items-center px-6">
              {/* Tagline with new animation */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.7,
                }}
                className="text-xl jdid text-yellow-gold mb-8 font-light tracking-wider"
              >
                {texts[bgIndex].tage}
              </motion.p>

              {/* Title with enhanced animation */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.5,
                }}
                className="text-[15rem] gap-x-4 items-center flex md:text-7xl font-custom mb-6 relative"
                style={{
                  fontFamily: "font1, sans-serif",
                  fontSize: "25rem !important",
                }}
              >
                <Svg />
                {texts[bgIndex].title}

                <Svg />
              </motion.h1>

              {/* Description  */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 1,
                }}
                className="text-xl text-gray-300 mb-8 font-light"
              >
                {texts[bgIndex].description}
              </motion.p>

              {/* Button*/}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#ffcc00" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 1.5,
                }}
                className="text-yellow-gold flex mx-auto px-6 py-3 border-2 border-yellow-gold text-lg font-medium transition duration-300 shadow-lg transform hover:scale-105"
              >
                View Portfolio
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute cursor-pointer left-10 top-1/2 transform -translate-y-1/2">
        <Herosvg />
      </div>

      <div className="absolute cursor-pointer right-10 top-1/2 transform rotate-180 -translate-y-1/2">
        <Herosvg />
      </div>
    </section>
  );
};

export default Hero;
