import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className=" min-h-screen">
      <div className="fixed z-50 top-0 left-1/18 h-full w-[1px] bg-amber-500"></div>
      <div className="fixed z-50 top-0 right-1/18 h-full w-[1px] bg-amber-500"></div>
      <Navbar />
      <Hero />
      <About />
      
      
      <Footer />
    </div>
  );
};

export default App;
