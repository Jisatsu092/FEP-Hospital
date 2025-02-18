'use client';
import { useState, useEffect, useRef } from 'react';
import { BellIcon, UserCircleIcon, ChartBarIcon, CalendarIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = {
  dailyPatients: 42,
  monthlyPatients: 1289,
  yearlyPatients: 15430,
  activeDoctors: 28,
  notifications: [
    { id: 1, title: 'Pasien Baru', message: 'Andi Pratama mendaftar jam 09:00' },
    { id: 2, title: 'Stok Obat', message: 'Paracetamol tersisa 23 tablet' }
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
  }
};

export default function DashboardLayout() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

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

    // Tambahkan event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Bersihkan event listener saat komponen unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Dashboard RS Sehat Bahagia</h1>

        {/* Profile & Notifikasi */}
        <div className="flex items-center gap-4">
          {/* Notifikasi */}
          <div className="relative" ref={notificationDropdownRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <BellIcon className="h-6 w-6 text-black" />
              {dummyData.notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5">
                  {dummyData.notifications.length}
                </span>
              )}
            </button>

            {/* Notifikasi Popup */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-lg p-4 z-50">
                <h3 className="font-semibold text-black mb-4">Notifikasi Terbaru</h3>
                <div className="space-y-3">
                  {dummyData.notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsNotificationOpen(false)} // Tutup dropdown setelah diklik
                    >
                      <p className="text-sm font-medium text-black">{notif.title}</p>
                      <p className="text-sm text-black">{notif.message}</p>
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
              <UserCircleIcon className="h-8 w-8 text-black" />
              <span className="text-black">Dr. Sarah Wijaya</span>
            </button>

            {/* Dropdown Profile */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                  onClick={() => setIsProfileOpen(false)} // Tutup dropdown setelah diklik
                >
                  Pengaturan
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                  onClick={() => setIsProfileOpen(false)} // Tutup dropdown setelah diklik
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
        />
        <StatCard
          icon={<ChartBarIcon className="h-6 w-6 text-black" />}
          title="Bulanan"
          value={dummyData.monthlyPatients}
          trend="stable"
        />
        <StatCard
          icon={<CalendarIcon className="h-6 w-6 text-black" />}
          title="Tahunan"
          value={dummyData.yearlyPatients}
          trend="up"
        />
        <StatCard
          icon={<BeakerIcon className="h-6 w-6 text-black" />}
          title="Dokter Aktif"
          value={dummyData.activeDoctors}
          trend="down"
        />
      </div>

      {/* Grafik */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-black">Statistik Pasien Minggu Ini</h2>
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'daily' | 'weekly' | 'monthly')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
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
              <XAxis dataKey="name" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip contentStyle={{ color: '#000' }} />
              <Bar dataKey="pasien" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Komponen StatCard Terpisah
const StatCard = ({ icon, title, value, trend }: { icon: JSX.Element; title: string; value: number; trend: string }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 mb-2">{title}</p>
          <p className="text-3xl font-bold text-black">{value}</p>
        </div>
        <div className={`p-2 rounded-full ${trendColors[trend]?.bg || 'bg-gray-100'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-sm ${trendColors[trend]?.text || 'text-gray-500'}`}>
          {trend === 'up' ? '↑ 12%' : trend === 'down' ? '↓ 5%' : '→ Stabil'}
        </span>
      </div>
    </div>
  );
};

const trendColors = {
  up: { bg: 'bg-green-100', text: 'text-green-600' },
  down: { bg: 'bg-red-100', text: 'text-red-600' },
  stable: { bg: 'bg-blue-100', text: 'text-blue-600' }
};