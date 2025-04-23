import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productsData } from "./data/products"; // استيراد البيانات
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import { motion } from "framer-motion"; // استيراد مكتبة الأنيميشن

const MealDetails = () => {
  const { id } = useParams(); // الحصول على معرّف المنتج من الـ URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // حالة الكمية
  const [note, setNote] = useState(""); // حالة الملاحظة
  const [cart, setCart] = useState([]); // حالة السلة

  useEffect(() => {
    const foundProduct = productsData.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    // إضافة المنتج إلى السلة
    const newProduct = { ...product, quantity, note };
    setCart([...cart, newProduct]);
    alert(`${product.name} has been added to your cart!`);
  };

  if (!product) return <div>Loading...</div>; // في حالة عدم العثور على المنتج

  return (
    <div className="bg-green-ziti pt-45  text-yellow-gold min-h-screen">
      <div className="fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>

      <Navbar />
      <div className="container pb-50 items-center mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl text-center items-center  mb-4"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {product.name}
        </motion.h1>
        <div className="flex items-center space-x-8">
          {/* إضافة تأثيرات عند التمرير على الصورة */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-1/2 h-auto object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            whileHover={{ scale: 1.05 }} // تأثير عند التمرير
          />

          <div className="w-1/2">
            {/* تأثيرات عند التمرير على النص */}

            <motion.p
              className="text-xl text-yellow-gold my-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              ${product.price}
            </motion.p>

            <p className="text-lg">{product.description}</p>
            <div className="flex items-center space-x-4 my-4">
              <span className="font-semibold">Rating:</span>
              <span>{product.rating} / 5</span>
            </div>
            <div className="flex items-center space-x-4 my-4">
              <span className="font-semibold">Category:</span>
              <span>{product.category}</span>
            </div>
            <div className="flex items-center space-x-4 my-4">
              <span className="font-semibold">Popularity:</span>
              <span>{product.popularity}</span>
            </div>

            {/* نموذج تخصيص الوجبة */}
            <div className="my-6">
              <h2 className="text-2xl font-semibold mb-4">
                Customize your meal
              </h2>
              <motion.label
                className="block mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Quantity
              </motion.label>
              <motion.input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border-1 border-yellow-gold1 p-2 w-20"
                whileFocus={{ scale: 1.05 }} // تأثير على الحقل عند التفاعل
              />

              <div className="my-4">
                <motion.label
                  className="block mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  Add special requests or notes
                </motion.label>
                <motion.textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any special requests?"
                  className="border-1 border-yellow-gold1 p-2 w-full h-24"
                  whileFocus={{ scale: 1.05 }} // تأثير على الحقل عند التفاعل
                />
              </div>
            </div>

            {/* زر "إضافة إلى السلة" مع تأثيرات */}
            <motion.button
              onClick={handleAddToCart}
              className="bg-yellow-gold text-green-ziti p-4 rounded-lg mt-4 hover:bg-yellow-gold1 transition-colors duration-300"
              whileHover={{ scale: 1.1 }} // تأثير التكبير عند التمرير
            >
              Add to Cart
            </motion.button>

            <div className="mt-4">
              <Link
                to="/menu"
                className="text-yellow-gold border-1 border-yellow-gold hover:bg-yellow-gold1 p-2 hover:text-green-ziti underline"
              >
                Back to menu
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MealDetails;
