import React from 'react';

const MenuItem = ({ name, description, price, image }) => {
  return (
    <div className="flex flex-col items-start px-4 py-6 border-b border-gray-600">
      {/* صورة الطبق */}
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />

      {/* اسم الطبق و السعر */}
      <div className="flex justify-between w-full mb-2">
        <h3 className="text-lg font-semibold text-amber-500 uppercase tracking-wide">{name}</h3>
        <p className="text-lg font-bold text-amber-500">${price}</p>
      </div>

      {/* الخط الفاصل */}
      <div className="border-t-2 border-gray-600 w-full my-2"></div>

      {/* وصف الطبق */}
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const Menu = () => {
  const menuItems = [
    { name: 'Beef Burger Meal', description: 'Classic Greek salad, barrel aged feta cheese, bread', price: '32', image: 'https://via.placeholder.com/400x300' },
    { name: 'Roasted Lamb Rump', description: 'Grilled lamb cutlets, pomegranate glaze, butternut squash', price: '25', image: 'https://via.placeholder.com/400x300' },
    { name: 'Pan Seared Sea Bass', description: 'Saffron and mussel’s broth, new potatoes, edamame beans', price: '38', image: 'https://via.placeholder.com/400x300' },
    { name: 'King Prawns and Lobster', description: 'Creamy saffron, sauce Vierge', price: '38', image: 'https://via.placeholder.com/400x300' },
    { name: 'Citrus Cured Salmon', description: 'Horseradish creme fraiche, beetroot mousse, oil', price: '41', image: 'https://via.placeholder.com/400x300' },
    { name: 'Pan Seared Scallops', description: 'Saffron, celeriac puree, black pudding, olive oil', price: '29', image: 'https://via.placeholder.com/400x300' },
    { name: 'Baked Camembert', description: 'Red onion marmalade, garlic focaccia bread, grilled figs', price: '25', image: 'https://via.placeholder.com/400x300' },
    { name: 'Braised Ox Cheek Ravioli', description: 'Mediterranean olives casserole, celeriac puree, mushrooms', price: '23', image: 'https://via.placeholder.com/400x300' },
    { name: 'Corn Fed Chicken', description: 'Wild mushrooms, truffle potatoes, braised leeks, carrots', price: '17', image: 'https://via.placeholder.com/400x300' },
    { name: 'Nduja Pork Chicken Terrine', description: 'Smoked duck breast, pistachio, smoked pancetta', price: '41', image: 'https://via.placeholder.com/400x300' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {/* العنوان */}
      <p className="text-sm text-center text-amber-500 tracking-wide uppercase">Special Selection</p>
      <h2 className="text-4xl font-bold text-center text-white my-4 tracking-wider">From Our Menu</h2>

      {/* عرض القائمة */}
      <div className="grid grid-cols-2 gap-20 mt-8">
        {/* First column */}
        <div>
          {menuItems.slice(0, 5).map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>

        {/* Second column */}
        <div>
          {menuItems.slice(5).map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>

      {/* زر عرض المزيد */}
      <div className="text-center mt-12">
        <button 
          className="bg-amber-500 text-gray-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-amber-600 transition duration-300 shadow-lg transform hover:scale-105">
          View All
        </button>
      </div>
    </div>
  );
};

export default Menu;
