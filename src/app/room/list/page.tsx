'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Room {
  id: string;
  name: string;
  capacity: number;
  category: 'VIP' | 'Regular' | 'ICU';
  price: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
}

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const loadRooms = () => {
    try {
      const storedRooms = localStorage.getItem('rooms');
      if (storedRooms) {
        const parsedRooms: Room[] = JSON.parse(storedRooms);
        setRooms(parsedRooms.sort((a, b) => a.name.localeCompare(b.name)));
      }
      setIsLoading(false);
    } catch (error) {
      toast.error('Gagal memuat data ruangan');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
    window.addEventListener('storage', loadRooms);
    return () => window.removeEventListener('storage', loadRooms);
  }, []);

  const filteredRooms = rooms.filter(room => {
    const searchLower = searchTerm.toLowerCase();
    return (
      room.name.toLowerCase().includes(searchLower) ||
      room.id.toLowerCase().includes(searchLower) ||
      room.status.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus ruangan ini?')) {
      try {
        const updatedRooms = rooms.filter(room => room.id !== id);
        setRooms(updatedRooms);
        localStorage.setItem('rooms', JSON.stringify(updatedRooms));
        toast.success('Ruangan berhasil dihapus');
      } catch (error) {
        toast.error('Gagal menghapus ruangan');
      }
    }
  };

  const handleStatusChange = (id: string, status: Room['status']) => {
    try {
      const updatedRooms = rooms.map(room => 
        room.id === id ? { ...room, status } : room
      );
      setRooms(updatedRooms);
      localStorage.setItem('rooms', JSON.stringify(updatedRooms));
      toast.success('Status berhasil diperbarui');
    } catch (error) {
      toast.error('Gagal memperbarui status');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Ruangan</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="🔍 Cari ruangan..."
              className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Link href="/room/input" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Tambah Ruangan
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID Ruangan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama Ruangan</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Kapasitas</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Kategori</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Harga/Hari</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    Tidak ada data ruangan yang ditemukan
                  </td>
                </tr>
              )}
              {currentItems.map((room, index) => (
                <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">{indexOfFirstItem + index + 1}</td>
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">{room.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{room.name}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">{room.capacity} Orang</td>
                  <td className="px-6 py-4 text-center text-sm">
                    <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                      {room.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-700">
                    Rp{room.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <span className={`mr-2 inline-block h-3 w-3 rounded-full 
                        ${room.status === 'Available' ? 'bg-green-500' : 
                          room.status === 'Occupied' ? 'bg-red-500' : 
                          'bg-yellow-500'}`}></span>
                      <select
                        value={room.status}
                        onChange={(e) => handleStatusChange(room.id, e.target.value as Room['status'])}
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(room.status)}`}
                      >
                        <option value="Available">Tersedia</option>
                        <option value="Occupied">Terisi</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <Link
                      href={`/room/input/${room.id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors inline-flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors inline-flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
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
              Halaman {currentPage} dari {totalPages}
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

export default RoomList;