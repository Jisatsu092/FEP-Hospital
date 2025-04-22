'use client';
import React, { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import {
  ClockIcon,
  UserGroupIcon,
  BeakerIcon,
  BookOpenIcon,
  TruckIcon,
  CurrencyDollarIcon,
  StarIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";


interface Doctor {
  id: number;
  name: string;
  photo: string;
  specialization: string;
  experience: string;
  education: string;
  schedule: string;
  rating: number;
}

const doctors = [
  {
    id: 1,
    name: 'Dr. Ahmad Budiman',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Kardiologi',
    experience: '12 Tahun',
    education: 'Spesialis Jantung, Universitas Indonesia',
    schedule: 'Senin-Jumat (08:00 - 15:00)',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Dr. Siti Maharani',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Pediatri',
    experience: '9 Tahun',
    education: 'Spesialis Anak, Universitas Gadjah Mada',
    schedule: 'Senin-Kamis (09:00 - 14:00)',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Dr. Budi Santoso',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Ortopedi',
    experience: '15 Tahun',
    education: 'Spesialis Tulang, Universitas Airlangga',
    schedule: 'Selasa-Jumat (10:00 - 16:00)',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Dr. Dewi Lestari',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Ginekologi',
    experience: '10 Tahun',
    education: 'Spesialis Kandungan, Universitas Padjadjaran',
    schedule: 'Senin-Rabu (08:00 - 12:00)',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Dr. Hendra Wirawan',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Neurologi',
    experience: '13 Tahun',
    education: 'Spesialis Saraf, Universitas Indonesia',
    schedule: 'Rabu-Sabtu (11:00 - 17:00)',
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Dr. Ayu Prameswari',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Dermatologi',
    experience: '8 Tahun',
    education: 'Spesialis Kulit, Universitas Diponegoro',
    schedule: 'Senin-Jumat (09:00 - 13:00)',
    rating: 4.6,
  },
  {
    id: 7,
    name: 'Dr. Fajar Nugroho',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Pulmonologi',
    experience: '11 Tahun',
    education: 'Spesialis Paru, Universitas Hasanuddin',
    schedule: 'Selasa-Kamis (08:00 - 12:00)',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Dr. Rina Kartika',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Oftalmologi',
    experience: '10 Tahun',
    education: 'Spesialis Mata, Universitas Andalas',
    schedule: 'Senin-Jumat (13:00 - 17:00)',
    rating: 4.9,
  },
  {
    id: 9,
    name: 'Dr. Tommy Gunawan',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Gastroenterologi',
    experience: '14 Tahun',
    education: 'Spesialis Pencernaan, Universitas Brawijaya',
    schedule: 'Senin-Kamis (10:00 - 15:00)',
    rating: 4.8,
  },
  {
    id: 10,
    name: 'Dr. Maya Andriani',
    photo: '/public/assets/dk1.jpg',
    specialization: 'Psikiatri',
    experience: '7 Tahun',
    education: 'Spesialis Kejiwaan, Universitas Udayana',
    schedule: 'Selasa-Jumat (09:00 - 13:00)',
    rating: 4.7,
  },
];

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<Service>(services[0]);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#D1F8EF]">
      {/* Home Section - Full Screen */}
      <section className="h-screen bg-gradient-to-r from-[#3674B5] to-[#578FCA] text-white flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between w-full">

          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">
              RS Sehat Bahagia
            </h1>
            <p className="text-xl md:text-3xl mb-8 font-medium text-blue-100">
              Pelayanan Kesehatan Terpadu 24 Jam
            </p>
            <p className="text-lg md:text-xl text-blue-200 max-w-xl mx-auto lg:mx-0">
              "Kesehatan Anda adalah Prioritas Kami. Memberikan Pelayanan
              Terbaik dengan Teknologi Modern dan Tenaga Medis Berpengalaman"
            </p>

            {/* Call to Action Button */}
            <button
              className="mt-8 bg-white text-blue-800 px-8 py-3 rounded-full 
        font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg
        hover:shadow-xl"
            >
              Jadwalkan Konsultasi
            </button>
          </div>

          {/* Cloud Shape with Doctor Icon */}
          <div className="lg:w-1/2 flex justify-center relative">
            {/* Cloud Shape */}
            <div
              className="w-96 h-96 bg-gradient-to-br from-white/20 to-white/10 
        rounded-full flex items-center justify-center backdrop-blur-lg 
        animate-float"
            >
              {/* Doctor Icon */}
              <div className="bg-white p-8 rounded-full shadow-2xl">
                <img
                  src="/assets/docters.svg"
                  className="h-48 w-48 object-cover rounded-full"
                  alt="Doctor"
                />
              </div>
            </div>

            {/* Decorative Circles */}
            <div
              className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full 
        animate-pulse"
            ></div>
            <div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/15 rounded-full 
        animate-pulse-delay"
            ></div>
          </div>
        </div>
      </section>

      {/* Services Section - Full Screen */}
      <section className="h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Column */}
            <div className="flex flex-col h-full">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#3674B5] mb-6 px-4">
                Layanan Kami
              </h2>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-3 gap-3 flex-1 overflow-y-auto p-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`group relative h-28 flex flex-col items-center justify-center rounded-xl transition-all duration-300
                      ${
                        selectedService.id === service.id
                          ? "bg-[#3674B5] shadow-lg"
                          : "bg-white hover:bg-[#A1E3F9] hover:shadow-md"
                      }`}
                  >
                    {/* Icon Container */}
                    <div
                      className={`transition-all duration-300 ${
                        selectedService.id === service.id
                          ? "-translate-y-2"
                          : "group-hover:-translate-y-1"
                      }`}
                    >
                      {React.cloneElement(service.icon, {
                        className: `h-10 w-10 transition-colors duration-300 ${
                          selectedService.id === service.id
                            ? "text-white"
                            : "text-[#3674B5] group-hover:text-[#578FCA]"
                        }`,
                      })}
                    </div>

                    {/* Title */}
                    <div
                      className={`absolute w-full px-2 transition-all duration-300 ${
                        selectedService.id === service.id
                          ? "opacity-100 bottom-4"
                          : "opacity-0 bottom-1"
                      }`}
                    >
                      <span
                        className={`block text-xs font-medium text-center ${
                          selectedService.id === service.id
                            ? "text-white"
                            : "text-[#3674B5]"
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 h-full flex flex-col border-2 border-[#A1E3F9]">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#3674B5] mb-4">
                {selectedService.title}
              </h2>

              <ul className="space-y-3 flex-1 overflow-y-auto pr-2 mb-4">
                {selectedService.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start p-2 rounded-lg bg-[#A1E3F9]/30 hover:bg-[#578FCA]/20 transition-colors"
                  >
                    <StarIcon className="h-4 w-4 text-[#3674B5] flex-shrink-0 mt-1 mr-2" />
                    <span className="text-[#3674B5] text-sm lg:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button Janji Temu */}
              <div className="mt-auto">
                <button
                  className="w-full bg-[#3674B5] hover:bg-[#2b5d91] text-white 
        px-6 py-3 rounded-lg font-semibold transition-all duration-300
        flex items-center justify-center gap-2
        transform hover:scale-[1.02] focus:ring-2 focus:ring-[#578FCA] focus:ring-offset-2"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                  Janji Temu Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Doctors Section */}
<section className="h-screen py-12 px-4 bg-[#D1F8EF]">
  <div className="max-w-7xl mx-auto h-full flex flex-col">
    <h2 className="text-3xl lg:text-4xl font-bold text-[#3674B5] mb-8 px-4 text-center">
      Dokter Spesialis Kami
    </h2>

    <div className="flex-1 relative overflow-hidden">
    <motion.div 
  className="flex gap-8 absolute top-0 left-0"
  animate={{
    x: ['0%', '-100%']
  }}
  transition={{
    duration: 30,
    repeat: Infinity,
    ease: 'linear'
  }}
  style={{
    width: `${doctors.length * 320}px`
  }}
>
  {[...doctors, ...doctors].map((doctor, index) => (
    <motion.div
      key={`${doctor.id}-${index}`}
      className="w-64 h-80 shrink-0 cursor-pointer perspective"
      onClick={() => handleFlip(doctor.id)}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: flippedCards[doctor.id] ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' } as React.CSSProperties}
      >
              {/* Front Side */}
              <div className="absolute w-full h-full bg-white rounded-2xl shadow-lg p-6 backface-hidden flex flex-col items-center z-10">
                <img 
                  src={doctor.photo}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#3674B5]"
                  alt={doctor.name}
                />
                <h3 className="text-xl font-bold text-[#3674B5] mb-2">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {doctor.specialization}
                </p>
                <div className="mt-4 flex gap-2 items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-gray-600">
                    {doctor.rating}/5
                  </span>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full bg-[#A1E3F9] rounded-2xl shadow-lg p-6 backface-hidden rotate-y-180 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#3674B5] mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Pengalaman: {doctor.experience}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    Pendidikan: {doctor.education}
                  </p>
                  <p className="text-sm text-gray-700">
                    Jadwal: {doctor.schedule}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
</section>

<section>
<footer className="w-full bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Layanan */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#3674B5] uppercase opacity-80 mb-4">
              Layanan Kami
            </h3>
            <ul className="space-y-2">
              {['IGD 24 Jam', 'Rawat Inap', 'Poliklinik', 'Laboratorium'].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3674B5] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Dokter */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#3674B5] uppercase opacity-80 mb-4">
              Dokter Kami
            </h3>
            <ul className="space-y-2">
              {['Kardiologi', 'Pediatri', 'Ortopedi', 'Neurologi'].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3674B5] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Informasi */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#3674B5] uppercase opacity-80 mb-4">
              Informasi
            </h3>
            <ul className="space-y-2">
              {['Blog Medis', 'Promo Kesehatan', 'Artikel', 'FAQ'].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3674B5] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Kontak */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#3674B5] uppercase opacity-80 mb-4">
              Kontak
            </h3>
            <div className="text-gray-600 space-y-2">
              <p>📞 (022) 1234-5678</p>
              <p>📧 info@rssehatbahagia.com</p>
              <p>📍 Jl. Kesehatan No. 123, Bandung</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            {/* Copyright */}
            <p className="text-gray-600 text-sm text-center mb-4 md:mb-0">
              © {new Date().getFullYear()} RS Sehat Bahagia. All rights reserved.
            </p>

            {/* Social Media */}
            <div className="flex space-x-6">
              <a href="#" className="text-[#3674B5] hover:text-[#2b5d91] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              
              <a href="#" className="text-[#3674B5] hover:text-[#2b5d91] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                </svg>
              </a>

              <a href="#" className="text-[#3674B5] hover:text-[#2b5d91] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
</section>

    </div>
  );
}

interface Service {
  id: number;
  title: string;
  icon: JSX.Element;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: "IGD 24 Jam",
    icon: <ClockIcon className="h-16 w-16" />,
    features: [
      "Respon cepat <15 menit",
      "Tenaga spesialis standby",
      "Ambulans gawat darurat",
      "Ruangan steril",
      "Monitoring pasien real-time",
      "Pendaftaran cepat",
      "Prioritas kasus kritis",
      "Peralatan penunjang lengkap",
      "Tersedia ruang observasi",
    ],
  },
  {
    id: 2,
    title: "Poliklinik Umum",
    icon: <UserGroupIcon className="h-16 w-16" />,
    features: [
      "Pemeriksaan rutin",
      "Konsultasi gratis",
      "Resep digital",
      "Antrian online",
      "Ruang tunggu nyaman",
      "Dokter umum berpengalaman",
      "Layanan vaksinasi",
      "Pemeriksaan laboratorium ringan",
    ],
  },
  {
    id: 3,
    title: "Laboratorium",
    icon: <BeakerIcon className="h-16 w-16" />,
    features: [
      "Hasil <1 jam",
      "PCR & Rapid Test",
      "Petugas bersertifikat",
      "Peralatan canggih",
      "Tes darah lengkap",
      "Pemeriksaan urine & feses",
      "Tes fungsi hati & ginjal",
      "Pengambilan sampel aman & cepat",
      "Penyimpanan data digital",
    ],
  },
  {
    id: 4,
    title: "Rawat Inap",
    icon: <BookOpenIcon className="h-16 w-16" />,
    features: [
      "Kamar VIP & reguler",
      "Layanan makanan 3x sehari",
      "Monitoring pasien 24 jam",
      "Kunjungan dokter harian",
      "AC & fasilitas lengkap",
      "Kamar keluarga tersedia",
      "Tenaga medis standby",
      "Kebersihan kamar terjaga",
      "Akses TV & hiburan",
    ],
  },
  {
    id: 5,
    title: "Ambulans 24 Jam",
    icon: <TruckIcon className="h-16 w-16" />,
    features: [
      "Respon cepat ke lokasi",
      "Tenaga medis onboard",
      "Peralatan medis darurat",
      "Layanan antar jemput pasien",
      "Koneksi langsung ke IGD",
      "Koordinasi rujukan rumah sakit",
      "GPS & sistem pelacakan",
      "Ambulans gawat & biasa tersedia",
    ],
  },
  {
    id: 6,
    title: "Konsultasi Dokter",
    icon: <UserGroupIcon className="h-16 w-16" />,
    features: [
      "Dokter spesialis lengkap",
      "Jadwal fleksibel",
      "Konsultasi offline/online",
      "Layanan ramah & profesional",
      "Diskusi hasil pemeriksaan",
      "Tersedia via video call",
      "Follow-up terjadwal",
      "Integrasi dengan apotek",
    ],
  },
  {
    id: 7,
    title: "Pelayanan 24 Jam",
    icon: <ClockIcon className="h-16 w-16" />,
    features: [
      "IGD nonstop",
      "Apotek buka 24 jam",
      "Layanan medis malam hari",
      "Call center aktif terus",
      "Dokter jaga malam tersedia",
      "Penanganan tanpa batas waktu",
      "Fasilitas steril 24/7",
      "Keamanan & satpam siaga",
    ],
  },
  {
    id: 8,
    title: "Biaya Transparan",
    icon: <CurrencyDollarIcon className="h-16 w-16" />,
    features: [
      "Estimasi biaya awal",
      "Tanpa biaya tersembunyi",
      "Diskon BPJS & asuransi",
      "Konsultasi billing gratis",
      "Laporan rinci setiap layanan",
      "Pembayaran non-tunai",
      "Kebijakan refund jelas",
      "Cicilan pembayaran tersedia",
    ],
  },
  {
    id: 9,
    title: "Perawatan Jantung",
    icon: <HeartIcon className="h-16 w-16" />,
    features: [
      "Kateterisasi jantung",
      "Pemasangan ring",
      "Rehabilitasi kardiovaskular",
      "Pemeriksaan EKG 24 jam",
      "Konsultasi dokter spesialis jantung",
      "Tes treadmill & echocardiography",
      "Monitoring tekanan darah & detak jantung",
      "Tersedia ICU khusus jantung",
      "Diet & edukasi pasien",
    ],
  },
  
];