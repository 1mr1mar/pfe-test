import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cartsvg from "./Cartsvg"; 

// Utility Functions to Manage Cart Logic
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCartFromLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return Array.isArray(cart) ? cart : [];
};

const removeItemFromCart = (cart, productId) => {
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
};

const updateItemQuantity = (cart, productId, newQuantity) => {
  const updatedCart = cart.map(item => 
    item.id === productId ? { ...item, quantity: newQuantity } : item
  );
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
};

const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};

// CartPage Component
const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = removeItemFromCart(cart, productId);
    setCart(updatedCart);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    const updatedCart = updateItemQuantity(cart, productId, newQuantity);
    setCart(updatedCart);
  };

  if (!Array.isArray(cart)) {
    return <div>Your cart is not properly initialized.</div>;
  }

  return (
    <div className="cart-container bg-green-ziti pt-45 text-yellow-gold min-h-screen">
      <div className="fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>

      <div className="container pb-50 items-center mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl text-center mb-4"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Your Cart
        </motion.h1>

        {cart.length === 0 ? (
          <div className="text-center text-xl">
            Your cart is empty. <br />
            <Link
              to="/menu"
              className="text-yellow-gold border-1 border-yellow-gold hover:bg-yellow-gold1 p-2 hover:text-green-ziti underline mt-4"
            >
              Back to menu
            </Link>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item flex items-center space-x-8 mb-6">
                <motion.img
                  src={`/pic/${item.pic}`}
                  alt={item.name}
                  className="w-1/4 h-auto object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  whileHover={{ scale: 1.05 }}
                />
                <div className="w-3/4">
                  <h3 className="text-2xl">{item.name}</h3>
                  <p className="text-xl">${item.price}</p>

                  <div className="my-4">
                    <label className="font-semibold">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      className="border-1 border-yellow-gold1 p-2 w-20"
                    />
                  </div>

                  {/* Show Special Note if it exists */}
                  {item.note?.trim() && (
                    <div className="my-2">
                      <p className="italic text-yellow-gold1">Special Note: {item.note}</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 my-4">
                    <p>Total: ${item.price * item.quantity}</p>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="cart-total mt-8 text-xl text-right">
            <h3>Total: ${calculateTotal(cart)}</h3>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="bg-yellow-gold text-green-ziti p-4 rounded-lg mt-4 hover:bg-yellow-gold1 transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6">
            <Link
              to="/menu"
              className="bg-green-ziti text-yellow-gold p-4 rounded-lg mt-4 hover:bg-green-600 transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
