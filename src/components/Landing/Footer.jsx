import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-green-ziti border-t-1 border-yellow-gold text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl text-yellow-gold font-bold tracking-wide">martest</div>
            <p className="mt-2 text-yellow-gold font-light">Creative Design & Architecture</p>
          </div>
          <div className="flex text-yellow-gold space-x-4">
            <a
              href="#"
              className="relative group text-sm uppercase tracking-widest hover:text-yellow-gold1 transition-colors duration-300"
            >
              Instagram
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
            <a
              href="#"
              className="relative group text-sm uppercase tracking-widest hover:text-yellow-gold1 transition-colors duration-300"
            >
              Twitter
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
            <a
              href="#"
              className="relative group text-sm uppercase tracking-widest hover:text-yellow-gold1 transition-colors duration-300"
            >
              LinkedIn
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
            <a
              href="#"
              className="relative group text-sm uppercase tracking-widest hover:text-yellow-gold1 transition-colors duration-300"
            >
              Facebook
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-yellow-gold text-sm font-light">
          &copy; 2025 martest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
