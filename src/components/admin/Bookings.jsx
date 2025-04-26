import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const initialTables = [
  {
    id: 1,
    status: "available",
    booking: null,
    image: "/pic/download.png",
  },
  {
    id: 2,
    status: "pending",
    booking: {
      name: "Ahmed Ali",
      phone: "0501234567",
      time: "7:30 PM",
      notes: "Birthday",
    },
    image: "/pic/download.png",
  },
  {
    id: 3,
    status: "booked",
    booking: {
      name: "Layla Noor",
      phone: "0559876543",
      time: "9:00 PM",
      notes: "Window seat",
    },
    image: "/pic/download.png",
  },
  {
    id: 4,
    status: "pending",
    booking: {
      name: "Ahmed Ali",
      phone: "0501234567",
      time: "7:30 PM",
      notes: "Birthday",
    },
    image: "/pic/download.png",
  },
  {
    id: 5,
    status: "pending",
    booking: {
      name: "Ahmed Ali",
      phone: "0501234567",
      time: "7:30 PM",
      notes: "Birthday",
    },
    image: "/pic/download.png",
  },
  {
    id: 6,
    status: "pending",
    booking: {
      name: "Ahmed Ali",
      phone: "0501234567",
      time: "7:30 PM",
      notes: "Birthday",
    },
    image: "/pic/download.png",
  },
];

const statusColors = {
  available: "bg-green-500 text-white",
  pending: "bg-yellow-400 text-black",
  booked: "bg-red-500 text-white",
};

const statusLabels = {
  available: "Available",
  pending: "Pending",
  booked: "Booked",
};

const Bookings = () => {
  const [tables, setTables] = useState(initialTables);
  const [selectedTable, setSelectedTable] = useState(null);

  const toggleStatus = (id) => {
    setTables((prev) =>
      prev.map((table) => {
        if (table.id === id) {
          const nextStatus =
            table.status === "available"
              ? "pending"
              : table.status === "pending"
              ? "booked"
              : "available";

          return {
            ...table,
            status: nextStatus,
            booking:
              nextStatus === "available"
                ? null
                : {
                    name: "Customer Name",
                    phone: "0500000000",
                    time: "8:00 PM",
                    notes: "No notes",
                  },
          };
        }
        return table;
      })
    );
  };

  return (
    <div className="">
      <h1
        className="text-5xl text-center pt-10 text-yellow-gold1 mb-6"
        style={{ fontFamily: "font1, sans-serif" }}
      >
        Booking Management
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-30  gap-6 gap-y-10 border-1 border-yellow-gold p-10 font1 text-yellow-gold1">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`relative group w-120 h-65  transition-all duration-300 hover:scale-105 cursor-pointer`}
            onClick={() => {
              if (table.status !== "available") {
                setSelectedTable(table);
              }
            }}
          >
            {/*  table pic */}
            <img
              src={table.image}
              alt={`Table ${table.id}`}
              className="w-full h-full object-cover rounded-lg"
            />

            {/*  table state */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-yellow-gold bg-transparont bg-opacity-50 rounded-lg">
              <h2 className="text-2xl pt-5 pr-7 font-bold">Table {table.id}</h2>
              <p className="mt-2 pr-7 text-lg">{statusLabels[table.status]}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal trigger
                  toggleStatus(table.id);
                }}
                className="mt-2 px-4 mr-7 py-1 bg-yellow-gold1 text-green-khzy rounded-full text-sm font-semibold hover:opacity-80"
              >
                Change Status
              </button>
            </div>
          </div>
        ))}

        {/* Modal */}
        <Dialog
          open={!!selectedTable}
          onClose={() => setSelectedTable(null)}
          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <Dialog.Panel className="bg-green-ziti p-6 rounded-xl text-yellow-gold1 w-full max-w-md shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">
              Table {selectedTable?.id} Details
            </Dialog.Title>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedTable?.booking?.name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedTable?.booking?.phone}
              </p>
              <p>
                <strong>Time:</strong> {selectedTable?.booking?.time}
              </p>
              <p>
                <strong>Notes:</strong> {selectedTable?.booking?.notes}
              </p>
            </div>
            <button
              onClick={() => setSelectedTable(null)}
              className="mt-4 px-4 py-2 bg-yellow-gold1 text-green-khzy rounded-lg font-semibold hover:opacity-80"
            >
              Close
            </button>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
  );
};

export default Bookings;
