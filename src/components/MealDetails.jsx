import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import { motion } from "framer-motion"; 
import Cartsvg from "./Cartsvg";

const MealDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        setLoading(true);
        console.log('Fetching meal with ID:', id); // Debug log
        
        const response = await axios.get(`http://localhost:5000/api/meals/${id}`);
        console.log('API Response:', response.data); // Debug log
        
        if (!response.data) {
          throw new Error('No data received from the server');
        }
        
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error("Detailed error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          // The request was made but no response was received
          setError('No response from server. Please check if the server is running.');
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!id) {
      setError('No meal ID provided');
      setLoading(false);
      return;
    }

    fetchMealData();

    // Load cart from localStorage if available
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity,
        note: note || updatedCart[existingItemIndex].note
      };
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`Updated quantity of ${product.name} in your cart!`);
    } else {
      // Item doesn't exist, add new item
      const newProduct = { ...product, quantity, note };
      const updatedCart = [...cart, newProduct];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${product.name} has been added to your cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-ziti flex items-center justify-center">
        <div className="text-yellow-gold text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-ziti flex items-center justify-center">
        <div className="text-yellow-gold text-2xl">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-green-ziti flex items-center justify-center">
        <div className="text-yellow-gold text-2xl">Meal not found</div>
      </div>
    );
  }

  return (
    <div className="bg-green-ziti pt-45 text-yellow-gold min-h-screen">
      <div className="z-10 flex justify-between items-center pt-4 px-8">
        <Link to="/cart">
          <div className="cursor-pointer z-50001 fixed top-4 right-4 flex items-center space-x-2">
            <Cartsvg className="w-12 h-12 text-yellow-gold cursor-pointer hover:scale-110 transition-transform duration-300" />
            <span className="text-yellow-gold">Cart</span>
          </div>
        </Link>
      </div>
      <div className="fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>

      <Navbar />
      <div className="container pb-50 items-center mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl text-center items-center mb-4"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {product.name}
        </motion.h1>
        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={`/pic/${product.pic}`}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/pic/default-meal.jpg'; // Add a default image
              }}
            />
          </motion.div>

          <div className="w-full md:w-1/2">
            <motion.p
              className="text-2xl text-yellow-gold my-4 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              ${product.price}
            </motion.p>

            <p className="text-lg mb-6">{product.description}</p>
            
            <div className="space-y-4 my-6">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Rating:</span>
                <span>{product.rating} / 5</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Category:</span>
                <span>{product.category_name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Popularity:</span>
                <span>{product.popularity}</span>
              </div>
            </div>

            <div className="my-6">
              <h2 className="text-2xl font-semibold mb-4">
                Customize your meal
              </h2>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div>
                  <label className="block mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="border-2 border-yellow-gold bg-transparent p-2 w-20 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    Add special requests or notes
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Any special requests?"
                    className="border-2 border-yellow-gold bg-transparent p-2 w-full h-24 rounded"
                  />
                </div>
              </motion.div>
            </div>

            <motion.button
              onClick={handleAddToCart}
              className="bg-yellow-gold text-green-ziti p-4 rounded-lg mt-4 hover:bg-yellow-gold1 transition-colors duration-300 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>

            <div className="mt-4 text-center">
              <Link
                to="/menu"
                className="text-yellow-gold border-2 border-yellow-gold hover:bg-yellow-gold1 p-2 hover:text-green-ziti rounded inline-block"
              >
                Back to menu
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MealDetails;
