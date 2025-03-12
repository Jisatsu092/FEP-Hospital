'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type MenuItem = {
  label: string;
  href?: string;
  subMenu?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/' },
  {
    label: 'Master',
    subMenu: [
      { label: 'Data Pasien', href: '/users' },
      { label: 'Data Dokter', href: '/master/dokter' },
      { label: 'Data Perawat', href: '/master/perawat' },
      { label: 'Data Obat', href: '/master/obat' },
      { label: 'Data Ruangan', href: '/room/list' },
    ],
  },
  {
    label: 'Pelayanan',
    subMenu: [
      { label: 'Pendaftaran Pasien', href: '/pelayanan/pendaftaran-pasien' },
      { label: 'Rekam Medis', href: '/pelayanan/rekam-medis' },
      { label: 'Jadwal Dokter', href: '/pelayanan/jadwal-dokter' },
      { label: 'Rawat Inap', href: '/booking/list' },
    ],
  },
  {
    label: 'Laporan',
    subMenu: [
      { label: 'Laporan Keuangan', href: '/laporan/keuangan' },
      { label: 'Laporan Pasien', href: '/laporan/pasien' },
      { label: 'Laporan Obat', href: '/laporan/obat' },
    ],
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-white">My Hospital</div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:hidden absolute top-16 left-0 w-full bg-white shadow-lg`}
        >
          <ul className="py-4">
            {menuItems.map((item, index) => (
              <MobileMenuItem key={index} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const MenuItem: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  // Menutup submenu saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsSubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (item.subMenu) {
    return (
      <li className="relative group" ref={ref}>
        <button
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          className="flex items-center text-white hover:text-gray-200"
        >
          {item.label}
          <svg
            className="ml-1 h-4 w-4 transition-transform duration-300 transform"
            style={{ rotate: isSubMenuOpen ? '180deg' : '0deg' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isSubMenuOpen && (
          <ul
            className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-50 overflow-hidden animate-fadeIn"
            style={{
              maxWidth: 'calc(100vw - 2rem)', // Memastikan tidak melebihi lebar viewport
              right: '0', // Menyesuaikan posisi ke kanan jika diperlukan
            }}
          >
            {item.subMenu.map((subItem, index) => (
              <li key={index}>
                <a
                  href={subItem.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
                >
                  {subItem.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        className="text-white hover:text-gray-200 transition-colors duration-200"
      >
        {item.label}
      </a>
    </li>
  );
};

const MobileMenuItem: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  if (item.subMenu) {
    return (
      <li>
        <button
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
        >
          {item.label}
        </button>
        {isSubMenuOpen && (
          <ul className="pl-4 pt-2 pb-2 space-y-1">
            {item.subMenu.map((subItem, index) => (
              <li key={index}>
                <a
                  href={subItem.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800 rounded transition-colors duration-200"
                >
                  {subItem.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
      >
        {item.label}
      </a>
    </li>
  );
};

export default Navbar;