import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import "../index.css";
import "../App.css";
import Svg from "./Landing/svgn2";
import { productsData } from "./data/products";
import { Link } from "react-router-dom";
import Cartsvg from "./cartsvg.jsx";

const MainMenu = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    const matchesPrice = product.price <= priceFilter;
    const matchesAvailability = product.available;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return (
      matchesCategory && matchesPrice && matchesAvailability && matchesSearch
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price":
        return a.price - b.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "popularity":
        return (b.popularity || 0) - (a.popularity || 0);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative min-h-screen bg-green-ziti text-yellow-gold">
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
      <div className="absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      <div className="z-10">
        <Navbar style={{ position: "absolute" }} />
      </div>

      <div className="flex z-40 relative flex-col items-center justify-center pt-50 pr-60 pl-60">
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

        <div className="flex w-full">
          <div className="w-2/3 p-6">
            <div className="flex justify-between">
              <p>
                Page {currentPage} / {totalPages}
              </p>
              <div className="flex space-x-6 mb-8">
                <select
                  className="bg-transparent text-yellow-gold border-1 border-yellow-gold1 p-2"
                  onChange={(e) => setSortOption(e.target.value)}
                  value={sortOption}
                >
                  <option value="latest">Sort by latest</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by rating</option>
                  <option value="price">Sort by price</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-transparent items-center text-center w-[466px] p-4 shadow-md"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[466px] h-[466px] object-cover mb-4 hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-lg text-yellow-gold">${product.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-yellow-gold1 text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 border border-yellow-gold1 ${
                    currentPage === i + 1
                      ? "bg-yellow-gold text-green-ziti"
                      : "text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-yellow-gold1 text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="w-1/3 p-6">
            <div className="mb-8 w-full">
              <label className="block jdid text-2xl text-yellow-gold mb-2">
                Price
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
            <div className="flex space-x-6 mt-5 mb-8">
              <ul className="text-white cursor-pointer space-y-4">
                {["All", "Pizza", "Pasta", "Salad"].map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`relative group text-sm uppercase tracking-widest transition-colors duration-300 ${
                      categoryFilter === cat
                        ? "text-yellow-gold1 font-bold"
                        : "hover:text-yellow-gold"
                    }`}
                  >
                    {cat}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cursor-pointer space-y-3">
              <h2 className="jdid text-2xl">Tags</h2>
              <div className="text-white flex gap-1 flex-wrap">
                {[
                  "Breakfast",
                  "Lunch",
                  "Dinner",
                  "Cocktails",
                  "Wine",
                  "Beer",
                  "BBQ",
                  "swiit",
                  "diser",
                ].map((tag) => (
                  <p
                    key={tag}
                    className="hover:scale-110 hover:text-yellow-gold1"
                  >
                    {tag},
                  </p>
                ))}
              </div>
            </div>

            <form
              className="eltdf-searchform space-y-2 searchform mt-8 items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <h2 className="screen-reader-text mb-5 jdid text-2xl">
                Search for:
              </h2>
              <div className="input-holder flex items-center">
                <input
                  type="search"
                  className="border-1 border-yellow-gold1 search-field p-2"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="border-1 border-yellow-gold1 eltdf-search-submit text-yellow-gold bg-transparent"
                >
                  <svg
                    className="fill-yellow-gold"
                    xmlns="http://www.w3.org/2000/svg"
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
      <Footer />
    </div>
  );
};

export default MainMenu;
