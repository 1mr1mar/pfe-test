import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const SittingsPage = () => {
  const [sittings, setSittings] = useState([
    { id: 1, tableNumber: 1, seats: 4, status: "available", reservedTime: "" },
    { id: 2, tableNumber: 2, seats: 2, status: "occupied", reservedTime: "2025-04-27 18:00" },
    { id: 3, tableNumber: 3, seats: 6, status: "available", reservedTime: "" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingSitting, setEditingSitting] = useState(null);
  const [formData, setFormData] = useState({
    tableNumber: "",
    seats: "",
    status: "",
    reservedTime: "",
  });

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this sitting?")) {
      const newSittings = [...sittings];
      newSittings.splice(index, 1);
      setSittings(newSittings);
    }
  };

  const handleEdit = (sitting, index) => {
    setEditingSitting(index);
    setFormData({ ...sitting });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingSitting(null);
    setFormData({
      tableNumber: "",
      seats: "",
      status: "available",
      reservedTime: "",
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

    const newSitting = {
      ...formData,
      id: editingSitting !== null ? sittings[editingSitting].id : Date.now(),
    };

    if (editingSitting !== null) {
      const updatedSittings = [...sittings];
      updatedSittings[editingSitting] = newSitting;
      setSittings(updatedSittings);
    } else {
      setSittings([...sittings, newSitting]);
    }

    setShowModal(false);
    setFormData({
      tableNumber: "",
      seats: "",
      status: "available",
      reservedTime: "",
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-5xl text-center pt-10 text-yellow-gold1 mb-6"
          style={{ fontFamily: "font1, sans-serif" }}
        >
          Table Management
        </h2>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-yellow-gold1 hover:bg-yellow-gold text-green-ziti font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <FaPlus className="mr-2" /> Add Sitting
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sittings.map((sitting, index) => (
          <div
            key={sitting.id}
            className="bg-green-ziti rounded-2xl shadow-lg p-4 text-gray-300"
          >
            <h3 className="text-xl font-bold text-yellow-gold1">Table {sitting.tableNumber}</h3>
            <p className="text-yellow-gold mb-1">{`Seats: ${sitting.seats}`}</p>
            <p className="text-sm mb-3">{`Status: ${sitting.status}`}</p>
            {sitting.status === "occupied" && (
              <p className="text-yellow-gold mb-3">{`Reserved for: ${sitting.reservedTime}`}</p>
            )}
            <div className="flex space-x-4">
              <button
                className="text-yellow-gold1 hover:text-yellow-400 p-2 rounded-full hover:bg-green-800 transition-colors duration-300"
                onClick={() => handleEdit(sitting, index)}
                aria-label={`Edit Table ${sitting.tableNumber}`}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-green-800 transition-colors duration-300"
                onClick={() => handleDelete(index)}
                aria-label={`Delete Table ${sitting.tableNumber}`}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-ziti p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold text-yellow-gold1 mb-4">
              {editingSitting !== null ? "Edit Sitting" : "Add New Sitting"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">Table Number</label>
                <input
                  type="number"
                  name="tableNumber"
                  value={formData.tableNumber}
                  onChange={handleInputChange}
                  className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">Seats</label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-gold1 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                  required
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                </select>
              </div>
              {formData.status === "occupied" && (
                <div className="mb-4">
                  <label className="block text-yellow-gold1 mb-2">Reserved Time</label>
                  <input
                    type="datetime-local"
                    name="reservedTime"
                    value={formData.reservedTime}
                    onChange={handleInputChange}
                    className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                    required
                  />
                </div>
              )}
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
                  {editingSitting !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SittingsPage;
