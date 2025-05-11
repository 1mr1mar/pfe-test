import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Svg from "./Landing/svgn2";

import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";

const chefs = [
  {
    name: "Chef Ahmed Khaled",
    title: "Executive Chef",
    image: "/pic/inner-pages-img-16.jpg",
    bio: "An expert in French cuisine with over 15 years of experience in crafting fine dining dishes.",
  },
  {
    name: "Chef marwan Mansour",
    title: "Pastry Specialist",
    image: "/pic/Meet-the-chef-img.jpg",
    bio: "Passionate about elegant desserts and luxurious French mousses.",
  },
  {
    name: "Chef Sami Youssef",
    title: "Sushi Chef",
    image: "/pic/inner-pages-img-17.jpg",
    bio: "Creates authentic Japanese sushi with a modern artistic twist.",
  },
];

export default function OurChefs() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="relative min-h-screen bg-green-ziti">
      
      <div className="fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="absolute z-1 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-1 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-1 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-1 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      <div className="z-10000">
        <Navbar />
      </div>

      <div className="max-w-7xl pt-50 min-h-[40vh] flex flex-col justify-center items-center mx-auto text-center">
        <motion.h1
          className="text-5xl text-yellow-gold flex z-20 gap-x-4 items-center md:text-6xl mb-6"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Svg />
          Our Chef
          <Svg />
        </motion.h1>

        <div className="grid md:grid-cols-3 z-50 gap-10 px-4">
          {chefs.map((chef, index) => (
            <div
              key={index}
              className="relative z-10  overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-green-ziti right-0  bg-opacity-60 text-yellow-gold p-4">
                <h3 className="text-xl font-bold">{chef.name}</h3>
                <p className="text-sm text-yellow-gold">{chef.title}</p>
                <p className="text-sm mt-2">{chef.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" w-full border-t-1 border-yellow-gold bg-green-khzy flex flex-col items-center justify-center">
      <div className="max-w-4xl  mx-auto mt-20 px-4 mb-50" data-aos="fade-up">
        <p className=" text-yellow-gold1 ml-100 flex z-20  items-center  mb-6 jdid">met our chef </p>
        <motion.h1
          className=" text-yellow-gold flex z-20 gap-x-4 items-center md:text-6xl mb-6"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Svg />
          Leave a Message for the Chef
          <Svg />
        </motion.h1>
        <form className="space-y-4 z-5000">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3   text-yellow-gold border border-yellow-gold focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder=" Your Email"
              className="w-full p-3   text-yellow-gold border border-yellow-gold focus:outline-none"
            />
          </div>
          <div>
            <select className="w-full p-3   text-yellow-gold border border-yellow-gold focus:outline-none">
              <option value="">Select a Chef </option>
              {chefs.map((chef, idx) => (
                <option key={idx} value={chef.name}>
                  {chef.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full p-3   text-yellow-gold border border-yellow-gold focus:outline-none"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-transparont text-yellow-gold border-1 border-yellow-gold px-6 py-2   hover:bg-yellow-gold hover:text-green-ziti te transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
              
      </div>
      
      <Footer />
    </section>
  );
}
