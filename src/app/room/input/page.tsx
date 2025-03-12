'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';

interface Room {
  id: string;
  name: string;
  capacity: number;
  category: 'VIP' | 'Regular' | 'ICU';
  price: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
}

const generateRoomId = (name: string): string => {
  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length < 2) {
    throw new Error('Nama harus terdiri dari minimal 2 kata');
  }
  const firstTwoLetters = nameParts
    .map(part => part.slice(0, 2).toUpperCase())
    .join('-');
  const alphabetPosition = nameParts
    .map(part => part.charCodeAt(0) - 64)
    .join('-');
  const totalLetters = name.replace(/\s/g, '').length;
  return `ROOM-${firstTwoLetters}-${alphabetPosition}-${totalLetters}`;
};

const RoomInput = () => {
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [roomId, setRoomId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    category: 'VIP' as Room['category'],
    price: '',
    status: 'Available' as Room['status']
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params?.id) {
      setIsEditing(true);
      setRoomId(params.id as string);
      
      const storedRooms = JSON.parse(localStorage.getItem('rooms') || '[]');
      const existingRoom = storedRooms.find(
        (room: Room) => room.id === params.id
      );

      if (existingRoom) {
        setFormData({
          name: existingRoom.name,
          capacity: existingRoom.capacity.toString(),
          category: existingRoom.category,
          price: existingRoom.price.toString(),
          status: existingRoom.status
        });
      } else {
        toast.error('Ruangan tidak ditemukan');
        router.push('/room/list');
      }
    }
  }, [params?.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (formData.name.split(/\s+/).length < 2) {
      toast.error('Nama harus terdiri dari minimal 2 kata');
      return;
    }

    const storedRooms = JSON.parse(localStorage.getItem('rooms') || '[]');
    
    // Cek duplikasi nama (kecuali saat edit)
    if (!isEditing && storedRooms.some(
      (room: Room) => room.name.toLowerCase() === formData.name.toLowerCase()
    )) {
      toast.error('Nama ruangan sudah ada');
      return;
    }

    // Membuat/memperbarui ruangan
    const updatedRoom = {
      id: isEditing ? roomId : generateRoomId(formData.name),
      name: formData.name,
      capacity: Number(formData.capacity),
      category: formData.category,
      price: Number(formData.price),
      status: formData.status
    };

    const updatedRooms = isEditing
      ? storedRooms.map((room: Room) => 
          room.id === roomId ? updatedRoom : room
        )
      : [...storedRooms, updatedRoom];

    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    toast.success(`Ruangan berhasil ${isEditing ? 'diperbarui' : 'ditambahkan'}`);
    router.push('/room/list');
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isEditing ? 'Edit Ruangan' : 'Tambah Ruangan Baru'}
          </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Nama Ruangan */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nama Ruangan</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: VIP Room 101 (minimal 2 kata)"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Kapasitas */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Kapasitas Pasien</label>
            <input 
              type="number" 
              value={formData.capacity}
              onChange={(e) => setFormData({ 
                ...formData, 
                capacity: e.target.value 
              })}
              placeholder="Contoh: 2 (angka saja)"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Kategori */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Kategori Ruangan</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ 
                ...formData, 
                category: e.target.value as Room['category'] 
              })}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="VIP">VIP</option>
              <option value="Regular">Regular</option>
              <option value="ICU">ICU</option>
            </select>
          </div>

          {/* Harga */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Harga per Hari (Rp)</label>
            <input 
              type="number" 
              value={formData.price}
              onChange={(e) => setFormData({ 
                ...formData, 
                price: e.target.value 
              })}
              placeholder="Contoh: 1500000 (tanpa titik atau koma)"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Status Ketersediaan</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({ 
                ...formData, 
                status: e.target.value as Room['status'] 
              })}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Available">Tersedia</option>
              <option value="Occupied">Terisi</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Tombol Simpan */}
          <div className="flex justify-center">
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full md:w-auto px-6 py-3 rounded-lg transition 
                         ${isLoading 
                           ? 'bg-gray-400 cursor-not-allowed' 
                           : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500'
                         } text-white font-semibold`}
            >
              {isLoading ? 'Menyimpan...' : 'Simpan Data Ruangan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomInput;