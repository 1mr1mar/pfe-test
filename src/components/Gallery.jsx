import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
    const interval = setInterval(changeIndex, 4000);
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

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <Slider {...settings}>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-row-reverse items-center justify-between gap-12 py-6"
            >
              {/* الصورة */}
              <div className="w-96 h-96 flex justify-center items-center md:w-1/3">
                <img
                  src={product.image}
                  alt={`Product ${product.id}`}
                  className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-amber-500"
                />
              </div>
              {/* الوصف */}
              <div className="w-full md:w-2/3 text-center md:text-left">
                <p className="text-xl font-semibold">{product.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Gallery;
