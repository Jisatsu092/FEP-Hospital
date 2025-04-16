'use client';
import { useState, useEffect, useRef, JSX } from 'react';
import {
  BellIcon,
  UserCircleIcon,
  ChartBarIcon,
  CalendarIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const dummyData = {
  dailyPatients: 42,
  monthlyPatients: 1289,
  yearlyPatients: 15430,
  activeDoctors: 28,
  notifications: [
    { id: 1, title: 'Pasien Baru', message: 'Andi Pratama mendaftar jam 09:00' },
    { id: 2, title: 'Stok Obat', message: 'Paracetamol tersisa 23 tablet' },
  ],
  chartData: {
    daily: [
      { name: 'Sen', pasien: 65 },
      { name: 'Sel', pasien: 85 },
      { name: 'Rab', pasien: 45 },
      { name: 'Kam', pasien: 95 },
      { name: 'Jum', pasien: 75 },
    ],
    weekly: [
      { name: 'Minggu 1', pasien: 300 },
      { name: 'Minggu 2', pasien: 400 },
      { name: 'Minggu 3', pasien: 500 },
      { name: 'Minggu 4', pasien: 600 },
    ],
    monthly: [
      { name: 'Jan', pasien: 1200 },
      { name: 'Feb', pasien: 1500 },
      { name: 'Mar', pasien: 1800 },
      { name: 'Apr', pasien: 2000 },
      { name: 'May', pasien: 2200 },
    ],
  },
  diseaseData: [
    { name: 'Flu', value: 400 },
    { name: 'Demam', value: 300 },
    { name: 'Diabetes', value: 300 },
    { name: 'Lainnya', value: 200 },
  ],
  revenueData: [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 5000 },
    { name: 'Apr', uv: 4000 },
    { name: 'May', uv: 7000 },
    { name: 'Jun', uv: 6500 },
  ],
};

export default function DashboardLayout() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [notifications, setNotifications] = useState(dummyData.notifications);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Ref untuk dropdown notifikasi dan profile
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Menghapus notifikasi saat diklik
  const handleNotificationClick = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    setIsNotificationOpen(false);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
      } p-8 transition-colors duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard RS Sehat Bahagia</h1>
        {/* Profile & Notifikasi */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 transition-all"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          {/* Notifikasi */}
          <div className="relative" ref={notificationDropdownRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <BellIcon className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5">
                  {notifications.length}
                </span>
              )}
            </button>
            {/* Notifikasi Popup */}
            {isNotificationOpen && (
              <div
                className={`absolute right-0 top-10 w-80 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl shadow-lg p-4 z-50`}
              >
                <h3 className="font-semibold mb-4">Notifikasi Terbaru</h3>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                      } rounded-lg hover:bg-gray-100 cursor-pointer`}
                      onClick={() => handleNotificationClick(notif.id)}
                    >
                      <p className="text-sm font-medium">{notif.title}</p>
                      <p className="text-sm">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all"
            >
              <UserCircleIcon className={`h-8 w-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              <span>Dr. Sarah Wijaya</span>
            </button>
            {/* Dropdown Profile */}
            {isProfileOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-md shadow-lg py-1`}
              >
                <a
                  href="#"
                  className={`block px-4 py-2 hover:bg-gray-100 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                  onClick={() => setIsProfileOpen(false)}
                >
                  Pengaturan
                </a>
                <a
                  href="#"
                  className={`block px-4 py-2 hover:bg-gray-100 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                  onClick={() => setIsProfileOpen(false)}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<CalendarIcon className="h-6 w-6 text-black" />}
          title="Harian"
          value={dummyData.dailyPatients}
          trend="up"
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon={<ChartBarIcon className="h-6 w-6 text-black" />}
          title="Bulanan"
          value={dummyData.monthlyPatients}
          trend="stable"
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon={<CalendarIcon className="h-6 w-6 text-black" />}
          title="Tahunan"
          value={dummyData.yearlyPatients}
          trend="up"
          isDarkMode={isDarkMode}
        />
        <StatCard
          icon={<BeakerIcon className="h-6 w-6 text-black" />}
          title="Dokter Aktif"
          value={dummyData.activeDoctors}
          trend="down"
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Grafik Pasien Minggu Ini */}
      <div
        className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-6 rounded-xl shadow-sm mb-8`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Statistik Pasien Minggu Ini</h2>
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'daily' | 'weekly' | 'monthly')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-black'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dummyData.chartData[activeTab]}>
              <XAxis dataKey="name" stroke={isDarkMode ? '#fff' : '#000'} />
              <YAxis stroke={isDarkMode ? '#fff' : '#000'} />
              <Tooltip contentStyle={{ color: '#000' }} />
              <Bar dataKey="pasien" fill={isDarkMode ? '#3B82F6' : '#3B82F6'} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

        {/* Chart Pie Penyakit & Line Chart Pemasukan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart Pie Penyakit */}
          <div
            className={`p-6 rounded-xl shadow-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } h-96`}
          >
            <h2 className="text-xl font-semibold mb-4">Distribusi Penyakit</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dummyData.diseaseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {dummyData.diseaseData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ color: '#000' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Line Chart Pemasukan Bulanan */}
          <div
            className={`p-6 rounded-xl shadow-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } h-96`}
          >
            <h2 className="text-xl font-semibold mb-4">Pemasukan Bulanan</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyData.revenueData}>
                <XAxis dataKey="name" stroke={isDarkMode ? '#fff' : '#000'} />
                <YAxis stroke={isDarkMode ? '#fff' : '#000'} />
                <Tooltip contentStyle={{ color: '#000' }} />
                <Line type="monotone" dataKey="uv" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
  );
}

// Definisikan tipe untuk trend
type TrendType = 'up' | 'down' | 'stable';

// Komponen StatCard Terpisah
const StatCard = ({
  icon,
  title,
  value,
  trend,
  isDarkMode,
}: {
  icon: JSX.Element;
  title: string;
  value: number;
  trend: TrendType; // Gunakan tipe TrendType di sini
  isDarkMode: boolean;
}) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
            {title}
          </p>
          <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {value}
          </p>
        </div>
        <div
          className={`p-2 rounded-full ${
            trendColors[trend]?.bg || 'bg-gray-100'
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`text-sm ${
            trendColors[trend]?.text || 'text-gray-500'
          }`}
        >
          {trend === 'up'
            ? '↑ 12%'
            : trend === 'down'
            ? '↓ 5%'
            : '→ Stabil'}
        </span>
      </div>
    </div>
  );
};

// Objek trendColors tetap sama
const trendColors = {
  up: { bg: 'bg-green-100', text: 'text-green-600' },
  down: { bg: 'bg-red-100', text: 'text-red-600' },
  stable: { bg: 'bg-blue-100', text: 'text-blue-600' },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];