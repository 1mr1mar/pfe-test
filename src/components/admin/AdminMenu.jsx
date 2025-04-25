import React, { useState } from "react";
import { productsData } from "../data/products";

const AdminMenu = () => {
  const [products, setProducts] = useState(productsData);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [editProductId, setEditProductId] = useState(null);

  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
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
    const newId = products.length + 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });
  };

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
    setEditProductId(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 bg-green-khzy">
      <h1
        className="text-3xl text-yellow-gold1 mb-6"
        style={{ fontFamily: "font1, sans-serif" }}
      >
        Menu Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add New Product Card */}
        <div className="bg-green-ziti border border-yellow-gold1 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl text-yellow-gold1 mb-2 font-bold">
            Add New Product
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mb-2 w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
          />
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mb-2 w-full p-2 bg-transparent text-yellow-gold border border-yellow-gold rounded"
          >
            <option value="">Select Category</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Main Courses">Main Courses</option>
            <option value="Desserts">Desserts</option>
            <option value="Drinks">Drinks</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="mb-2 w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="mb-2 w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="mb-2 w-full border border-yellow-gold rounded p-10 text-white"
          />
          <button
            onClick={handleAddProduct}
            className="bg-yellow-gold text-green-ziti px-4 py-2 mt-2 rounded-md"
          >
            Add Product
          </button>
        </div>

        {/* Products Cards */}
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-green-ziti border border-yellow-gold1 p-4 rounded-lg shadow-lg"
          >
            {editProductId === product.id ? (
              <>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, name: e.target.value }
                          : p
                      )
                    )
                  }
                  className="mb-2 w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                />
                <select
                  value={product.category}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, category: e.target.value }
                          : p
                      )
                    )
                  }
                  className="mb-2 w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                >
                  <option value="Appetizers">Appetizers</option>
                  <option value="Main Courses">Main Courses</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Drinks">Drinks</option>
                </select>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, price: e.target.value }
                          : p
                      )
                    )
                  }
                  className="mb-2 w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                />
                <textarea
                  value={product.description}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, description: e.target.value }
                          : p
                      )
                    )
                  }
                  className="mb-2 w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, true)}
                  className="mb-2 w-full text-white"
                />
                <button
                  onClick={() => handleUpdateProduct(product.id, product)}
                  className="bg-yellow-gold text-green-ziti px-4 py-2 mt-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditProductId(null)}
                  className="bg-gray-400 text-white px-4 py-2 mt-2 rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl text-yellow-gold1">{product.name}</h3>
                <p className="text-gray-300">{product.category}</p>
                <p className="text-gray-300">{product.description}</p>
                <p className="text-yellow-gold1 font-bold mb-2">
                  {product.price} $
                </p>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-100 object-cover mb-2 rounded"
                  />
                )}
                <button
                  onClick={() => setEditProductId(product.id)}
                  className="bg-yellow-gold text-green-ziti px-4 py-2 mt-2 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-600 text-white px-4 py-2 mt-2 rounded-md"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
