'use client'; // Tambahkan ini di komponen yang menggunakan Link

import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="bg-blue-600 p-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="text-white text-lg font-bold"
          >
            Hospital Management
          </Link>
          <div className="mt-4 space-x-4">
            <Link 
              href="/room/list" 
              className="text-white hover:underline"
            >
              Manajemen Ruangan
            </Link>
            <Link 
              href="/booking/list" 
              className="text-white hover:underline"
            >
              Reservasi
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;