// src/components/admin/DashboardHome.jsx
import React from "react";
import { FaUtensils, FaClipboardList, FaUsers, FaStar } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// تسجيل الرسم البياني في Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardHome = () => {
  // هذه بيانات وهمية لعرض الإحصائيات
  const stats = {
    totalOrders: 120,
    totalBookings: 50,
    totalReviews: 90,
    totalChefs: 3,
  };

  // بيانات الرسم البياني
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Orders",
        data: [30, 25, 35, 40, 50, 45], // بيانات وهمية للطلب في الأشهر
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-gold1 mb-6">Admin Dashboard</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FaClipboardList />} label="Orders" value={stats.totalOrders} />
        <StatCard icon={<FaUsers />} label="Bookings" value={stats.totalBookings} />
        <StatCard icon={<FaStar />} label="Reviews" value={stats.totalReviews} />
        <StatCard icon={<FaUtensils />} label="Chefs" value={stats.totalChefs} />
      </div>

      {/* رسم بياني */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-yellow-gold1 mb-4">Orders by Month</h3>
        <div className="bg-green-ziti p-6 rounded-xl shadow-lg text-gray-300">
          <Bar data={data} options={{ responsive: true }} />
        </div>
      </div>

      {/* المزيد من المحتوى هنا */}
    </div>
  );
};

// Card component for stats
const StatCard = ({ icon, label, value }) => (
  <div className="bg-green-ziti rounded-xl shadow-lg p-6 text-center text-yellow-gold1">
    <div className="text-3xl mb-4">{icon}</div>
    <h4 className="text-lg font-semibold">{label}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default DashboardHome;
