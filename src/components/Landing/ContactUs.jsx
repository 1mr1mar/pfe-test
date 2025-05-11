import React from "react";
import Svg from "./svgn2";

const ContactUs = () => {
  return (
    <section className="relative bg-green-khzy z-40 py-16 px-4 md:px-12 lg:px-24 flex flex-col items-center">
      <div className="absolute z-[-1] top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      <h1
        className="text-5xl text-yellow-gold flex z-20 gap-x-4 items-center md:text-6xl mb-12 text-center"
        style={{ fontFamily: "font1, sans-serif" }}
      >
        <Svg /> Contact Us <Svg />
      </h1>

      <div className="w-350 container h-100 border-3 border-yellow-gold1 overflow-hidden shadow-lg mb-12">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d697.9268760282611!2d-5.894896770784759!3d35.006004782691136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0a4d8985cba1d7%3A0x1de0d2d25b307013!2sKsar%20El-K%C3%A9bir!5e0!3m2!1sfr!2sma!4v1742426578910!5m2!1sfr!2sma"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between gap-x-20">
        <div className="w-full container pl-40 md:w-1/2">
          <p className=" jdid text-3xl ml-65 text-yellow-gold  mb-2">Write to us</p>
          <h1 className="text-6x2 ml-35 text-yellow-gold flex z-20 gap-x-4 items-center md:text-6xl mb-12 text-center" style={{ fontFamily: "font1, sans-serif" }} > <Svg />Contact Us<Svg /></h1>
          <form className="w-full items-center">
            <input
              type="text"
              placeholder="Name"
              className="w-full border-2 border-yellow-gold p-3 mb-4 bg-transparent text-white  focus:outline-none focus:ring-2 focus:ring-yellow-gold"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border-2 border-yellow-gold bg-transparent text-white  focus:outline-none focus:ring-2 focus:ring-yellow-gold"
            />
            <textarea
              placeholder="Message"
              className="w-full p-3 mb-4 border-2 border-yellow-gold bg-transparent text-white  focus:outline-none focus:ring-2 focus:ring-yellow-gold"
            ></textarea>
            <button
              type="submit"
              className="p-3 w-full md:w-auto  px-6 border-2 border-yellow-gold pl-10 pr-10 ml-70 text-yellow-gold  hover:bg-yellow-gold hover:text-white transition-all"
            >
              Send
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 items-center text-center text-white">
          <div className="container mt-20">
            <h2 className="text-3xl font-semibold mb-4 text-yellow-gold">Additional Info</h2>
            <p className="mb-2 text-yellow-gold1">Address: Example Street, City, Country</p>
            <p className="mb-2 text-yellow-gold1"> Phone: +123 456 789</p>
            <p className="mb-2 text-yellow-gold1">✉ Email: example@email.com</p>
            <p className="text-yellow-gold1">Business Hours: Mon - Fri, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
