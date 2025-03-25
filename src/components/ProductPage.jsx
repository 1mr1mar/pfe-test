import { useParams } from "react-router-dom";
import { productsData } from "./data/products";

export default function ProductPage() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover mb-6"
      />
      <p className="text-gray-600">{product.description || "No description available."}</p>
      <p className="text-xl font-semibold mt-4">${product.price}</p>
      <p className="text-md text-gray-600 mt-4">Category: {product.category}</p>
      <p className="text-md text-gray-600 mt-2">Ingredients: {product.ingredients}</p>
      <p className="text-md text-gray-600 mt-2">Rating: {product.rating} ★</p>
      <p className="text-md text-gray-600 mt-2">
        {product.available ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
}
