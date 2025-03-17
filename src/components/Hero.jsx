import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const backgrounds = [
  "/pic/main-img-5.jpg",
  "/pic/menu3.jpg",
  "/pic/main-img-1.jpg",
];

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 6000); // مدة عرض الخلفية: 6 ثوانٍ

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center">
      {/* حاوية الخلفية والمحتوى معًا */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence>
          <motion.div
            key={bgIndex} // المفتاح يساعد في تطبيق الأنيميشن عند تغيير الخلفية
            initial={{ opacity: 0 }} // تبدأ الخلفية بشفافية 0
            animate={{ opacity: 1 }} // عندما تظهر تكون الشفافية 1
            exit={{ opacity: 0 }} // عند مغادرة الصورة تتلاشى
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${backgrounds[bgIndex]})`,
            }}
          >
            {/* المحتوى الذي يظهر مع الخلفية */}
            <div className="text-white text-center px-6">
              {/* حركة العنوان */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }} // يبدأ من الأسفل
                animate={{ opacity: 1, y: 0 }} // يتحرك إلى موضعه الطبيعي
                exit={{ opacity: 0, y: -50 }} // يتلاشى ويرتفع للأعلى عند الخروج
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.5,
                }}
                className="text-5xl md:text-6xl font-light mb-6"
              >
                Creative Design & Architecture
              </motion.h1>

              {/* حركة النص */}
              <motion.p
                initial={{ opacity: 0, y: 50 }} // يبدأ من الأسفل
                animate={{ opacity: 1, y: 0 }} // يتحرك إلى موضعه الطبيعي
                exit={{ opacity: 0, y: -50 }} // يتلاشى ويرتفع للأعلى عند الخروج
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.7,
                }}
                className="text-xl text-gray-300 mb-8 font-light"
              >
                Innovative solutions for modern spaces and timeless aesthetics
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
