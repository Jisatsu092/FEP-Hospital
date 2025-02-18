import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaBell, FaUserCircle, FaSignOutAlt, FaCog, FaSun, FaCalendar, FaChartBar, FaUserMd } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Dummy data for statistics
  const stats = [
    { title: 'Harian', value: 45, icon: 'sun' },
    { title: 'Bulanan', value: 320, icon: 'calendar' },
    { title: 'Tahunan', value: 2500, icon: 'chart-bar' },
    { title: 'Bebas', value: 12, icon: 'user-md' },
  ];

  // Dummy data for notifications
  const notifications = [
    { id: 1, message: 'Pasien baru telah datang.', time: '10 menit lalu' },
    { id: 2, message: 'Stok obat paracetamol menipis.', time: '30 menit lalu' },
    { id: 3, message: 'Janji temu hari ini pukul 14:00.', time: '1 jam lalu' },
  ];

  // Chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Jumlah Pasien',
        data: [120, 190, 300, 250, 350, 400],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f630',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative"
          >
            <FaBell className="text-gray-600 text-lg cursor-pointer" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifications.length}
            </span>
            {/* Notification Dropdown */}
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50 hidden">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-3 border-b last:border-b-0 hover:bg-gray-50">
                  <p className="text-sm font-medium">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Profile Dropdown */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative"
          >
            <FaUserCircle className="text-gray-600 text-lg cursor-pointer" />
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 hidden">
              <div className="p-3 border-b">
                <p className="font-medium">Dr. John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-2">
                <FaCog />
                <span>Pengaturan Akun</span>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-2">
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
            >
              <div className="text-3xl text-blue-500">
                {/* Placeholder for icons */}
                {stat.icon === 'sun' && <FaSun />}
                {stat.icon === 'calendar' && <FaCalendar />}
                {stat.icon === 'chart-bar' && <FaChartBar />}
                {stat.icon === 'user-md' && <FaUserMd />}
              </div>
              <div>
                <p className="text-lg font-medium">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-lg font-medium mb-4">Tren Pasien</h2>
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-lg font-medium mb-4">Performa Layanan</h2>
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;