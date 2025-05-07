import React, { useState, useMemo } from "react";
import { Dialog } from "@headlessui/react";
import { FiSearch, FiClock, FiCalendar, FiUsers, FiEdit2, FiTrash2, FiCheck, FiX, FiCheckCircle, FiXCircle } from "react-icons/fi";

const initialTables = [
  {
    id: 1,
    status: "available",
    booking: null,
    image: "/pic/download.png",
    capacity: 4,
    location: "Window",
  },
  {
    id: 2,
    status: "pending",
    booking: {
      name: "Ahmed Ali",
      phone: "0501234567",
      time: "7:30 PM",
      date: "2024-03-20",
      duration: 2,
      guests: 4,
      notes: "Birthday",
      specialRequests: "Cake and decorations",
    },
    image: "/pic/download.png",
    capacity: 6,
    location: "Center",
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

const initialReservations = [
  {
    id: 1,
    customerName: "Mohammed Ahmed",
    phone: "0501234567",
    email: "mohammed@email.com",
    date: "2024-03-25",
    time: "7:30 PM",
    guests: 4,
    status: "pending",
    specialRequests: "Window seat preferred",
    createdAt: "2024-03-20T10:30:00",
  },
  {
    id: 2,
    customerName: "Fatima Hassan",
    phone: "0559876543",
    email: "fatima@email.com",
    date: "2024-03-26",
    time: "8:00 PM",
    guests: 6,
    status: "pending",
    specialRequests: "Birthday celebration",
    createdAt: "2024-03-20T11:15:00",
  },
  {
    id: 3,
    customerName: "Ali Mohammed",
    phone: "0567891234",
    email: "ali@email.com",
    date: "2024-03-27",
    time: "9:00 PM",
    guests: 2,
    status: "approved",
    specialRequests: "Anniversary dinner",
    createdAt: "2024-03-19T15:45:00",
  },
];

const statusColors = {
  available: "bg-green-khzy text-white",
  pending: "bg-yellow-gold1 text-black",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [filterStatus, setFilterStatus] = useState("all");
  const [reservations, setReservations] = useState(initialReservations);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [activeTab, setActiveTab] = useState("tables"); // "tables" or "reservations"
  
  // New filter states
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [guestFilter, setGuestFilter] = useState("all");

  const filteredAndSortedTables = useMemo(() => {
    return tables
      .filter((table) => {
        const matchesSearch = searchTerm === "" || 
          table.id.toString().includes(searchTerm) ||
          (table.booking && table.booking.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = filterStatus === "all" || table.status === filterStatus;
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "id") return a.id - b.id;
        if (sortBy === "status") return a.status.localeCompare(b.status);
        if (sortBy === "capacity") return a.capacity - b.capacity;
        return 0;
      });
  }, [tables, searchTerm, sortBy, filterStatus]);

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesSearch = searchTerm === "" || 
        reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.phone.includes(searchTerm) ||
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDate = dateFilter === "" || reservation.date === dateFilter;
      const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
      const matchesGuests = guestFilter === "all" || 
        (guestFilter === "small" && reservation.guests <= 2) ||
        (guestFilter === "medium" && reservation.guests > 2 && reservation.guests <= 4) ||
        (guestFilter === "large" && reservation.guests > 4);

      return matchesSearch && matchesDate && matchesStatus && matchesGuests;
    });
  }, [reservations, searchTerm, dateFilter, statusFilter, guestFilter]);

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
                    date: new Date().toISOString().split('T')[0],
                    duration: 2,
                    guests: 2,
                    notes: "No notes",
                    specialRequests: "",
                  },
          };
        }
        return table;
      })
    );
  };

  const handleBookingUpdate = (tableId, updatedBooking) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId
          ? { ...table, booking: { ...table.booking, ...updatedBooking } }
          : table
      )
    );
  };

  const handleReservationAction = (reservationId, action) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservationId
          ? {
              ...res,
              status: action === "approve" ? "approved" : "rejected",
            }
          : res
      )
    );
  };

  return (
    <div className="min-h-screen bg-green-ziti p-8">
      <h1
        className="text-5xl text-center pt-10 text-yellow-gold1 mb-8"
        style={{ fontFamily: "font1, sans-serif" }}
      >
        Booking Management
      </h1>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex space-x-4 border-b border-yellow-gold">
          <button
            className={`px-6 py-3 text-lg font1 ${
              activeTab === "tables"
                ? "text-yellow-gold1 border-b-2 border-yellow-gold1"
                : "text-yellow-gold1/60 hover:text-yellow-gold1"
            }`}
            onClick={() => setActiveTab("tables")}
          >
            Tables
          </button>
          <button
            className={`px-6 py-3 text-lg font1 ${
              activeTab === "reservations"
                ? "text-yellow-gold1 border-b-2 border-yellow-gold1"
                : "text-yellow-gold1/60 hover:text-yellow-gold1"
            }`}
            onClick={() => setActiveTab("reservations")}
          >
            Reservations
          </button>
        </div>
      </div>

      {activeTab === "tables" ? (
        <>
          {/* Controls Section */}
          <div className="max-w-7xl mx-auto mb-8 bg-white/5 border border-yellow-gold rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-gold1" />
                <input
                  type="text"
                  placeholder="Search tables or customers..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-yellow-gold text-yellow-gold1 placeholder-yellow-gold1/50 focus:outline-none focus:ring-2 focus:ring-yellow-gold/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="bg-white/5 border border-yellow-gold text-yellow-gold1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-gold/50"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id">Sort by Table ID</option>
                <option value="status">Sort by Status</option>
                <option value="capacity">Sort by Capacity</option>
              </select>

              <select
                className="bg-white/5 border border-yellow-gold text-yellow-gold1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-gold/50"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="booked">Booked</option>
              </select>
            </div>
          </div>

          {/* Tables Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedTables.map((table) => (
              <div
                key={table.id}
                className="relative group transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => {
                  if (table.status !== "available") {
                    setSelectedTable(table);
                  }
                }}
              >
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border-2 border-yellow-gold">
                  <img
                    src={table.image}
                    alt={`Table ${table.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl border border-yellow-gold">
                  <h2 className="text-2xl font1 text-yellow-gold1">Table {table.id}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[table.status]}`}>
                      {statusLabels[table.status]}
                    </span>
                    <span className="text-yellow-gold1/80 text-sm">
                      Capacity: {table.capacity}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(table.id);
                    }}
                    className="mt-4 px-6 py-2 bg-yellow-gold1 text-green-khzy rounded-full text-sm font-semibold hover:bg-yellow-gold transition-colors"
                  >
                    Change Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Reservations Section */}
          <div className="max-w-7xl mx-auto">
            {/* Search and Filters */}
            <div className="bg-white/5 border border-yellow-gold rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-gold1" />
                  <input
                    type="text"
                    placeholder="Search reservations..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-yellow-gold text-yellow-gold1 placeholder-yellow-gold1/50 focus:outline-none focus:ring-2 focus:ring-yellow-gold/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Date Filter */}
                <div>
                  <input
                    type="date"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-gold text-yellow-gold1 focus:outline-none focus:ring-2 focus:ring-yellow-gold/50"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-gold text-yellow-gold1 focus:outline-none focus:ring-2 focus:ring-yellow-gold/50"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Guest Count Filter */}
                <div>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-yellow-gold text-yellow-gold1 focus:outline-none focus:ring-2 focus:ring-yellow-gold/50"
                    value={guestFilter}
                    onChange={(e) => setGuestFilter(e.target.value)}
                  >
                    <option value="all">All Group Sizes</option>
                    <option value="small">Small (1-2 guests)</option>
                    <option value="medium">Medium (3-4 guests)</option>
                    <option value="large">Large (5+ guests)</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(dateFilter || statusFilter !== "all" || guestFilter !== "all") && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {dateFilter && (
                    <span className="px-3 py-1 bg-yellow-gold1/20 text-yellow-gold1 rounded-full text-sm flex items-center gap-2">
                      Date: {dateFilter}
                      <button
                        onClick={() => setDateFilter("")}
                        className="hover:text-yellow-gold1/60"
                      >
                        <FiX size={16} />
                      </button>
                    </span>
                  )}
                  {statusFilter !== "all" && (
                    <span className="px-3 py-1 bg-yellow-gold1/20 text-yellow-gold1 rounded-full text-sm flex items-center gap-2">
                      Status: {statusFilter}
                      <button
                        onClick={() => setStatusFilter("all")}
                        className="hover:text-yellow-gold1/60"
                      >
                        <FiX size={16} />
                      </button>
                    </span>
                  )}
                  {guestFilter !== "all" && (
                    <span className="px-3 py-1 bg-yellow-gold1/20 text-yellow-gold1 rounded-full text-sm flex items-center gap-2">
                      Group: {guestFilter}
                      <button
                        onClick={() => setGuestFilter("all")}
                        className="hover:text-yellow-gold1/60"
                      >
                        <FiX size={16} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setDateFilter("");
                      setStatusFilter("all");
                      setGuestFilter("all");
                    }}
                    className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm hover:bg-red-500/30 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Reservations List */}
            <div className="grid gap-6">
              {filteredReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-white/5 border border-yellow-gold rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setSelectedReservation(reservation)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font1 text-yellow-gold1 mb-2">
                        {reservation.customerName}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-yellow-gold1/80">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-yellow-gold1/60" />
                          <span>{reservation.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock className="text-yellow-gold1/60" />
                          <span>{reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiUsers className="text-yellow-gold1/60" />
                          <span>{reservation.guests} Guests</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            reservation.status === "pending"
                              ? "bg-yellow-gold1/20 text-yellow-gold1"
                              : reservation.status === "approved"
                              ? "bg-green-khzy/20 text-green-khzy"
                              : "bg-red-500/20 text-red-500"
                          }`}>
                            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {reservation.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReservationAction(reservation.id, "approve");
                          }}
                          className="p-2 bg-green-khzy/20 text-green-khzy rounded-lg hover:bg-green-khzy/30 transition-colors"
                        >
                          <FiCheckCircle size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReservationAction(reservation.id, "reject");
                          }}
                          className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <FiXCircle size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation Details Modal */}
          <Dialog
            open={!!selectedReservation}
            onClose={() => setSelectedReservation(null)}
            className="fixed z-50 inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <Dialog.Panel className="bg-green-ziti p-8 rounded-2xl text-yellow-gold1 w-full max-w-2xl shadow-2xl border-2 border-yellow-gold">
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title className="text-2xl font1">
                  Reservation Details
                </Dialog.Title>
                <button
                  onClick={() => setSelectedReservation(null)}
                  className="text-yellow-gold1/60 hover:text-yellow-gold1"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p><strong>Customer Name:</strong> {selectedReservation?.customerName}</p>
                  <p><strong>Phone:</strong> {selectedReservation?.phone}</p>
                  <p><strong>Email:</strong> {selectedReservation?.email}</p>
                  <p><strong>Date:</strong> {selectedReservation?.date}</p>
                </div>

                <div className="space-y-4">
                  <p><strong>Time:</strong> {selectedReservation?.time}</p>
                  <p><strong>Guests:</strong> {selectedReservation?.guests}</p>
                  <p><strong>Status:</strong> {selectedReservation?.status}</p>
                  <p><strong>Special Requests:</strong> {selectedReservation?.specialRequests}</p>
                </div>
              </div>

              {selectedReservation?.status === "pending" && (
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      handleReservationAction(selectedReservation.id, "approve");
                      setSelectedReservation(null);
                    }}
                    className="px-4 py-2 bg-green-khzy/20 text-green-khzy rounded-lg hover:bg-green-khzy/30 transition-colors flex items-center gap-2 border border-green-khzy"
                  >
                    <FiCheckCircle /> Approve Reservation
                  </button>
                  <button
                    onClick={() => {
                      handleReservationAction(selectedReservation.id, "reject");
                      setSelectedReservation(null);
                    }}
                    className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2 border border-red-500"
                  >
                    <FiXCircle /> Reject Reservation
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Dialog>
        </>
      )}

      {/* Enhanced Modal */}
      <Dialog
        open={!!selectedTable}
        onClose={() => setSelectedTable(null)}
        className="fixed z-50 inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <Dialog.Panel className="bg-green-ziti p-8 rounded-2xl text-yellow-gold1 w-full max-w-2xl shadow-2xl border-2 border-yellow-gold">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font1">
              Table {selectedTable?.id} Details
            </Dialog.Title>
            <button
              onClick={() => setSelectedTable(null)}
              className="text-yellow-gold1/60 hover:text-yellow-gold1"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FiUsers className="text-yellow-gold1/60" />
                <p><strong>Name:</strong> {selectedTable?.booking?.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-yellow-gold1/60" />
                <p><strong>Time:</strong> {selectedTable?.booking?.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-yellow-gold1/60" />
                <p><strong>Date:</strong> {selectedTable?.booking?.date}</p>
              </div>
              <p><strong>Phone:</strong> {selectedTable?.booking?.phone}</p>
              <p><strong>Guests:</strong> {selectedTable?.booking?.guests}</p>
              <p><strong>Duration:</strong> {selectedTable?.booking?.duration} hours</p>
            </div>

            <div className="space-y-4">
              <p><strong>Location:</strong> {selectedTable?.location}</p>
              <p><strong>Capacity:</strong> {selectedTable?.capacity} people</p>
              <p><strong>Notes:</strong> {selectedTable?.booking?.notes}</p>
              <p><strong>Special Requests:</strong> {selectedTable?.booking?.specialRequests}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => {
                // Add edit functionality
              }}
              className="px-4 py-2 bg-yellow-gold1/20 text-yellow-gold1 rounded-lg hover:bg-yellow-gold1/30 transition-colors flex items-center gap-2 border border-yellow-gold"
            >
              <FiEdit2 /> Edit Booking
            </button>
            <button
              onClick={() => {
                // Add cancel booking functionality
              }}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2 border border-red-500"
            >
              <FiTrash2 /> Cancel Booking
            </button>
            <button
              onClick={() => setSelectedTable(null)}
              className="px-4 py-2 bg-yellow-gold1 text-green-khzy rounded-lg hover:bg-yellow-gold transition-colors flex items-center gap-2"
            >
              <FiCheck /> Close
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Bookings;
