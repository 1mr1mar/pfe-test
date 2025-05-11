import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./gallery.css";
import Svg from "./svgn2";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomNextArrow = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(154, 125, 87, 0.3)" }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-yellow-gold bg-opacity-80 hover:bg-opacity-100 text-green-ziti p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
  >
    <ChevronRight size={28} />
  </motion.button>
);

const CustomPrevArrow = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(154, 125, 87, 0.3)" }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-yellow-gold bg-opacity-80 hover:bg-opacity-100 text-green-ziti p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
  >
    <ChevronLeft size={28} />
  </motion.button>
);

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const products = [
    {
      id: 1,
      image: "/pic/inner-pages-gallery-img-4.jpg",
      description:
        "Experience our signature dishes crafted with the finest ingredients and traditional techniques.",
      title: "Signature Collection"
    },
    {
      id: 2,
      image: "/pic/inner-pages-gallery-img-7.jpg",
      description:
        "Indulge in our chef's special creations that blend authentic flavors with modern presentation.",
      title: "Chef's Special"
    },
    {
      id: 3,
      image: "/pic/inner-pages-gallery-img-3.jpg",
      description:
        "Discover our carefully curated menu featuring both classic favorites and innovative new dishes.",
      title: "Culinary Excellence"
    },
    {
      id: 4,
      image: "/pic/inner-pages-gallery-img-1.jpg",
      description:
        "Savor the perfect combination of flavors in our award-winning culinary masterpieces.",
      title: "Award-Winning"
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    initialSlide: activeIndex,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    customPaging: (i) => (
      <div className="w-3 h-3 rounded-full bg-yellow-gold bg-opacity-50 hover:bg-opacity-100 transition-all duration-300" />
    ),
  };

  const onVisibilityChange = (entries) => {
    const entry = entries[0];
    setIsInView(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onVisibilityChange, {
      threshold: 0.5,
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
    <section id="gallery-section" className="py-20 z-20 bg-green-khzy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
      
      <motion.h1
        className="text-5xl text-center z-20 gap-x-4 items-center md:text-6xl text-yellow-gold mb-12"
        style={{ fontFamily: 'font1, sans-serif' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="flex gap-x-4 justify-center items-center">
          <Svg /> Gallery <Svg />
        </span>
      </motion.h1>

      <div className="container z-20 mx-auto px-6 relative">
        <div className="px-12">
          <Slider {...settings}>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex w-full items-center justify-between gap-12 py-6 card"
              >
                <motion.div
                  className="w-150 h-150 flex-1/2 justify-center items-center md:w-1/3"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="relative group">
                    <img
                      src={product.image}
                      alt={`Product ${product.id}`}
                      className="w-full h-full object-cover rounded-lg shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-yellow-gold/30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </div>
                </motion.div>

                <motion.div
                  className="w-full flex-1/2 md:w-2/3 text-center md:text-left"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <p className="text-yellow-gold text-center jdid tracking-wider uppercase text-sm mb-2">Recommendation</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-yellow-gold text-center mb-6">
                    <span className="flex justify-center gap-x-4 items-center">
                      <Svg /> {product.title} <Svg />
                    </span>
                  </h2>
                  <p className="text-xl text-yellow-gold/90 font-light leading-relaxed">{product.description}</p>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
