import React from 'react';
import Landing from './components/LandingPage'; 
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MainMenu from './components/MainMenu';
import Book from './bookingPage';
import Chefs from './components/chefs';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/book" element={<Book />} />
        <Route path="/chefs" element={<Chefs />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;