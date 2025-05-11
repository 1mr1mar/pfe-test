import React from "react";
import { motion } from "framer-motion";
import "../App.css";
import "../index.css";
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import ContactUs from "./Landing/ContactUs";
import Herosvg from "./Landing/svgn2";

const Book = () => {
  return (
    <section className="relative min-h-screen bg-green-ziti">
      <div className="fixed z-500 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-500 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="absolute z-[-1] top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      <Navbar />

      <motion.div
        style={{
          backgroundImage: `url(/pic/pic1-homme.jpg)`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "70vh",
          zIndex: 100,
        }}
        className="w-full flex items-center justify-center border-b border-yellow-gold1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.h1
          className="text-[15rem] gap-x-4 items-center flex md:text-7xl font-custom text-yellow-gold mb-6 relative"
          style={{
            fontFamily: "font1, sans-serif",
            fontSize: "25rem !important",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Herosvg />
          BOOK your place now
          <Herosvg />
        </motion.h1>
      </motion.div>

      <div className="w-full mx-auto p-8 bg-green-ziti bg-opacity-80 rounded-lg shadow-lg mt-12">
        <form className="flex flex-col md:flex-row gap-12">
          <motion.div
            className="w-full ml-50 md:w-1/2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <div>
              <label
                htmlFor="fullName"
                className="block text-xl text-yellow-gold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                className="p-5 border-2 border-yellow-gold1 bg-transparent text-yellow-gold placeholder-yellow-gold1 text-xl w-full"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xl text-yellow-gold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="p-5 border-2 border-yellow-gold1 bg-transparent text-yellow-gold placeholder-yellow-gold1 text-xl w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xl text-yellow-gold mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="p-5 border-2 border-yellow-gold1 bg-transparent text-yellow-gold placeholder-yellow-gold1 text-xl w-full"
                placeholder="Enter your phone number"
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full mr-50 md:w-1/2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div>
              <label
                htmlFor="guests"
                className="block text-xl text-yellow-gold mb-2"
              >
                Number of Guests
              </label>
              <select
                name="guests"
                required
                className="p-5 border-2 border-yellow-gold1 bg-transparent text-yellow-gold text-xl w-full"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? "Person" : "People"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-xl text-yellow-gold mb-2"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="p-5 border-2 border-yellow-gold1 bg-transparent text-yellow-gold text-xl w-full"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-xl text-yellow-gold mb-2"
              >
                Time
              </label>
              <input
                type="time"
                name="time"
                required
                className="p-5 border-2 border-yellow-gold1 bg-transparent text-yellow-gold text-xl w-full"
              />
            </div>
          </motion.div>
        </form>

        <button
          type="submit"
          className="mt-10 ml-200 p-5 bg-transparent border-yellow-gold1 border-1 text-yellow-gold1 text-xl font-semibold shadow-lg transition duration-300 hover:bg-yellow-gold1 hover:text-white"
        >
          BOOK NOW
        </button>
      </div>

      <div className="border-t border-yellow-gold1 mt-12">
        <ContactUs />
      </div>
      <Footer />
    </section>
  );
};

export default Book;
