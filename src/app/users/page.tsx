'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  id: string;
  name: string;
  email: string;
}

const generateCustomId = (name: string): string => {
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

  return `2000-${firstTwoLetters}-${alphabetPosition}-${totalLetters}`;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [emailTouched, setEmailTouched] = useState(false);

  // Pagination calculations
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
          return;
        }

        const response = await fetch('/user.json');
        const data = await response.json();
        
        const usersWithCustomIds = data.map((user: any) => ({
          ...user,
          id: generateCustomId(user.name)
        }));
        
        setUsers(usersWithCustomIds);
        localStorage.setItem('users', JSON.stringify(usersWithCustomIds));
      } catch (error) {
        toast.error('Gagal memuat data awal');
      }
    };
    
    loadData();
  }, []);

  const handleOpenModal = (user?: User) => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
      setEditingUser(user);
      setEmailTouched(true);
    } else {
      setFormData({ name: '', email: '' });
      setEditingUser(null);
      setEmailTouched(false);
    }
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const newEmail = !emailTouched 
      ? `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`
      : formData.email;

    setFormData({
      name,
      email: newEmail
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (formData.name.split(/\s+/).length < 2) {
        toast.error('Nama harus terdiri dari minimal 2 kata');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('Format email tidak valid');
        return;
      }

      const emailExists = users.some(user => 
        user.email === formData.email && 
        (!editingUser || user.id !== editingUser.id)
      );

      if (emailExists) {
        toast.error('Email sudah terdaftar');
        return;
      }

      let updatedUsers: User[];
      
      if (editingUser) {
        updatedUsers = users.map(user => 
          user.id === editingUser.id ? { ...formData, id: user.id } : user
        );
        toast.success('Data berhasil diupdate!');
      } else {
        const newId = generateCustomId(formData.name);
        updatedUsers = [...users, { ...formData, id: newId }];
        toast.success('Data berhasil ditambahkan!');
      }

      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setIsModalOpen(false);
      setFormData({ name: '', email: '' });
      setCurrentPage(1);
      
    } catch (error) {
      toast.error('Terjadi kesalahan');
    }
  };

  const handleDelete = (id: string) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success('Data berhasil dihapus');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="🔍 Cari berdasarkan ID atau Nama..."
              className="w-full px-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
            >
              Tambah Data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-12">No</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID Unik</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nama</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">{user.id}</td>
                  <td className="px-4 py-3 text-sm">{user.name}</td>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-2 md:mb-0">
            <span className="text-sm text-gray-600">Tampilkan:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border rounded"
            >
              {[5, 10, 20, 50].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="text-sm text-gray-600">
              {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredUsers.length)} dari {filteredUsers.length}
            </span>
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 rounded border hover:bg-gray-100"
              disabled={currentPage === 1}
            >
              ←
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded border hover:bg-gray-100"
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {editingUser ? 'Edit Data' : 'Tambah Data Baru'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        placeholder="Contoh: John Doe"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="Contoh: john@example.com"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          setEmailTouched(true);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {editingUser ? 'Simpan Perubahan' : 'Tambahkan'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}