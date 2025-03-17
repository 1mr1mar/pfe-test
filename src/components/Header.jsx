import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      scrollPosition > 100 ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wide">LAURENT</div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="uppercase text-sm tracking-widest hover:text-gray-500 transition-colors duration-300">Home</a>
            <a href="#about" className="uppercase text-sm tracking-widest hover:text-gray-500 transition-colors duration-300">About</a>
            <a href="#portfolio" className="uppercase text-sm tracking-widest hover:text-gray-500 transition-colors duration-300">Portfolio</a>
            <a href="#contact" className="uppercase text-sm tracking-widest hover:text-gray-500 transition-colors duration-300">Contact</a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <a href="#home" className="uppercase text-sm tracking-widest hover:text-gray-500 transition-colors duration-300">Home</a>
            <a href="#about" className="uppercase text-sm tracking-widest hover:text-gray-500 transition-colors duration-300">About</a>
            <a href="#portfolio" className="uppercase text-sm tracking-widest hover:text-gray-500 transition-colors duration-300">Portfolio</a>
            <a href="#contact" className="uppercase text-sm tracking-widest hover:text-gray-500 transition-colors duration-300">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;