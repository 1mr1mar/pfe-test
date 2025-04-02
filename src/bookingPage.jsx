import React from "react";
import './App.css';
import './index.css';
import Navbar from "./components/Landing/Navbar";
import { section } from "framer-motion/client";


 const Book = () => {
    return (
        <section className="relative min-h-screen bg-green-ziti">
            
            <div className="fixed z-500 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
            <div className="fixed z-500 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
            <Navbar/>
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Booking Page</h1>
            </div>
        </section>    
    );
 }
 export default Book;