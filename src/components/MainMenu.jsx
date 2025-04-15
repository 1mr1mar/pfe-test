import React, { useState } from "react";
import { motion } from "framer-motion"; 
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import "../index.css";
import "../App.css";
import Svg from "./Landing/svgn2";
import { productsData } from "./data/products"; 
import { Link } from "react-router-dom";

const MainMenu = () => {
  // State for filters
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(30); // Default price value
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Filter products based on selected category, price, and search term
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter; // Category filter
    const matchesPrice = product.price <= priceFilter; // Price filter
    const matchesAvailability = product.available; // Product availability filter
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()); // Search term filter
    return (
      matchesCategory && matchesPrice && matchesAvailability && matchesSearch
    ); // Return products that match filters
  });

  return (
    <div className="relative min-h-screen bg-green-ziti text-yellow-gold">
      {/* Fixed gold lines */}
      <div className="fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      {/* Navbar */}
      <div className="z-10">
        <Navbar style={{ position: "absolute" }} />
      </div>

      <div className="flex z-40 relative flex-col items-center justify-center pt-50 pr-60 pl-60">
        {/* Animated Title */}
        <motion.h1
          className="text-5xl mt-10 flex z-20 gap-x-4 items-center md:text-6xl mb-6"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
        >
          <Svg />
          Our menu
          <Svg />
        </motion.h1>

        {/* Flexbox Layout for Products and Filters */}
        <div className="flex w-full">
          {/* Products section (left side) */}
          <div className="w-2/3 p-6">
            <div className="flex justify-between">
              <p>Pages 1/3</p>
              <div className="flex space-x-6 mb-8">
                <select className="bg-transparont  text-yellow-gold border-1 border-yellow-gold1  p-2 ">
                  <option value="">Stort by leatest</option>
                  <option value="">Stort by popuularety</option>
                  <option value="">stort by righting </option>
                  <option value="">stort by price</option>
                </select>
              </div>
            </div>

            {/* Display filtered products in a grid with two products per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-transparant items-center text-center w-[466px] p-4 shadow-md"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[466px] h-[466px] object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-lg text-yellow-gold">${product.price}</p>
                  {/*<button className="text-yellow-gold flex mx-auto px-6 py-3 border-1 border-yellow-gold text-lg font-medium transition duration-300 shadow-lg transform hover:scale-105 ">
                    add to cart
                  </button>*/}
                </div>
              ))}
            </div>
          </div>

          {/* Filter section (right side) */}
          <div className="w-1/3 p-6">
            <div className="">
              {/* Price filter using range input */}
              <div className="mb-8 w-full">
                <label className="block jdid text-2xl text-yellow-gold mb-2">
                  priceFilter{" "}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(Number(e.target.value))}
                  className="slider w-full h-2 bg-gray-300 rounded-lg"
                />
                <div className="mt-6 text-white flex justify-between">
                  <span>Min: $0</span>
                  <span>Max: ${priceFilter}</span>
                </div>
              </div>
              <h2 className="jdid text-2xl">Categories</h2>
              {/* Category filter */}
              <div className="flex space-x-6 mt-5 mb-8">
                <ul className="text-white cursor-pointer space-y-4 ">
                  <li
                    onClick={() => setCategoryFilter("All")}
                    className="relative group text-sm uppercase tracking-widest hover:text-yellow-gold transition-colors duration-300"
                  >
                    All
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
                    <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  </li>
                  <li
                    onClick={() => setCategoryFilter("Pizza")}
                    className="relative group text-sm uppercase tracking-widest hover:text-yellow-gold transition-colors duration-300"
                  >
                    Pizza
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
                    <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  </li>
                  <li
                    onClick={() => setCategoryFilter("Pasta")}
                    className="relative group text-sm uppercase tracking-widest hover:text-yellow-gold transition-colors duration-300"
                  >
                    Pasta
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
                    <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  </li>
                  <li
                    onClick={() => setCategoryFilter("Salad")}
                    className="relative group text-sm uppercase tracking-widest hover:text-yellow-gold transition-colors duration-300"
                  >
                    Salad
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
                    <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  </li>
                </ul>
              </div>
              {/* tags */}
              <div className="cursor-pointer space-y-3">
                <h2 className="jdid text-2xl">Tags</h2>
                <div className="text-white flex gap-1">
                  <p className=" hover:scale-110 hover:text-yellow-gold1">
                    Breakfast,
                  </p>
                  <p className=" hover:scale-110 hover:text-yellow-gold1">
                    Lunch,
                  </p>
                  <p className=" hover:scale-110 hover:text-yellow-gold1">
                    Dinner,
                  </p>
                </div>
                <div className="text-white flex gap-1">
                  <p className=" hover:scale-110 hover:text-yellow-gold1">
                    Cocktails ,
                  </p>
                  <p className=" hover:scale-110 hover:text-yellow-gold1">
                    Wine,,
                  </p>
                  <p className=" hover:scale-110 hover:text-yellow-gold1">
                    Beer,
                  </p>
                </div>
                <div className="text-white flex gap-1">
                  <p className=" hover:scale-110 hover:text-yellow-gold1">
                    BBQ ,
                  </p>
                  <p className=" hover:scale-110 hover:text-yellow-gold1">
                    swiit,,
                  </p>
                  <p className=" hover:scale-110 hover:text-yellow-gold1">
                    diser,
                  </p>
                </div>
              </div>

              {/* Search Form */}
              <form
                role="search"
                className="eltdf-searchform space-y-2 searchform mt-8  items-center"
                method="get"
                action="#"
              >
                <h2 className="screen-reader-text mb-5 jdid text-2xl">
                  Search for:
                </h2>
                <div className="input-holder flex items-center">
                  {" "}
                  {/* Apply flex to align input and button horizontally */}
                  <input
                    type="search"
                    className="border-1 border-yellow-gold1 search-field p-2"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    title="Search for:"
                  />
                  <button
                    type="submit"
                    className="border-1 border-yellow-gold1 eltdf-search-submit text-yellow-gold bg-transparent  flex justify-center items-center"
                  >
                    {/* SVG icon */}
                    <svg
                      className="fill-yellow-gold "
                      xmlns="http://www.w3.org/2000/svg"
                      x="100px"
                      y="0px"
                      width="40"
                      height="40"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 21 4 C 11.082241 4 3 12.082241 3 22 C 3 31.917759 11.082241 40 21 40 C 24.62177 40 27.99231 38.91393 30.820312 37.0625 L 43.378906 49.621094 L 47.621094 45.378906 L 35.224609 32.982422 C 37.581469 29.938384 39 26.13473 39 22 C 39 12.082241 30.917759 4 21 4 z M 21 8 C 28.756241 8 35 14.243759 35 22 C 35 29.756241 28.756241 36 21 36 C 13.243759 36 7 29.756241 7 22 C 7 14.243759 13.243759 8 21 8 z"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainMenu;
