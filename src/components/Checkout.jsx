import { useState } from "react";

export default function Checkout() {
  const [delivery, setDelivery] = useState(false);
  const [hasReservation, setHasReservation] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const [tableId, setTableId] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    fullname: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      delivery,
      hasReservation,
      reservationId,
      tableId,
      customerInfo,
    };
    console.log("Order Data:", orderData);
    // Send this to  backend 
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow bg-green-khzy font1 text-gray-300">
      <h2 className="text-3xl font-bold text-yellow-gold1 mb-6 text-center">
        Checkout
      </h2>

      <div className="flex gap-6 mb-6 justify-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={delivery}
            onChange={(e) => setDelivery(e.target.checked)}
            className="accent-yellow-gold1"
          />
          <span>Home Delivery</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasReservation}
            onChange={(e) => setHasReservation(e.target.checked)}
            className="accent-yellow-gold1"
          />
          <span>I Have a Reservation</span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {hasReservation && (
          <>
            <input
              type="text"
              placeholder="Reservation ID"
              className="w-full p-2 rounded bg-gray-800 border border-yellow-gold1 placeholder-gray-400"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Table ID (optional)"
              className="w-full p-2 rounded bg-gray-800 border border-yellow-gold1 placeholder-gray-400"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
            />
          </>
        )}

        {(delivery || !hasReservation) && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 rounded bg-gray-800 border border-yellow-gold1 placeholder-gray-400"
              value={customerInfo.fullname}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, fullname: e.target.value })
              }
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 rounded bg-gray-800 border border-yellow-gold1 placeholder-gray-400"
              value={customerInfo.phone}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, phone: e.target.value })
              }
              required
            />
            {delivery && (
              <input
                type="text"
                placeholder="Delivery Address"
                className="w-full p-2 rounded bg-gray-800 border border-yellow-gold1 placeholder-gray-400"
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    address: e.target.value,
                  })
                }
                required
              />
            )}
            <select
              className="w-full p-2 rounded bg-gray-800 border border-yellow-gold1 text-white"
              value={customerInfo.paymentMethod}
              onChange={(e) =>
                setCustomerInfo({
                  ...customerInfo,
                  paymentMethod: e.target.value,
                })
              }
            >
              <option value="cash">Cash on Delivery</option>
              <option value="card">Credit Card</option>
            </select>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-yellow-gold1 text-black py-2 rounded hover:bg-yellow-400 transition font-semibold"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
