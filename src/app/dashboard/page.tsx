'use client';
import { useState, useRef, JSX } from 'react';
import {
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
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard RS Sehat Bahagia</h1>
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

      {/* Grafik Pasien Minggu Ini */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
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
              <XAxis dataKey="name" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip contentStyle={{ color: '#000' }} />
              <Bar dataKey="pasien" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Pie Penyakit & Line Chart Pemasukan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart Pie Penyakit */}
        <div className="p-6 rounded-xl shadow-sm bg-white h-96">
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
        <div className="p-6 rounded-xl shadow-sm bg-white h-96">
          <h2 className="text-xl font-semibold mb-4">Pemasukan Bulanan</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData.revenueData}>
              <XAxis dataKey="name" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip contentStyle={{ color: '#000' }} />
              <Line type="monotone" dataKey="uv" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

type TrendType = 'up' | 'down' | 'stable';

const StatCard = ({
  icon,
  title,
  value,
  trend,
}: {
  icon: JSX.Element;
  title: string;
  value: number;
  trend: TrendType;
}) => {
  return (
    <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-2">{title}</p>
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
  stable: { bg: 'bg-blue-100', text: 'text-blue-600' },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];