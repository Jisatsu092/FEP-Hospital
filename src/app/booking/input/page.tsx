'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Room {
  id: string;
  name: string;
  capacity: number;
  category: 'VIP' | 'Regular' | 'ICU';
  price: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
}

interface Booking {
  id: string;
  roomId: string;
  userId: string;
  bookingDate: string;
  days: number;
  totalPrice: number;
}

const generateId = () => Date.now().toString();

const BookingInput = () => {
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [originalRoomId, setOriginalRoomId] = useState('');
  
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    roomId: '',
    userId: '',
    bookingDate: '',
    days: 1
  });
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Load data saat mode edit
  useEffect(() => {
    if (!params?.id) {
      // Reset form untuk mode create
      setFormData({
        roomId: '',
        userId: '',
        bookingDate: '',
        days: 1
      });
      return;
    }

    const loadBookingData = () => {
      try {
        const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
        const booking = bookings.find(b => b.id === params.id);
        
        if (booking) {
          setFormData({
            roomId: booking.roomId,
            userId: booking.userId,
            bookingDate: booking.bookingDate.split('T')[0],
            days: booking.days
          });
          setOriginalRoomId(booking.roomId);
          setIsEditing(true);
          
          const rooms: Room[] = JSON.parse(localStorage.getItem('rooms') || '[]');
          const room = rooms.find(r => r.id === booking.roomId);
          setSelectedRoom(room || null);
        } else {
          toast.error('Booking tidak ditemukan');
          router.push('/booking/list');
        }
      } catch (error) {
        toast.error('Gagal memuat data booking');
      }
    };

    loadBookingData();
  }, [params?.id]);

  // Load data ruangan dan user
  useEffect(() => {
    const loadResources = () => {
      try {
        const storedRooms = localStorage.getItem('rooms');
        const storedUsers = localStorage.getItem('users');
        
        if (storedRooms) setRooms(JSON.parse(storedRooms));
        if (storedUsers) setUsers(JSON.parse(storedUsers));
      } catch (error) {
        toast.error('Gagal memuat data pendukung');
      }
    };
    
    loadResources();
    window.addEventListener('storage', loadResources);
    return () => window.removeEventListener('storage', loadResources);
  }, []);

  // Update selected room saat roomId berubah
  useEffect(() => {
    const room = rooms.find(r => r.id === formData.roomId);
    setSelectedRoom(room || null);
  }, [formData.roomId, rooms]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!selectedRoom) {
        toast.error('Pilih ruangan terlebih dahulu');
        return;
      }

      const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
      const roomsData: Room[] = JSON.parse(localStorage.getItem('rooms') || '[]');

      if (isEditing) {
        // Mode edit
        const updatedRooms = roomsData.map(room => {
          if (room.id === originalRoomId) return { ...room, status: 'Available' };
          if (room.id === formData.roomId) return { ...room, status: 'Occupied' };
          return room;
        });
        
        const bookingData: Booking = {
          id: params.id as string,
          ...formData,
          bookingDate: new Date(formData.bookingDate).toISOString(),
          totalPrice: selectedRoom.price * formData.days
        };

        const updatedBookings = bookings.map(b => 
          b.id === params.id ? bookingData : b
        );
        
        localStorage.setItem('rooms', JSON.stringify(updatedRooms));
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        toast.success('Booking berhasil diperbarui');
      } else {
        // Mode create
        const newBooking: Booking = {
          id: generateId(),
          ...formData,
          bookingDate: new Date(formData.bookingDate).toISOString(),
          totalPrice: selectedRoom.price * formData.days
        };

        const updatedRooms = roomsData.map(room => 
          room.id === formData.roomId ? { ...room, status: 'Occupied' } : room
        );

        localStorage.setItem('rooms', JSON.stringify(updatedRooms));
        localStorage.setItem('bookings', JSON.stringify([...bookings, newBooking]));
        toast.success('Booking berhasil dibuat');
      }

      window.dispatchEvent(new Event('storage'));
      router.push('/booking/list');
    } catch (error) {
      toast.error('Gagal menyimpan booking');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isEditing ? 'Edit Reservasi' : 'Buat Reservasi Baru'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Pilih Ruangan */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Ruangan</label>
            <select 
              value={formData.roomId}
              onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Pilih Ruangan</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.name} - {room.status} (Rp{room.price.toLocaleString()}/hari)
                </option>
              ))}
            </select>
          </div>

          {/* Detail Status Ruangan */}
          {selectedRoom && (
            <div className="mb-4 p-4 bg-blue-50 rounded">
              <p className="font-semibold">
                Status Saat Ini: 
                <span className={`ml-2 px-3 py-1 rounded ${getStatusColor(selectedRoom.status)}`}>
                  {selectedRoom.status}
                </span>
              </p>
              <p className="mt-2">Kapasitas: {selectedRoom.capacity} orang</p>
              <p>Kategori: {selectedRoom.category}</p>
            </div>
          )}

          {/* Pilih Pasien */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pasien</label>
            <select 
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Pilih Pasien</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal & Durasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Tanggal Booking</label>
              <input 
                type="date" 
                value={formData.bookingDate}
                onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Durasi (Hari)</label>
              <input 
                type="number" 
                min="1"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Total Harga */}
          {selectedRoom && (
            <div className="mb-4 p-4 bg-green-50 rounded">
              <p className="text-lg font-semibold text-green-800">
                Total Biaya: Rp{(selectedRoom.price * formData.days).toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-green-600 mt-1">
                Harga per hari: Rp{selectedRoom.price.toLocaleString('id-ID')}
              </p>
            </div>
          )}

          {/* Tombol Submit */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => router.push('/booking/list')}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {isEditing ? 'Simpan Perubahan' : 'Buat Reservasi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingInput;