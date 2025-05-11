import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cartsvg from "./cartsvg";

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
  if (newQuantity < 1) return cart;
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
  const [isRemoving, setIsRemoving] = useState(null);

  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    setIsRemoving(productId);
    setTimeout(() => {
      const updatedCart = removeItemFromCart(cart, productId);
      setCart(updatedCart);
      setIsRemoving(null);
    }, 300);
  };

  const handleQuantityChange = (productId, newQuantity) => {
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
          className="text-4xl text-center mb-8"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Cart
        </motion.h1>

        {cart.length === 0 ? (
          <motion.div 
            className="text-center text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4">Your cart is empty.</p>
            <Link
              to="/menu"
              className="inline-block bg-yellow-gold text-green-ziti px-6 py-3 rounded-lg hover:bg-yellow-gold1 transition-all duration-300 transform hover:scale-105"
            >
              Browse Menu
            </Link>
          </motion.div>
        ) : (
          <div className="cart-items space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  className={`cart-item bg-green-ziti border-2 border-yellow-gold rounded-lg p-6 shadow-lg ${
                    isRemoving === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-6">
                    <motion.img
                      src={`/pic/${item.pic}`}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                      <p className="text-xl mb-4">${item.price}</p>

                      <div className="flex items-center space-x-4 mb-4">
                        <label className="font-semibold">Quantity:</label>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="bg-yellow-gold text-green-ziti w-8 h-8 rounded-full hover:bg-yellow-gold1 transition-colors duration-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                            className="w-16 text-center bg-transparent border-2 border-yellow-gold rounded-lg p-1"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="bg-yellow-gold text-green-ziti w-8 h-8 rounded-full hover:bg-yellow-gold1 transition-colors duration-300"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {item.note?.trim() && (
                        <div className="mb-4">
                          <p className="italic text-yellow-gold1">Note: {item.note}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {cart.length > 0 && (
          <motion.div 
            className="cart-summary mt-8 p-6 bg-green-ziti border-2 border-yellow-gold rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Total Amount:</h3>
              <p className="text-2xl font-bold">${calculateTotal(cart)}</p>
            </div>
            
            <div className="flex justify-between space-x-4">
              <Link
                to="/menu"
                className="flex-1 bg-green-ziti text-yellow-gold border-2 border-yellow-gold p-4 rounded-lg text-center hover:bg-yellow-gold hover:text-green-ziti transition-all duration-300"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="flex-1 bg-yellow-gold text-green-ziti p-4 rounded-lg text-center hover:bg-yellow-gold1 transition-all duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
