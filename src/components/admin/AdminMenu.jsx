import React, { useState } from "react";
import { productsData } from "../data/products"; // Corrected import to use named export

const AdminMenu = () => {
  const [products, setProducts] = useState(productsData);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "", // Add an image property
  });
  const [editProduct, setEditProduct] = useState(null);

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  // Add new product
  const handleAddProduct = () => {
    const newId = products.length + 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setNewProduct({ name: "", category: "", price: "", description: "", image: "" });
  };

  // Update product
  const handleUpdateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === editProduct.id ? editProduct : product
      )
    );
    setEditProduct(null);
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6 bg-green-khzy">
      <h1 className="text-3xl text-yellow-gold1  mb-6" style={{ fontFamily: "font1, sans-serif" }}>Menu Management</h1>

      {/* Add New Product */}
      <div className="mb-6">
        <h2 className="text-2xl text-yellow-gold1 mb-4 jdid">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="p-2 border border-yellow-gold  mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="p-2 border border-yellow-gold mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="p-2 border border-yellow-gold mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="p-2 border border-yellow-gold mb-2 w-full"
        />
        {/* Image Upload */}
        <input
          type="file"
          onChange={handleImageChange}
          className="p-2 border border-yellow-gold mb-2 w-full"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-khzy border border-yellow-gold text-yellow-gold px-4 py-2 mt-4 hover:bg-yellow-gold hover:text-green-ziti hover:font-bold"
        >
          Add Product
        </button>
      </div> 

      {/* Edit Product */}
      {editProduct && (
        <div className="mb-6">
          <h2 className="text-2xl text-yellow-gold1 mb-4">Edit Product</h2>
          <input
            type="text"
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
            className="p-2 border border-yellow-gold mb-2 w-full"
          />
          <input
            type="text"
            value={editProduct.category}
            onChange={(e) =>
              setEditProduct({ ...editProduct, category: e.target.value })
            }
            className="p-2 mb-2 border border-yellow-gold w-full"
          />
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
            className="p-2 mb-2 border border-yellow-gold w-full"
          />
          <input
            type="text"
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
            className="p-2 mb-2 border border-yellow-gold w-full"
          />
          {/* Image Upload for Edit */}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setEditProduct({ ...editProduct, image: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="p-2 mb-2 border border-yellow-gold w-full"
          />
          <button
            onClick={handleUpdateProduct}
            className="bg-yellow-gold text-green-ziti px-4 py-2 mt-4 rounded-md"
          >
            Update Product
          </button>
        </div>
      )}

      {/* Display Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-green-ziti border border-yellow-gold1 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl text-yellow-gold1 jdid">{product.name}</h3>
            <p className="text-gray-300">{product.category}</p>
            <p className="text-gray-300 mb-2">{product.description}</p>
            <p className="text-lg text-yellow-gold1 font-bold">{`${product.price} $`}</p>
            {/* Display image if available */}
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-100 object-cover mt-4 rounded-lg"
              />
            )}
            <button
              onClick={() => setEditProduct(product)}
              className="bg-yellow-gold text-green-ziti px-4 py-2 mt-4 rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-600 text-white px-4 py-2 mt-4 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
