import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import { motion } from "framer-motion";

const CartPage = () => {
  const [cart, setCart] = useState([]); 
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(""); 

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const calculateTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(calculateTotal);
  }, [cart]);

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  };

  const handlePaymentSubmit = () => {
    alert(`You have chosen ${paymentMethod} as your payment method. Proceeding with payment...`);
    
  };

  if (cart.length === 0) {
    return (
      <div className="bg-green-khzy min-h-screen pt-45 text-yellow-gold">
        <Navbar />
        <div className="container text-center py-8">
          <h2 className="text-4xl">Your Cart is Empty</h2>
          <Link to="/menu" className="text-yellow-gold underline mt-4">
            Back to Menu
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-green-khzy min-h-screen pt-45 text-yellow-gold">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl mb-4 text-center"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Your Cart
        </motion.h1>
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                <div>
                  <h3 className="text-xl">{item.name}</h3>
                  <p>${item.price}</p>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                  <p className="text-sm text-gray-500">Special note: {item.note}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                  className="border p-2 w-16 text-center"
                />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <motion.div
            className="text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Total: ${total.toFixed(2)}
          </motion.div>

          <div className="flex space-x-4">
            <Link
              to="/menu"
              className="bg-yellow-gold text-green-ziti p-4 rounded-lg hover:bg-yellow-gold1 transition-colors duration-300"
            >
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="bg-green-ziti text-yellow-gold p-4 rounded-lg hover:bg-green-khzy transition-colors duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Choose Payment Method</h2>
          <div className="space-x-4 mt-4">
            <button
              onClick={() => setPaymentMethod("Credit Card")}
              className={`p-2 px-4 border rounded-lg ${paymentMethod === "Credit Card" ? "bg-yellow-gold text-green-ziti" : "bg-transparent"}`}
            >
              Credit Card
            </button>
            <button
              onClick={() => setPaymentMethod("Cash on Delivery")}
              className={`p-2 px-4 border rounded-lg ${paymentMethod === "Cash on Delivery" ? "bg-yellow-gold text-green-ziti" : "bg-transparent"}`}
            >
              Cash on Delivery
            </button>
            <button
              onClick={() => setPaymentMethod("PayPal")}
              className={`p-2 px-4 border rounded-lg ${paymentMethod === "PayPal" ? "bg-yellow-gold text-green-ziti" : "bg-transparent"}`}
            >
              PayPal
            </button>
          </div>

          <motion.button
            onClick={handlePaymentSubmit}
            className="bg-green-ziti text-yellow-gold p-4 rounded-lg mt-6 hover:bg-green-khzy transition-colors duration-300"
          >
            Confirm Payment
          </motion.button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
