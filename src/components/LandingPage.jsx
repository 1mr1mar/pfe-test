import React from "react";
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
      {/* 2 lines r and l  */}
      <div className="fixed z-50 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-50 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>

      {/*  the 4 inside <div className="fixed z-1 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold"></div>   
      <div className="fixed z-1 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-1 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold"></div>  
      <div className="fixed z-1 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold"></div>  */}

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

export default Landing;
