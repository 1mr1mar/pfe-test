import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-light mb-4">About Us</h2>
            <p className="text-gray-600 mb-6 font-light">
              We are a creative design studio focused on architecture, interior design, and visual identity.
              Our approach combines functionality with aesthetics to create spaces that inspire.
            </p>
            <p className="text-gray-600 font-light">
              Founded in 2015, we have completed over 100 projects worldwide, each reflecting our commitment
              to innovative design solutions.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <div className="h-64 md:h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;