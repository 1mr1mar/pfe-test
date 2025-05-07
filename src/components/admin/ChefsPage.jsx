import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSort, FaFilter, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ChefsPage = () => {
  const [chefs, setChefs] = useState([
    {
      id: 1,
      name: "Chef Taha Oumane",
      title: "Executive Chef",
      image: "/pic/inner-pages-img-16.jpg",
      bio: "An expert in French cuisine with over 15 years of experience in crafting fine dining dishes.",
      specialties: ["French Cuisine", "Fine Dining"],
      experience: "15+ years",
      testimonials: [
        {
          id: 1,
          customer: "Sarah Johnson",
          rating: 5,
          comment: "Chef Taha's French cuisine is absolutely divine! The attention to detail is remarkable."
        },
        {
          id: 2,
          customer: "Michael Chen",
          rating: 5,
          comment: "An unforgettable dining experience. The flavors were perfectly balanced."
        }
      ]
    },
    {
      id: 2,
      name: "Chef marwan Mansour",
      title: "Pastry Specialist",
      image: "/pic/Meet-the-chef-img.jpg",
      bio: "Passionate about elegant desserts and luxurious French mousses.",
      specialties: ["Pastry", "Desserts"],
      experience: "10+ years",
      testimonials: [
        {
          id: 1,
          customer: "Emma Davis",
          rating: 5,
          comment: "The desserts are works of art! Each bite is a heavenly experience."
        },
        {
          id: 2,
          customer: "James Wilson",
          rating: 5,
          comment: "Chef Marwan's pastries are simply magical. The chocolate mousse is to die for!"
        }
      ]
    },
    {
      id: 3,
      name: "Chef Sami Youssef",
      title: "Sushi Chef",
      image: "/pic/inner-pages-img-17.jpg",
      bio: "Creates authentic Japanese sushi with a modern artistic twist.",
      specialties: ["Japanese Cuisine", "Sushi"],
      experience: "12+ years",
      testimonials: [
        {
          id: 1,
          customer: "Lisa Tanaka",
          rating: 5,
          comment: "The most authentic Japanese flavors I've experienced outside of Japan!"
        },
        {
          id: 2,
          customer: "David Kim",
          rating: 5,
          comment: "Chef Sami's sushi is a perfect blend of tradition and innovation."
        }
      ]
    },
  ]);

  // Enhanced state management
  const [showModal, setShowModal] = useState(false);
  const [editingChef, setEditingChef] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    bio: "",
    specialties: "",
    experience: "",
  });
  const [expandedChef, setExpandedChef] = useState(null);

  // Filter and sort chefs
  const filteredAndSortedChefs = chefs
    .filter((chef) => {
      const matchesSearch = chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chef.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || chef.specialties.includes(filterBy);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "experience") return b.experience.localeCompare(a.experience);
      return 0;
    });

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this chef?")) {
      const newChefs = [...chefs];
      newChefs.splice(index, 1);
      setChefs(newChefs);
    }
  };

  const handleEdit = (chef, index) => {
    setEditingChef(index);
    setFormData({ ...chef });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingChef(null);
    setFormData({
      name: "",
      title: "",
      image: "",
      bio: "",
      specialties: "",
      experience: "",
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newChef = {
        ...formData,
        id: editingChef !== null ? chefs[editingChef].id : Date.now(),
        specialties: formData.specialties.split(",").map(s => s.trim()),
      };

      if (editingChef !== null) {
        const updatedChefs = [...chefs];
        updatedChefs[editingChef] = newChef;
        setChefs(updatedChefs);
      } else {
        setChefs([...chefs, newChef]);
      }

      setShowModal(false);
      setFormData({
        name: "",
        title: "",
        image: "",
        bio: "",
        specialties: "",
        experience: "",
      });
    } catch (error) {
      console.error("Error saving chef:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-green-khzy">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-5xl text-center pt-10 text-yellow-gold1 mb-6 font-serif">
            Chefs Management
          </h2>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search chefs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-green-ziti text-gray-200 px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-gold1"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-green-ziti text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-gold1"
            >
              <option value="name">Sort by Name</option>
              <option value="experience">Sort by Experience</option>
            </select>
            <button
              onClick={handleAddNew}
              className="flex items-center bg-yellow-gold1 hover:bg-yellow-gold text-green-ziti font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaPlus className="mr-2" /> Add Chef
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredAndSortedChefs.map((chef, index) => (
              <motion.div
                key={chef.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-green-ziti rounded-2xl shadow-xl p-6 text-gray-200 transform transition-all duration-300 hover:scale-105"
              >
                <div 
                  className="cursor-pointer"
                  onClick={() => setExpandedChef(expandedChef === chef.id ? null : chef.id)}
                >
                  <div className="relative group">
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-full h-170 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-yellow-gold1 mb-2">{chef.name}</h3>
                    <button className="text-yellow-gold1 hover:text-yellow-gold transition-colors duration-300">
                      {expandedChef === chef.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  <p className="text-yellow-gold mb-2">{chef.title}</p>
                  <p className="text-sm mb-3">{chef.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {chef.specialties.map((specialty, i) => (
                      <span key={i} className="bg-green-khzy text-yellow-gold1 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 mb-4">Experience: {chef.experience}</p>
                </div>

                {/* Testimonials Section */}
                <AnimatePresence>
                  {expandedChef === chef.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 border-t border-green-khzy pt-4">
                        <h4 className="text-lg font-semibold mb-3 text-yellow-gold1">Customer Reviews</h4>
                        <div className="space-y-4">
                          {chef.testimonials.map((testimonial) => (
                            <motion.div
                              key={testimonial.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="bg-green-khzy p-4 rounded-lg"
                            >
                              <div className="flex items-center mb-2">
                                <div className="flex text-yellow-gold1">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                  ))}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-200">
                                  {testimonial.customer}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300">{testimonial.comment}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex space-x-4 mt-6">
                  <button
                    className="text-yellow-gold1 hover:text-yellow-gold p-2 rounded-full hover:bg-green-khzy transition-all duration-300 transform hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(chef, index);
                    }}
                    aria-label={`Edit ${chef.name}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-green-khzy transition-all duration-300 transform hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                    aria-label={`Delete ${chef.name}`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Enhanced Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-green-ziti p-8 rounded-2xl shadow-2xl w-full max-w-2xl"
            >
              <h3 className="text-2xl font-bold text-yellow-gold1 mb-6">
                {editingChef !== null ? "Edit Chef" : "Add New Chef"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                      placeholder="e.g., 10+ years"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Specialties</label>
                    <input
                      type="text"
                      name="specialties"
                      value={formData.specialties}
                      onChange={handleInputChange}
                      className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                      placeholder="e.g., French Cuisine, Pastry"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-yellow-gold1 mb-2">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-yellow-gold1 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 h-32 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-green-khzy hover:bg-green-800 text-gray-200 py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-yellow-gold1 hover:bg-yellow-gold text-green-ziti font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : editingChef !== null ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChefsPage;
