import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ChefsPage = () => {
  const [chefs, setChefs] = useState([
    {
      name: "Chef Ahmed Khaled",
      title: "Executive Chef",
      image: "/pic/inner-pages-img-16.jpg",
      bio: "An expert in French cuisine with over 15 years of experience in crafting fine dining dishes.",
    },
    {
      name: "Chef marwan Mansour",
      title: "Pastry Specialist",
      image: "/pic/Meet-the-chef-img.jpg",
      bio: "Passionate about elegant desserts and luxurious French mousses.",
    },
    {
      name: "Chef Sami Youssef",
      title: "Sushi Chef",
      image: "/pic/inner-pages-img-17.jpg",
      bio: "Creates authentic Japanese sushi with a modern artistic twist.",
    },
  ]);

  const handleDelete = (index) => {
    const newChefs = [...chefs];
    newChefs.splice(index, 1);
    setChefs(newChefs);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-yellow-gold1">Chefs Management</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chefs.map((chef, index) => (
          <div key={index} className="bg-green-ziti rounded-2xl shadow-lg p-4 text-gray-300">
            <img
              src={chef.image}
              alt={chef.name}
              className="w-full h-150 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-yellow-gold1">{chef.name}</h3>
            <p className="text-yellow-gold mb-1">{chef.title}</p>
            <p className="text-sm mb-3">{chef.bio}</p>
            <div className="flex space-x-4">
              <button className="text-yellow-gold hover:text-yellow-400">
                <FaEdit />
              </button>
              <button
                className="text-red-400 hover:text-red-600"
                onClick={() => handleDelete(index)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefsPage;
