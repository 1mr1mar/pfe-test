import React from "react";
import SvgIcon3 from "./svgn3";
import Svg from "./svgn2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MenuItem = ({ name, description, price }) => {
  return (
    <div className="flex flex-col items-start px-4 py-6  ">
      {/* اسم الطبق */}
      <div className="flex justify-between w-full">
        <h3 className="text-lg font-semibold text-yellow-gold uppercase tracking-wide">
          {name}
        </h3>
        <p className="text-lg font-bold text-yellow-gold">${price}</p>
      </div>

      {/* الخط الفاصل */}
      <div className="border-t-2 border-yellow-gold w-full my-2"></div>

      {/* وصف الطبق */}
      <p className="text-white text-sm">{description}</p>
    </div>
  );
};

const Menu = () => {
  const menuItems = [
    {
      name: "Beef Burger Meal",
      description: "Classic Greek salad, barrel aged feta cheese, bread",
      price: "32",
    },
    {
      name: "Roasted Lamb Rump",
      description: "Grilled lamb cutlets, pomegranate glaze, butternut squash",
      price: "25",
    },
    {
      name: "Pan Seared Sea Bass",
      description: "Saffron and mussel’s broth, new potatoes, edamame beans",
      price: "38",
    },
    {
      name: "King Prawns and Lobster",
      description: "Creamy saffron, sauce Vierge",
      price: "38",
    },
    {
      name: "Citrus Cured Salmon",
      description: "Horseradish creme fraiche, beetroot mousse, oil",
      price: "41",
    },
    {
      name: "Pan Seared Scallops",
      description: "Saffron, celeriac puree, black pudding, olive oil",
      price: "29",
    },
    {
      name: "Baked Camembert",
      description: "Red onion marmalade, garlic focaccia bread, grilled figs",
      price: "25",
    },
    {
      name: "Braised Ox Cheek Ravioli",
      description: "Mediterranean olives casserole, celeriac puree, mushrooms",
      price: "23",
    },
    {
      name: "Corn Fed Chicken",
      description: "Wild mushrooms, truffle potatoes, braised leeks, carrots",
      price: "17",
    },
    {
      name: "Nduja Pork Chicken Terrine",
      description: "Smoked duck breast, pistachio, smoked pancetta",
      price: "41",
    },
  ];

  return (
    <section className=" relative px-6 bg-green-ziti">
      <div className=" container pt-45 mx-auto px-6 bg-green-ziti  ">
        <p className=" jdid text-sm text-center text-yellow-gold tracking-wide uppercase">
          Special Selection
        </p>
        <h2
          className="text-4xl  text-center text-yellow-gold my-4 tracking-wider"
          style={{ fontFamily: "font1, sans-serif" }}
        >
          <span className="flex justify-center gap-x-4 items-center">
            <Svg /> Our best specialties <Svg />
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            {menuItems.slice(0, 5).map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>

          <div>
            {menuItems.slice(5).map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="text-yellow-gold mt-10 mb-20 px-6 py-3 border-2 border-yellow-gold text-lg font-medium  transition duration-300 shadow-lg transform hover:scale-105">
            View All
          </button>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 ">
        <SvgIcon3 />
      </div>
    </section>
  );
};

export default Menu;
