import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: "Grilled Salmon",
      rating: 5,
      comment: "An absolutely delightful dish! Fresh and flavorful.",
    },
    {
      id: 2,
      product: "Vegetarian Pizza",
      rating: 4,
      comment: "A tasty and healthy option. The crust was perfect.",
    },
    {
      id: 3,
      product: "Chocolate Cake",
      rating: 5,
      comment: "Rich and decadent, one of the best cakes I've had!",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    product: "",
    rating: "",
    comment: "",
  });

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const newReviews = [...reviews];
      newReviews.splice(index, 1);
      setReviews(newReviews);
    }
  };

  const handleEdit = (review, index) => {
    setEditingReview(index);
    setFormData({ ...review });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingReview(null);
    setFormData({
      product: "",
      rating: "",
      comment: "",
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      ...formData,
      id: editingReview !== null ? reviews[editingReview].id : Date.now(),
    };

    if (editingReview !== null) {
      const updatedReviews = [...reviews];
      updatedReviews[editingReview] = newReview;
      setReviews(updatedReviews);
    } else {
      setReviews([...reviews, newReview]);
    }

    setShowModal(false);
    setFormData({
      product: "",
      rating: "",
      comment: "",
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-5xl text-center pt-10 text-yellow-gold1 mb-6"
          style={{ fontFamily: "font1, sans-serif" }}
        >
          Reviews Management
        </h2>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-yellow-gold1 hover:bg-yellow-gold text-green-ziti font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <FaPlus className="mr-2" /> Add Review
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="bg-green-ziti rounded-2xl shadow-lg p-4 text-gray-300"
          >
            <h3 className="text-xl font-bold text-yellow-gold1">{review.product}</h3>
            <p className="text-yellow-gold mb-1">{`Rating: ${review.rating} / 5`}</p>
            <p className="text-sm mb-3">{review.comment}</p>
            <div className="flex space-x-4">
              <button
                className="text-yellow-gold1 hover:text-yellow-400 p-2 rounded-full hover:bg-green-800 transition-colors duration-300"
                onClick={() => handleEdit(review, index)}
                aria-label={`Edit ${review.product}`}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-green-800 transition-colors duration-300"
                onClick={() => handleDelete(index)}
                aria-label={`Delete ${review.product}`}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-ziti p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold text-yellow-gold1 mb-4">
              {editingReview !== null ? "Edit Review" : "Add New Review"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">Product</label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                  required
                  min="1"
                  max="5"
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="w-full bg-green-800 border border-green-khzy rounded p-2 text-gray-200 h-24"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-gold1 hover:bg-yellow-gold text-green-ziti font-bold py-2 px-4 rounded"
                >
                  {editingReview !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
