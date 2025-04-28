import React, { useState, useEffect, useRef } from "react";
import { productsData } from "../data/products";
import {
  FaPlus,
  FaPencilAlt,
  FaTrash,
  FaSave,
  FaTimes,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

const AdminMenu = () => {
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [editProductId, setEditProductId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [animateDelete, setAnimateDelete] = useState(null);

  // Ref for add form animation
  const addFormRef = useRef(null);

  // Categories list from products data
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (filterCategory !== "All") {
      result = result.filter((p) => p.category === filterCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
  }, [products, filterCategory, searchTerm]);

  // For the add form animation
  useEffect(() => {
    if (showAddForm && addFormRef.current) {
      addFormRef.current.classList.remove("opacity-0", "scale-95");
      addFormRef.current.classList.add("opacity-100", "scale-100");
    }
  }, [showAddForm]);

  const validateForm = (product) => {
    const errors = {};

    if (!product.name.trim()) errors.name = "Name is required";
    if (!product.category) errors.category = "Category is required";
    if (!product.price) errors.price = "Price is required";
    else if (isNaN(product.price) || Number(product.price) <= 0)
      errors.price = "Price must be a positive number";
    if (!product.description.trim())
      errors.description = "Description is required";

    return errors;
  };

  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editProductId ? { ...p, image: reader.result } : p
          )
        );
      } else {
        setNewProduct({ ...newProduct, image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    const errors = validateForm(newProduct);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const productToAdd = {
      ...newProduct,
      id: newId,
      price: Number(newProduct.price).toFixed(2),
    };

    setProducts([...products, productToAdd]);

    // Reset form
    setNewProduct({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });
    setFormErrors({});

    // Animate form closure
    if (addFormRef.current) {
      addFormRef.current.classList.remove("opacity-100", "scale-100");
      addFormRef.current.classList.add("opacity-0", "scale-95");
      setTimeout(() => setShowAddForm(false), 300);
    } else {
      setShowAddForm(false);
    }
  };

  const handleUpdateProduct = (id) => {
    const productToUpdate = products.find((p) => p.id === id);
    const errors = validateForm(productToUpdate);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, price: Number(p.price).toFixed(2) } : p
      )
    );
    setEditProductId(null);
    setFormErrors({});
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Start delete animation
      setAnimateDelete(id);

      // Actual deletion after animation completes
      setTimeout(() => {
        setProducts(products.filter((p) => p.id !== id));
        setAnimateDelete(null);
      }, 500);
    }
  };

  const toggleAddForm = () => {
    if (showAddForm) {
      // Animate closing
      if (addFormRef.current) {
        addFormRef.current.classList.remove("opacity-100", "scale-100");
        addFormRef.current.classList.add("opacity-0", "scale-95");
        setTimeout(() => setShowAddForm(false), 300);
      } else {
        setShowAddForm(false);
      }
    } else {
      setShowAddForm(true);
    }
  };

  // Form component to reduce duplication
  const ProductForm = ({ product, isEdit, onChange, onFileChange }) => (
    <div className="max-w-md mx-auto p-6 bg-green-ziti rounded-lg shadow-lg">
      {" "}
      <div className="mb-2">
        <input
          type="text"
          placeholder="Name"
          value={product.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={`w-full p-2 bg-transparent text-white border ${
            formErrors.name ? "border-red-500" : "border-yellow-gold"
          } rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent`}
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm mt-1 animate-fadeIn">
            {formErrors.name}
          </p>
        )}
      </div>
      <div className="mb-2">
        <select
          value={product.category}
          onChange={(e) => onChange("category", e.target.value)}
          className={`w-full p-2 bg-transparent text-yellow-gold border ${
            formErrors.category ? "border-red-500" : "border-yellow-gold"
          } rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent`}
        >
          <option value="">Select Category</option>
          {categories
            .filter((c) => c !== "All")
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
        {formErrors.category && (
          <p className="text-red-500 text-sm mt-1 animate-fadeIn">
            {formErrors.category}
          </p>
        )}
      </div>
      <div className="mb-2">
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Price"
          value={product.price}
          onChange={(e) => onChange("price", e.target.value)}
          className={`w-full p-2 bg-transparent text-white border ${
            formErrors.price ? "border-red-500" : "border-yellow-gold"
          } rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent`}
        />
        {formErrors.price && (
          <p className="text-red-500 text-sm mt-1 animate-fadeIn">
            {formErrors.price}
          </p>
        )}
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => onChange("description", e.target.value)}
          className={`w-full p-2 bg-transparent text-white border ${
            formErrors.description ? "border-red-500" : "border-yellow-gold"
          } rounded h-20 transition-all duration-200 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent`}
        />
        {formErrors.description && (
          <p className="text-red-500 text-sm mt-1 animate-fadeIn">
            {formErrors.description}
          </p>
        )}
      </div>
      <div className="mb-2">
        <label className="block text-yellow-gold mb-1">Product Image</label>
        <input
          type="file"
          onChange={onFileChange}
          className="w-full border border-yellow-gold rounded p-2 text-white transition-all duration-200 hover:bg-green-800"
          accept="image/jpeg, image/png, image/gif"
        />
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-green-khzy">
      {/* Header with Floating Effect */}
      <h1
        className="text-3xl text-yellow-gold1 mb-6 font-bold relative inline-block hover:scale-105 transition-transform duration-300"
        style={{ fontFamily: "font1, sans-serif" }}
      >
        Menu Management
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-gold1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-left"></span>
      </h1>

      {/* Controls Section with Animations */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 transition-all duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Search Input with Animation */}
          <div className="relative group w-full md:w-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSearch className="text-yellow-gold1 group-hover:text-yellow-500 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 p-2 bg-transparent text-white border border-yellow-gold rounded w-full transition-all duration-300 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent hover:border-yellow-500"
            />
          </div>

          {/* Category Filter with Animation */}
          <div className="relative group w-full md:w-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaFilter className="text-yellow-gold1 group-hover:text-yellow-500 transition-colors duration-300" />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 p-2 bg-transparent text-yellow-gold border border-yellow-gold rounded w-full transition-all duration-300 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent hover:border-yellow-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Add Product Button with Animation */}
          <button
            onClick={toggleAddForm}
            className="flex items-center justify-center bg-yellow-gold1 text-green-ziti px-4 py-2 rounded-md transform hover:scale-105 hover:bg-yellow-500 transition-all duration-300 shadow hover:shadow-lg"
          >
            <FaPlus
              className={`mr-2 transition-transform duration-300 ${
                showAddForm ? "rotate-45" : "rotate-0"
              }`}
            />
            {showAddForm ? "Cancel" : "Add Product"}
          </button>
        </div>
      </div>

      {/* Add Product Form with Animation */}
      {showAddForm && (
        <div
          ref={addFormRef}
          className="bg-green-ziti border border-yellow-gold1 p-4 rounded-lg shadow-lg mb-6 transform opacity-0 scale-95 transition-all duration-300 ease-out"
        >
          <h2 className="text-xl text-yellow-gold1 mb-4 font-bold flex items-center">
            <FaPlus className="mr-2 animate-pulse" /> Add New Product
          </h2>

          <ProductForm
            product={newProduct}
            isEdit={false}
            onChange={(field, value) =>
              setNewProduct({ ...newProduct, [field]: value })
            }
            onFileChange={handleImageChange}
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                if (addFormRef.current) {
                  addFormRef.current.classList.remove(
                    "opacity-100",
                    "scale-100"
                  );
                  addFormRef.current.classList.add("opacity-0", "scale-95");
                  setTimeout(() => {
                    setShowAddForm(false);
                    setFormErrors({});
                  }, 300);
                } else {
                  setShowAddForm(false);
                  setFormErrors({});
                }
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
            <button
              onClick={handleAddProduct}
              className="bg-yellow-gold1 text-green-ziti px-4 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <FaSave className="mr-2" /> Add Product
            </button>
          </div>
        </div>
      )}

      {/* Products Grid with Animations */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`h-full flex flex-col justify-between bg-green-ziti border border-yellow-gold1 p-4 rounded-lg shadow-lg transition-all duration-500 transform hover:shadow-2xl 
              hover:scale-[1.02] ${
                animateDelete === product.id
                  ? "scale-0 opacity-0 rotate-12"
                  : "scale-100 opacity-100 rotate-0 hover:scale-[1.02]"
              }`}
            >
              {editProductId === product.id ? (
                <>
                  <h3 className="text-xl text-yellow-gold1 mb-4 font-bold flex items-center">
                    <FaPencilAlt className="mr-2 animate-bounce" /> Edit Product
                  </h3>

                  <ProductForm
                    product={product}
                    isEdit={true}
                    onChange={(field, value) => {
                      setProducts((prev) =>
                        prev.map((p) =>
                          p.id === product.id ? { ...p, [field]: value } : p
                        )
                      );
                    }}
                    onFileChange={(e) => handleImageChange(e, true)}
                  />

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => {
                        setEditProductId(null);
                        setFormErrors({});
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateProduct(product.id)}
                      className="bg-yellow-gold1 text-green-ziti px-4 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                      <FaSave className="mr-2" /> Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl text-yellow-gold1 font-bold group-hover:text-yellow-500 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-yellow-gold1 font-bold text-lg transition-all duration-300 hover:scale-110">
                      ${parseFloat(product.price).toFixed(2)}
                    </p>
                  </div>

                  {product.image && (
                    <div className="overflow-hidden rounded my-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-100 object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  )}

                  <p className="text-gray-300 mb-4">{product.description}</p>

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditProductId(product.id)}
                      className="bg-yellow-gold1 text-green-ziti px-3 py-1 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110 flex items-center"
                    >
                      <FaPencilAlt className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-110 flex items-center"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-green-ziti p-8 rounded-lg text-center transform transition-all duration-500 hover:shadow-2xl">
          <p className="text-yellow-gold1 text-xl animate-pulse">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
