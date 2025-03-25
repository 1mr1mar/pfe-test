import { Link } from "react-router-dom";
import { productsData } from "./data/products";

export default function ShopPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productsData.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group">
            <div className="border rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:opacity-80"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
