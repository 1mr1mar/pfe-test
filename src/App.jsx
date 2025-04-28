
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Landing from "./components/LandingPage";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainMenu from "./components/MainMenu";
import Book from "./components/bookingPage";
import Chefs from "./components/chefs";
import AddReviewForm from "./components/AddReviewForm";
import ReviewsPage from "./components/ReviewsPage";
import MealDetails from "./components/MealDetails";
import CartPage from "./components/CartPage";

import DashboardLayout from "./components/admin/DashboardLayout";
import DashboardHome from "./components/admin/DashboardHome";
import ChefsPage from "./components/admin/ChefsPage";
import AdminMenu from "./components/admin/AdminMenu";
import AdminOrders from "./components/admin/AdminOrders";
import Bookings from "./components/admin/Bookings";
import Login from "./components/Login";
import ReviewssPage from "./components/admin/ReviewsPage";
import Sittings from "./components/admin/Sittings";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <Router>
      <Routes>
        {/* Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/book" element={<Book />} />
        <Route path="/chefs" element={<Chefs />} />
        <Route path="/add-review" element={<AddReviewForm />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/product/:id" element={<MealDetails />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Login */}
        <Route path="/admin/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            isLoggedIn ? <DashboardLayout /> : <Navigate to="/admin/login" />
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="chefs" element={<ChefsPage />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="reviews" element={<ReviewssPage />} />
          <Route path="sittings" element={<Sittings />} />
        </Route>
      </Routes>
    </Router>
  );  
}

export default App;
