import React, { useState } from "react";
import AddReviewForm from "./AddReviewForm";
import { motion } from "framer-motion";
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "John", message: "The food was amazing!", rating: 5 },
    { id: 2, name: "Sarah", message: "Loved the ambiance.", rating: 4 },
    {
      id: 3,
      name: "Ali",
      message: "Great service and delicious dishes.",
      rating: 5,
    },
  ]);

  const handleNewReview = (newReview) => {
    setReviews((prev) => [...prev, { id: prev.length + 1, ...newReview }]);
  };

  const sortReviews = (value) => {
    let sorted;
    if (value === "rating") {
      sorted = [...reviews].sort((a, b) => b.rating - a.rating);
    } else if (value === "date") {
      sorted = [...reviews].sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );
    }
    setReviews(sorted);
  };

  return (
    <section className=" m-0 bg-green-ziti  text-yellow-gold relative ">
      <Navbar /> 

      {/* Hero Section with Background Image */}
      <motion.div
        style={{
          margin: "0px",
          backgroundImage: `url(/pic/portfolio-large-img-2.jpg)`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "70vh",
          zIndex: 100,
        }}
        className="h-2/3 w-full border-b border-yellow-gold1 bg-cover bg-no-repeat flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-custom text-yellow-gold mb-6 relative"
          style={{
            fontFamily: "font1, sans-serif",
            fontSize: "6rem !important",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          What Our Customers Say About Us
        </motion.h1>
      </motion.div>

    
      <div className="fixed z-5000 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-5000 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="absolute z-[-1] top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      <div className="mt-12 z-20">
        <motion.h2
          className="text-5xl mt-10 md:text-6xl text-center mb-12"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: -80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Customer Reviews
        </motion.h2>

     
        <div className="flex justify-center mb-8">
          <select
            onChange={(e) => sortReviews(e.target.value)}
            className="p-2 rounded bg-yellow-gold1 text-green-khzy font-semibold shadow-md focus:outline-none"
          >
            <option value="">Sort By</option>
            <option value="rating">By Rating</option>
            <option value="date">By Date</option>
          </select>
        </div>

    
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              className="bg-green-ziti border-1 border-yellow-gold p-6 shadow-xl text-yellow-gold"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="italic text-yellow-gold mb-2">"{rev.message}"</p>
              <h4 className="font-semibold text-lg">{rev.name}</h4>
              <p className="text-yellow-500 text-xl mt-2">
                {"⭐".repeat(rev.rating)}
              </p>
            </motion.div>
          ))}
        </div>

        
        <div className="mt-16 max-w-2xl mx-auto">
          <AddReviewForm onSubmit={handleNewReview} />
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default ReviewsPage;
