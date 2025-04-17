import React, { useState } from "react";

export default function AddReviewForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5); // التقييم الافتراضي 5 نجوم

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name && message) {
      // إرسال التقييم إلى الصفحة الرئيسية
      onSubmit({ name, message, rating });

      // مسح الحقول بعد الإرسال
      setName("");
      setMessage("");
      setRating(5);
    } else {
      alert("من فضلك أكمل جميع الحقول");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter your name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Write your review"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded-md mt-2"
          >
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
