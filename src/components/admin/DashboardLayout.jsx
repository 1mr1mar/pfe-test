import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaShoppingCart,
  FaUsers,
  FaHome,
  FaClipboardList,
  FaStar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen font1 bg-green-khzy text-yellow-gold1">
      {/* Sidebar */}
      <aside className="w-64 bg-green-ziti border-r-1 border-yellow-gold p-4 flex flex-col shadow-lg">
        <h2
          className="text-xl mb-6 border-b-1 border-yellow-gold text-center text-yellow-gold1"
          style={{ fontFamily: "font1, sans-serif" }}
        >
          Admin Panel
        </h2>
        <nav className="flex-1 space-y-3">
          <NavItem to="/admin" icon={<FaHome />} label="Dashboard" />
          <NavItem to="/admin/menu" icon={<FaUtensils />} label="Menu" />
          <NavItem to="/admin/orders" icon={<FaClipboardList />} label="Orders" />
          <NavItem to="/admin/bookings" icon={<FaUsers />} label="Bookings" />
          <NavItem to="/admin/chefs" icon={<FaUsers />} label="Chefs" />
          <NavItem to="/admin/reviews" icon={<FaStar />} label="Reviews" />
          <NavItem to="/admin/settings" icon={<FaCog />} label="Settings" />
        </nav>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-khzy hover:text-yellow-gold transition-all duration-200 w-full"
          >
            <span className="text-lg"><FaSignOutAlt /></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-green-khzy overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-khzy hover:text-yellow-gold transition-all duration-200"
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default DashboardLayout;
