/*import React from "react";
import Hero from "./Landing/Hero";
import About from "./Landing/About";
import Gallery from "./Landing/Gallery";
import Menu from "./Landing/Menu";
import OurChef from "./Landing/OurChef";
import Booking from "./Landing/Booking";
import ContactUs from "./Landing/ContactUs";
import Footer from "./Landing/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../app.css";

const Landing = () => {
  return (
    <div className=" relative min-h-screen">
      {/* 2 lines r and l  
      <div className="fixed z-50 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-50 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>

      {/*  the 4 inside <div className="fixed z-1 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold"></div>   
      <div className="fixed z-1 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-1 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold"></div>  
      <div className="fixed z-1 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold"></div>  

      <Hero />
      <About />
      <Gallery />
      <Menu />
      <OurChef />
      <Booking />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Landing;*/
// Landing.js
import React from "react";
import Hero from "./Landing/Hero";
import About from "./Landing/About";
import Gallery from "./Landing/Gallery";
import Menu from "./Landing/Menu";
import OurChef from "./Landing/OurChef";
import Booking from "./Landing/Booking";
import ContactUs from "./Landing/ContactUs";
import Footer from "./Landing/Footer";
import { Link } from "react-scroll";  // استيراد Link من react-scroll
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../app.css";
import Svg from "../herosvg"; 

const Landing = () => {
  return (
    <div className="relative min-h-screen">
       <div className="fixed z-50 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
       <div className="fixed z-50 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="z-100" id="home">
        <Hero />
      </div>
      <div className="z-100" id="about">
        <About />
      </div>
      <div className="z-100" id="gallery">
        <Gallery />
      </div>
      <div className="z-100" id="menu">
        <Menu />
      </div>
      <div className="z-100" id="chef">
        <OurChef />
      </div>
      <div className="z-100" id="booking">
        <Booking />
      </div>
      <div className="z-100" id="contact">
        <ContactUs />
      </div>
      <Footer />

      {/* زر العودة إلى الأعلى */}
      <div className="fixed z-999 bottom-5 right-5">
        <Link
          to="home" // معرّف قسم Hero
          smooth={true}
          duration={500}
        >
          <button className=" text-black rounded-full shadow-lg hover:bg-yellow-gold1 p-3 transition duration-300">
            <div className="transform rotate-90 ">
               <Svg /> {/* استخدام مكون Svg هنا */}
            </div>
           
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;



