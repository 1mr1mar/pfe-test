import React, { useState } from "react";
import { motion } from "framer-motion";
import Svg from "./svgn2";

const Booking = () => {
  const [formData, setFormData] = useState({
    guests: 1,
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", formData);
    alert("Booking submitted successfully!");
  };

  return (
    <section className="flex justify-center items-center p-50 bg-green-ziti">
      <motion.div
        className="w-full max-w-4xl p-5"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
        <p className="jdid text-yellow-gold text-2xl ml-75">Reservations</p>
        <motion.h2
          className="text-center text-yellow-gold text-5xl flex items-center ml-40 gap-4 tracking-widest mb-6"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Svg />
          BOOK A TABLE
          <Svg />
        </motion.h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-12">
          <div className="col-span-1">
            <select
              name="guests"
              required
              className="p-6 border-2 border-yellow-gold1 bg-transparent text-yellow-gold placeholder-yellow-gold1 text-lg w-full"
              onChange={handleChange}
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
            </select>
          </div>
          <div className="col-span-1">
            <input
              type="date"
              name="date"
              required
              className="p-6 border-2 border-yellow-gold1 bg-transparent text-yellow-gold1 placeholder-yellow-gold1 text-lg w-full"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <input
              type="time"
              name="time"
              required
              className="p-6 border-2 border-yellow-gold1 bg-transparent text-yellow-gold1 placeholder-yellow-gold1 text-lg w-full"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="p-6 border-2 border-yellow-gold1 text-yellow-gold bg-transparent hover:bg-yellow-gold1 hover:text-black w-full text-lg"
            >
              BOOK NOW
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Booking;
