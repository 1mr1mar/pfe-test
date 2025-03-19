import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold tracking-wide">martest</div>
            <p className="mt-2 text-gray-400 font-light">Creative Design & Architecture</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="uppercase text-sm tracking-widest hover:text-gray-400 transition-colors duration-300">Instagram</a>
            <a href="#" className="uppercase text-sm tracking-widest hover:text-gray-400 transition-colors duration-300">Twitter</a>
            <a href="#" className="uppercase text-sm tracking-widest hover:text-gray-400 transition-colors duration-300">LinkedIn</a>
            <a href="#" className="uppercase text-sm tracking-widest hover:text-gray-400 transition-colors duration-300">Facebook</a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm font-light">
          &copy; 2025 martest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;