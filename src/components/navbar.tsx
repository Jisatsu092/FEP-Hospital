// components/Navbar.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

type MenuItem = {
  label: string;
  href?: string;
  subMenu?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
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

const notificationsDummyData = [
  { id: 1, title: 'Pasien Baru', message: 'Andi Pratama mendaftar jam 09:00' },
  { id: 2, title: 'Stok Obat', message: 'Paracetamol tersisa 23 tablet' },
];

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsDummyData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    if (accessToken) {
      setIsLoggedIn(true);
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    router.push('/login');
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    setIsNotificationOpen(false);
  };

  return (
    <nav className={`shadow-md ${isDarkMode ? 'bg-gray-900' : 'bg-blue-600'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-white">My Hospital</div>

        {/* Desktop Menu */}
        <ul className={`hidden md:flex space-x-6 ${isLoggedIn ? 'visible' : 'invisible'}`}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>

        {/* Right Side Controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className={`${isLoggedIn ? 'block' : 'hidden'} p-2 rounded-full hover:bg-blue-700 transition-all`}
            onClick={() => setIsDarkMode(!isDarkMode)}
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
                className="h-6 w-6 text-white"
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

          <div className={`${isLoggedIn ? 'block' : 'hidden'} relative`} ref={notificationDropdownRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 hover:bg-blue-700 rounded-full transition-all"
            >
              <BellIcon className="h-6 w-6 text-white" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5">
                  {notifications.length}
                </span>
              )}
            </button>
            {isNotificationOpen && (
              <div
                className={`absolute right-0 top-10 w-80 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl shadow-lg p-4 z-50`}
              >
                <h3 className="font-semibold mb-4 text-gray-700 dark:text-white">
                  Notifikasi Terbaru
                </h3>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-lg cursor-pointer ${
                        isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
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

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all"
                >
                  {userData?.image ? (
                    <img
                      src={userData.image}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="h-8 w-8 text-white" />
                  )}
                  <span className="text-white">
                    {userData?.firstName || 'Account'}
                  </span>
                </button>
                {isProfileOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } rounded-md shadow-lg py-1 z-50`}
                  >
                    <Link
                      href="/profile"
                      className={`block px-4 py-2 ${
                        isDarkMode
                          ? 'text-white hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-blue-100'
                      } transition-colors duration-200`}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Pengaturan
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 ${
                        isDarkMode
                          ? 'text-white hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-blue-100'
                      } transition-colors duration-200`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/register">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                    Daftar
                  </button>
                </Link>
                <Link href="/login">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                    Masuk
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
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

        {/* Mobile Menu Content */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:hidden absolute top-16 left-0 w-full bg-white shadow-lg ${
            isLoggedIn ? 'visible' : 'invisible'
          }`}
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
          <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-50">
            {item.subMenu.map((subItem, index) => (
              <li key={index}>
                <a
                  href={subItem.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800"
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
        className="text-white hover:text-gray-200"
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
          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
        >
          {item.label}
        </button>
        {isSubMenuOpen && (
          <ul className="pl-4 pt-2 pb-2 space-y-1">
            {item.subMenu.map((subItem, index) => (
              <li key={index}>
                <a
                  href={subItem.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
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
        className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
      >
        {item.label}
      </a>
    </li>
  );
};

export default Navbar;