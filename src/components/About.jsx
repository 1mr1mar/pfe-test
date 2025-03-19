import React from "react";
import { motion } from "framer-motion";
import SvgIcon from './costumsvg';
import Svg from "./svgn2";
import "../App.css";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen z-22 flex flex-col items-center justify-center bg-green-ziti text-yellow-gold px-6 py-12"
    >
      {/*  4 linse in  "About" */}
      <div className="absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>   
      <div className="absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>  
      <div className="absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div> 

      {/* contint */}
      <p className="text-lg uppercase z-20 text-yellow-gold tracking-wide">Our Story</p>
      <h1 className="text-5xl flex z-20 gap-x-4 items-center md:text-6xl  mb-6" style={{fontFamily: 'font1, sans-serif',}}>
        <Svg /> About Us <Svg />
      </h1>
      <p className="text-lg z-20 text-gray-300 max-w-2xl text-center mb-12">
        Welcome to our restaurant, where we blend tradition with innovation to
        create unforgettable dining experiences.
      </p>

      {/*  pic and SVG */}
      <div className="flex z-20 flex-col md:flex-row items-center justify-center gap-20 w-full max-w-5xl">
        <img
          src="/pic/inner-pages-img-16.jpg"
          alt="Restaurant Interior"
          className="w-full md:w-2/5 object-cover rounded-lg shadow-lg" 
        />
        <div className="w-full z-20 md:w-2/5 flex justify-center">
          <SvgIcon />
        </div>
        <img
          src="/pic/menu6.jpg"
          alt="Delicious Dish"
          className="w-full z-20 md:w-2/5 object-cover rounded-lg shadow-lg" 
        />
      </div>
    </section>
  );
};

export default About;
