import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent  text-white shadow-md w-full top-0 left-0 p-4 z-50 fixed border-b border-yellow-gold">
      <div className="container mx-auto flex items-center w-full justify-center relative">
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center text-lg space-x-6 xl:space-x-10">
          <a href="#" className="text-lg hover:text-white transition duration-300">
            HOME
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            About
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Gallery
          </a>

          {/* Logo in the center */}
          <img
            src="/pic/logo1.png"
            alt="Logo"
            className="h-12 md:h-20 shadow-lg hover:opacity-80 transition duration-300 mx-6"
          />

          <a href="#" className="hover:text-white transition duration-300">
            Menu
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Our Chef
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden absolute right-4">
          <button 
            onClick={toggleMenu}
            className="text-amber-300 hover:text-white transition duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-transparent bg-opacity-90 shadow-lg mt-4 p-4 rounded-md flex flex-col items-center">
          <div className="flex justify-center mb-4">
            <img
              src="/pic/logo1.png"
              alt="Logo"
              className="h-16 shadow-lg hover:opacity-80 transition duration-300"
            />
          </div>
          <a href="#" className="block text-lg hover:text-white transition duration-300 text-center">
            HOME
          </a>
          <a href="#" className="block hover:text-white transition duration-300 text-center">
            About
          </a>
          <a href="#" className="block hover:text-white transition duration-300 text-center">
            Gallery
          </a>
          <a href="#" className="block hover:text-white transition duration-300 text-center">
            Menu
          </a>
          <a href="#" className="block hover:text-white transition duration-300 text-center">
            Our Chef
          </a>
          <a href="#" className="block hover:text-white transition duration-300 text-center">
            Contact Us
          </a>
          <div className="flex justify-center mt-4">
            <button className="bg-amber-300 text-black px-4 py-2 shadow-md hover:bg-amber-400 transition duration-300">
              BOOK NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
