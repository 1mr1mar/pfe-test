import React from "react";
import { motion } from "framer-motion";
import SvgIcon from "./costumsvg";
import Svg from "./svgn2";
import SvgI from "./svgn4";
import "../App.css";

const OurChef = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen z-22 flex flex-col items-center justify-center bg-green-khzy text-yellow-gold px-6 py-12"
    >
      {/* 4 lines in "About" */}
      <div className="absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      {/* content */}
      <h1
        className="text-5xl flex z-20 gap-x-4 items-center md:text-6xl mb-6"
        style={{ fontFamily: "font1, sans-serif" }}
      >
        <Svg />
        Our Chef
        <Svg />
      </h1>

      <div className="flex z-20 flex-col md:flex-row items-center justify-center gap-x-20 w-full max-w-5xl">
        <img
          src="/pic/inner-pages-img-16.jpg"
          alt="Restaurant Interior"
          className="w-full md:w-2/5 object-cover rounded-lg shadow-lg"
        />

        <div className="w-200 md:w-2/5 h-full flex justify-center items-center">
          <p className="text-lg w-200 z-20 text-gray-300 text-center mb-12">
            Welcome to our restaurant, where we blend tradition with innovation
            to create unforgettable dining experiences. Welcome to our
            restaurant, where we blend tradition with innovation to create
            unforgettable dining experiences.
          </p>
        </div>

        <img
          src="/pic/menu6.jpg"
          alt="Delicious Dish"
          className="w-full md:w-2/5 object-cover rounded-lg shadow-lg"
        />
        
      </div>

      {/* Position SvgI all the way left */}
      <SvgI className="absolute left-0 " />
    </section>
  );
};

export default OurChef;
