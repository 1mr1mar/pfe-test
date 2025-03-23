import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import OurChef from './components/OurChef';
import ContactUs from './components/ContactUs';
import Booking from './components/Booking';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const App = () => {
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
      <Gallery/>
      <Menu/>
      <OurChef/>
      <Booking/>
      <ContactUs/>
      <Footer />
    </div>
  );
};

export default App;
