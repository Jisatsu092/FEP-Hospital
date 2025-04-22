'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login validation
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#3674B5] to-[#578FCA] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-[#3674B5] mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3674B5] text-white py-2 rounded-lg hover:bg-[#2b5d91] transition-colors"
          >
            Masuk
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Belum punya akun? </span>
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="text-[#3674B5] hover:underline"
            >
              Daftar disini
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}