'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy register logic
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#3674B5] to-[#578FCA] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-[#3674B5] mb-6">Daftar Akun</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Nama Lengkap</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3674B5] text-white py-2 rounded-lg hover:bg-[#2b5d91] transition-colors"
          >
            Daftar
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Sudah punya akun? </span>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-[#3674B5] hover:underline"
            >
              Login disini
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}