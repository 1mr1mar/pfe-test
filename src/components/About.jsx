import React from "react";
import { motion } from "framer-motion";
import SvgIcon from './costumsvg';
import Svg from "./svgn2";
import "../App.css";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center bg-green-ziti text-yellow-gold px-6 py-12"
    >
      {/* contint */}
      <p className="text-lg uppercase text-yellow-gold tracking-wide">Our Story</p>
      <h1 className="text-5xl flex gap-x-4 items-center md:text-6xl font-bold mb-6"  style={{fontFamily: 'font1, sans-serif',}}><Svg/> About Us <Svg/></h1>
      <p className="text-lg text-gray-300 max-w-2xl text-center mb-12">
        Welcome to our restaurant, where we blend tradition with innovation to
        create unforgettable dining experiences.
      </p>

      {/* pic and SVG */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full max-w-5xl">
        <img
          src="/pic/inner-pages-img-16.jpg"
          alt="Restaurant Interior"
          className="w-full md:w-2/5 object-cover rounded-lg shadow-lg" 
        />
        <div className="w-full md:w-2/5 flex justify-center">
        <SvgIcon />
        </div>
        <img
          src="/pic/menu6.jpg"
          alt="Delicious Dish"
          className="w-full md:w-2/5 object-cover rounded-lg shadow-lg" 
        />
      </div>
    </section>
  );
};

export default About;
