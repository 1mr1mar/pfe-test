import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./gallery.css";
import Svg from "./svgn2";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const products = [
    {
      id: 1,
      image: "/pic/inner-pages-gallery-img-4.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      image: "/pic/inner-pages-gallery-img-7.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      image: "/pic/inner-pages-gallery-img-3.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      image: "/pic/inner-pages-gallery-img-1.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const changeIndex = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  useEffect(() => {
    const interval = setInterval(changeIndex, 4000); // تغيير الصور كل 4 ثواني
    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    initialSlide: activeIndex,
  };

  // كشف إذا كان القسم في العرض
  const [isInView, setIsInView] = useState(false);

  const onVisibilityChange = (entries) => {
    const entry = entries[0];
    setIsInView(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onVisibilityChange, {
      threshold: 0.5, // تفعيل الأنيميشن عند ظهور 50% من القسم
    });

    const section = document.querySelector("#gallery-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="gallery-section" className="py-16 z-20 bg-green-khzy">
      <motion.h1
        className="text-5xl text-center z-20 gap-x-4 items-center md:text-6xl text-yellow-gold mb-6"
        style={{ fontFamily: 'font1, sans-serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="flex gap-x-4 justify-center items-center">
          <Svg /> Gallery <Svg />
        </span>
      </motion.h1>

      <div className="container z-20 mx-auto px-6">
        <Slider {...settings}>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex w-full items-center justify-between gap-12 py-6 card"
            >
              {/* صورة المنتج */}
              <motion.div
                className="w-150 h-150 flex-1/2 justify-center items-center md:w-1/3"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <img
                  src={product.image}
                  alt={`Product ${product.id}`}
                  className="w-full h-full object-cover shadow-lg"
                />
              </motion.div>

              {/* وصف المنتج */}
              <motion.div
                className="w-full flex-1/2 md:w-2/3 text-center md:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <p className="text-yellow-gold text-center jdid">Recommendation</p>
                <h1 className="text-3xl md:text-4xl font-bold text-yellow-gold text-center mb-4">
                  <span className="flex justify-center gap-x-4 items-center">
                    <Svg /> Our best specialties <Svg />
                  </span>
                </h1>
                <p className="text-xl text-yellow-gold font-semibold">{product.description}</p>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Gallery;
