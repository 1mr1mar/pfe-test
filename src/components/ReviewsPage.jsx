import React, { useState, useEffect } from "react";
import AddReviewForm from "./AddReviewForm"; // تأكد من المسار الصحيح

const ReviewsPage = () => {
  // بيانات وهمية لعرض التقييمات
  const [reviews, setReviews] = useState([
    { id: 1, name: "John", message: "The food was amazing!", rating: 5 },
    { id: 2, name: "Sarah", message: "Loved the ambiance.", rating: 4 },
    { id: 3, name: "Ali", message: "Great service and delicious dishes.", rating: 5 },
  ]);

  // دالة لإضافة تقييم جديد
  const handleNewReview = (newReview) => {
    // إضافة التقييم الجديد للبيانات الوهمية
    setReviews((prev) => [...prev, { id: prev.length + 1, ...newReview }]);
  };

  // دالة لترتيب التقييمات حسب النجوم
  const sortReviewsByRating = () => {
    const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);
    setReviews(sortedReviews);
  };

  // دالة لترتيب التقييمات حسب التاريخ (الأحدث أولًا)
  const sortReviewsByDate = () => {
    // هنا نضيف حقل التاريخ للتقييمات في البيانات الوهمية
    const sortedReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
    setReviews(sortedReviews);
  };

  useEffect(() => {
    // التعليق: هنا يمكنك إضافة كود لتحميل التقييمات من قاعدة البيانات إذا كنت قد أعددت API
    // axios.get('/api/reviews')
    //   .then(response => setReviews(response.data))
    //   .catch(error => console.log(error));
  }, []);

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>

      <div className="flex justify-between mb-6">
        <button onClick={sortReviewsByRating} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
          Sort by Rating
        </button>
        <button onClick={sortReviewsByDate} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
          Sort by Date
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-600 italic">"{rev.message}"</p>
            <h4 className="mt-4 font-semibold">{rev.name}</h4>
            <p className="text-yellow-500">{"⭐".repeat(rev.rating)}</p>
          </div>
        ))}
      </div>

      {/* نموذج إضافة تقييم */}
      <AddReviewForm onSubmit={handleNewReview} />
    </section>
  );
} 
export default ReviewsPage;
