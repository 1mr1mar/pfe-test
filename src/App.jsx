import React from "react";
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

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* صفحات الزوار */}
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/book" element={<Book />} />
        <Route path="/chefs" element={<Chefs />} />
        <Route path="/add-review" element={<AddReviewForm />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/product/:id" element={<MealDetails />} />
        <Route path="/cart" element={<CartPage />} />

        {/* لوحة التحكم - admin */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="chefs" element={<ChefsPage />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrders />} />
          {/* يمكنك إضافة المزيد من المسارات هنا */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
