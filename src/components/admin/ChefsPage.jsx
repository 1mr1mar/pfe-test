import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ChefsPage = () => {
  const [chefs, setChefs] = useState([
    {
      id: 1,
      name: "Chef Taha Oumane",
      title: "Executive Chef",
      image: "/pic/inner-pages-img-16.jpg",
      bio: "An expert in French cuisine with over 15 years of experience in crafting fine dining dishes.",
    },
    {
      id: 2,
      name: "Chef marwan Mansour",
      title: "Pastry Specialist",
      image: "/pic/Meet-the-chef-img.jpg",
      bio: "Passionate about elegant desserts and luxurious French mousses.",
    },
    {
      id: 3,
      name: "Chef Sami Youssef",
      title: "Sushi Chef",
      image: "/pic/inner-pages-img-17.jpg",
      bio: "Creates authentic Japanese sushi with a modern artistic twist.",
    },
  ]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [editingChef, setEditingChef] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    bio: "",
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

    // Create unique ID for new chef
    const newChef = {
      ...formData,
      id: editingChef !== null ? chefs[editingChef].id : Date.now(),
    };

    if (editingChef !== null) {
      // Update existing chef
      const updatedChefs = [...chefs];
      updatedChefs[editingChef] = newChef;
      setChefs(updatedChefs);
    } else {
      // Add new chef
      setChefs([...chefs, newChef]);
    }

    // Close modal and reset form
    setShowModal(false);
    setFormData({
      name: "",
      title: "",
      image: "",
      bio: "",
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-5xl text-center  pt-10 text-yellow-gold1 mb-6"
          style={{ fontFamily: "font1, sans-serif" }}
        >
          Chefs Management
        </h2>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-yellow-gold1 hover:bg-yellow-gold text-green-ziti font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <FaPlus className="mr-2" /> Add Chef
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chefs.map((chef, index) => (
          <div
            key={chef.id}
            className="bg-green-ziti rounded-2xl shadow-lg p-4 text-gray-300"
          >
            <div className="relative">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            </div>
            <h3 className="text-xl font-bold text-yellow-gold1">{chef.name}</h3>
            <p className="text-yellow-gold mb-1">{chef.title}</p>
            <p className="text-sm mb-3">{chef.bio}</p>
            <div className="flex space-x-4">
              <button
                className="text-yellow-gold1 hover:text-yellow-400 p-2 rounded-full hover:bg-green-800 transition-colors duration-300"
                onClick={() => handleEdit(chef, index)}
                aria-label={`Edit ${chef.name}`}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-green-800 transition-colors duration-300"
                onClick={() => handleDelete(index)}
                aria-label={`Delete ${chef.name}`}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Chef */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-ziti p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold text-yellow-gold1 mb-4">
              {editingChef !== null ? "Edit Chef" : "Add New Chef"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">
                  Image Path
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                  placeholder="/pic/image-name.jpg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
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
                  {editingChef !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefsPage;
