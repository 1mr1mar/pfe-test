import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    comment: "Absolutely delicious! The atmosphere was perfect.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "John D.",
    rating: 4,
    comment: "Great service and tasty food. Will come again!",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Emily R.",
    rating: 5,
    comment: "A wonderful experience from start to finish.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const ReviewsSection = () => {
  return (
    <section className="bg-green-ziti border-t-1 border-b-1  border-yellow-gold py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-yellow-gold text-5xl mb-12 tracking-wider" style={{ fontFamily: "font1, sans-serif" }}>
          Top Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-transparent border-2 border-yellow-gold1 p-6 rounded-xl text-yellow-gold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 border border-yellow-gold1"
              />
              <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
              <div className="flex justify-center mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-gold1" />
                ))}
              </div>
              <p className="text-base italic">"{review.comment}"</p>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <Link to="/reviews">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-yellow-gold1 text-yellow-gold px-6 py-3 text-lg hover:bg-yellow-gold1 hover:font-bold hover:text-green-ziti transition"
          >
            View More Reviews
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default ReviewsSection;
