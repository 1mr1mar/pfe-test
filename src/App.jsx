import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const App = () => {
  return (
    <div className=" relative min-h-screen">
      <div className="fixed z-50 top-0 left-1/18 h-full w-[1px] bg-amber-500"></div>
      <div className="fixed z-50 top-0 right-1/18 h-full w-[1px] bg-amber-500"></div>
      <Navbar />
      <Hero />
      <About />
      <Gallery/>
      <Menu/>
      <Footer />
    </div>
  );
};

export default App;
