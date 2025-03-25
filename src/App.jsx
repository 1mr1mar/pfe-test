import React from 'react';
import Landing from './components/LandingPage'; 
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ShopPage from './components/MainMenu';


const App = () => {
  return (
    <div className=" relative min-h-screen">
      <div className="fixed z-50 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-50 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      {/*<ShopPage/>*/}
     <Landing/>
    </div>
  );
};

export default App;
