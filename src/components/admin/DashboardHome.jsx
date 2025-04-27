import React, { useMemo } from "react";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  // Sample data for statistics display
  const stats = {
    totalOrders: 120,
    totalBookings: 50,
    totalReviews: 90,
    totalChefs: 3,
  };

  // Memoize chart data to prevent unnecessary re-renders
  const chartData = useMemo(
    () => ({
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Orders",
          data: [30, 25, 35, 40, 50, 45], // Sample order data by month
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    }),
    []
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Order Distribution",
        color: "#FFC107", // Assuming this matches your yellow-gold1
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#E0E0E0", // Light color for better readability on dark background
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "#E0E0E0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="p-4">
      <h2
        className="text-5xl text-center pt-10 text-yellow-gold1 mb-6"
        style={{ fontFamily: "font1, sans-serif" }}
        id="dashboard-heading"
      >
        Admin Dashboard
      </h2>
      <div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        aria-labelledby="dashboard-heading"
      >
        <StatCard
          icon={<FaClipboardList aria-hidden="true" />}
          label="Orders"
          value={stats.totalOrders}
        />
        <StatCard
          icon={<FaUsers aria-hidden="true" />}
          label="Bookings"
          value={stats.totalBookings}
        />
        <StatCard
          icon={<FaStar aria-hidden="true" />}
          label="Reviews"
          value={stats.totalReviews}
        />
        <StatCard
          icon={<FaUtensils aria-hidden="true" />}
          label="Chefs"
          value={stats.totalChefs}
        />
      </div>

      {/* Chart Section */}
      <div className="mt-6">
        <h3
          className="text-5xl text-center pt-10 text-yellow-gold1 mb-6"
          style={{ fontFamily: "font1, sans-serif" }}
          id="orders-chart"
        >
          Orders by Month
        </h3>
        <div
          className="bg-green-ziti p-6 rounded-xl shadow-lg text-gray-300"
          aria-labelledby="orders-chart"
        >
          {/* Error boundary could be added here */}
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-yellow-gold1 mb-4">
          Recent Activity
        </h3>
        <div className="bg-green-ziti p-6 rounded-xl shadow-lg">
          <p className="text-gray-300">No recent activities to display.</p>
        </div>
      </div>
    </div>
  );
};

// Card component for stats
const StatCard = ({ icon, label, value }) => (
  <div
    className="bg-green-ziti rounded-xl shadow-lg p-6 text-center text-yellow-gold1"
    aria-label={`${label}: ${value}`}
  >
    <div className="text-3xl mb-4" aria-hidden="true">
      {icon}
    </div>
    <h4 className="text-lg font-semibold">{label}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default DashboardHome;
