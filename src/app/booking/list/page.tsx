'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { toast } from 'sonner';

interface Booking {
  id: string;
  roomId: string;
  userId: string;
  bookingDate: string;
  days: number;
  totalPrice: number;
  status: 'Active' | 'Completed' | 'Cancelled';
}

interface Room {
  id: string;
  name: string;
  status: 'Available' | 'Occupied' | 'Maintenance'; // Tambahkan status
}

interface User {
  id: string;
  name: string;
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const loadData = () => {
    try {
      const storedBookings = localStorage.getItem('bookings');
      const storedRooms = localStorage.getItem('rooms');
      const storedUsers = localStorage.getItem('users');

      if (storedBookings) setBookings(JSON.parse(storedBookings));
      if (storedRooms) setRooms(JSON.parse(storedRooms));
      if (storedUsers) setUsers(JSON.parse(storedUsers));
    } catch (error) {
      toast.error('Gagal memuat data');
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus booking ini?')) {
      try {
        // Cari booking yang akan dihapus
        const bookingToDelete = bookings.find(b => b.id === id);
        const updatedBookings = bookings.filter(b => b.id !== id);

        if (bookingToDelete) {
          // Update status ruangan ke Available
          const updatedRooms = rooms.map(room => 
            room.id === bookingToDelete.roomId 
              ? { ...room, status: 'Available' }
              : room
          );
          
          // Update state dan localStorage untuk rooms
          setRooms(updatedRooms);
          localStorage.setItem('rooms', JSON.stringify(updatedRooms));
        }

        // Update state dan localStorage untuk bookings
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        
        toast.success('Booking berhasil dihapus');
        // Trigger event untuk update di komponen lain
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        toast.error('Gagal menghapus booking');
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const searchLower = searchTerm.toLowerCase();
    const roomName = rooms.find(r => r.id === booking.roomId)?.name?.toLowerCase() || '';
    const userName = users.find(u => u.id === booking.userId)?.name?.toLowerCase() || '';
    
    return (
      roomName.includes(searchLower) ||
      userName.includes(searchLower) ||
      booking.id.toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Booking</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="🔍 Cari booking..."
              className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Link 
              href="/booking/input" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Buat Booking
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID Booking</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ruangan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pasien</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Durasi</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((booking, index) => {
                const room = rooms.find(r => r.id === booking.roomId);
                const user = users.find(u => u.id === booking.userId);
                
                return (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4 text-sm font-mono text-blue-600">{booking.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{room?.name || 'Tidak Ditemukan'}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user?.name || 'Tidak Ditemukan'}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                      {format(new Date(booking.bookingDate), 'dd MMM yyyy', { locale: id })}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">{booking.days} Hari</td>
                    <td className="px-6 py-4 text-right text-sm text-gray-700">
                      Rp{booking.totalPrice.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <Link
                        href={`/booking/input/${booking.id}`}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors inline-flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors inline-flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Hapus
                      </button>
                    </td>
                  </tr>
                )}
              )}
            </tbody>
          </table>
          
          {currentItems.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Tidak ada data booking yang ditemukan
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border rounded-md"
            >
              {[5, 10, 20, 50].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="text-sm text-gray-600">
              Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredBookings.length)} dari {filteredBookings.length} data
            </span>
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border hover:bg-gray-100 disabled:opacity-50"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border hover:bg-gray-100 disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;