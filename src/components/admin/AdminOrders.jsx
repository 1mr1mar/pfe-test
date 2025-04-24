import { useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Ahmed",
      items: ["Pizza", "Pasta"],
      total: 150,
      date: "2025-04-24",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Sara",
      items: ["Burger", "Fries", "Cola"],
      total: 90,
      date: "2025-04-23",
      status: "Preparing",
    },
  ]);

  const statuses = ["Pending", "Preparing", "Ready", "Delivered"];

  const handleStatusChange = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status:
                statuses[(statuses.indexOf(order.status) + 1) % statuses.length],
            }
          : order
      )
    );
  };

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl  mb-4 text-yellow-gold" style={{ fontFamily: "font1, sans-serif" }}>Orders Management</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-green-khzy border border-yellow-gold p-4 rounded-2xl shadow-md text-gray-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">
                Order #{order.id} - {order.customerName}
              </h3>
              <span className="text-sm">{order.date}</span>
            </div>
            <p className="mb-1">
              <strong>Items:</strong> {order.items.join(", ")}
            </p>
            <p className="mb-1">
              <strong>Total:</strong> ${order.total}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span className="text-yellow-gold">{order.status}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange(order.id)}
                className="bg-yellow-gold1 text-black px-3 py-1 rounded-xl font-bold"
              >
                Next Status
              </button>
              <button
                onClick={() => handleDelete(order.id)}
                className="bg-red-600 px-3 py-1 rounded-xl font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
