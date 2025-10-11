import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--gray-300)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="HolTime Logo" className="h-8" />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-[var(--gray-700)] hover:text-[var(--gray-900)] font-medium"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-[var(--accent-coral)] text-white rounded-lg hover:bg-[#F97316] font-medium"
            >
              Coba Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-[var(--gray-900)] mb-6">
          Sistem Booking Paling Simpel
          <br />
          untuk Bisnis Anda
        </h1>
        <p className="text-xl text-[var(--gray-700)] mb-8 max-w-2xl mx-auto">
          Kelola janji temu dengan mudah. Otomatis kirim konfirmasi dan
          pengingat. Tanpa ribet, tanpa mahal.
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-4 bg-[var(--accent-coral)] text-white text-lg font-semibold rounded-lg hover:bg-[#F97316] transition-colors shadow-lg"
        >
          Coba Gratis 14 Hari
        </Link>
        <p className="text-sm text-[var(--gray-500)] mt-4">
          Tanpa kartu kredit. Setup 5 menit.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-[var(--gray-900)] mb-12">
          Semua yang Anda Butuhkan
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg border border-[var(--gray-300)]">
            <div className="w-12 h-12 bg-[var(--primary-pale)] rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[var(--primary-turquoise)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                  strokeWidth="2"
                />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2">
              Takvim Otomatis
            </h3>
            <p className="text-[var(--gray-700)]">
              Atur jam kerja sekali, sistem otomatis tampilkan slot tersedia.
              Mudah dan cepat.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg border border-[var(--gray-300)]">
            <div className="w-12 h-12 bg-[var(--primary-pale)] rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[var(--primary-turquoise)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2">
              Email Otomatis
            </h3>
            <p className="text-[var(--gray-700)]">
              Konfirmasi langsung terkirim. Pengingat 24 jam sebelum janji temu.
              Tanpa lupa.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg border border-[var(--gray-300)]">
            <div className="w-12 h-12 bg-[var(--primary-pale)] rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[var(--primary-turquoise)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2">
              Dashboard Lengkap
            </h3>
            <p className="text-[var(--gray-700)]">
              Lihat semua janji temu dalam satu tempat. Filter, kelola, hubungi
              pelanggan.
            </p>
          </div>
        </div>
      </section>

      {/* YENİ: İdeal Untuk Bisnis Ini */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[var(--gray-900)] mb-4">
            Ideal untuk Bisnis Ini
          </h2>
          <p className="text-center text-[var(--gray-700)] mb-12 max-w-2xl mx-auto">
            Sistem kami dirancang khusus untuk bisnis yang membutuhkan manajemen
            janji temu sederhana dan efisien
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Bisnis Card 1 */}
            <div className="text-center p-6 rounded-lg border border-[var(--gray-300)] hover:border-[var(--primary-turquoise)] hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[var(--primary-pale)] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-[var(--primary-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)]">
                Salon & Barbershop
              </h3>
            </div>

            {/* Bisnis Card 2 */}
            <div className="text-center p-6 rounded-lg border border-[var(--gray-300)] hover:border-[var(--primary-turquoise)] hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[var(--primary-pale)] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-[var(--primary-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)]">
                Klinik & Spa
              </h3>
            </div>

            {/* Bisnis Card 3 */}
            <div className="text-center p-6 rounded-lg border border-[var(--gray-300)] hover:border-[var(--primary-turquoise)] hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[var(--primary-pale)] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-[var(--primary-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)]">
                Fotografer
              </h3>
            </div>

            {/* Bisnis Card 4 */}
            <div className="text-center p-6 rounded-lg border border-[var(--gray-300)] hover:border-[var(--primary-turquoise)] hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[var(--primary-pale)] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-[var(--primary-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)]">
                Studio Yoga
              </h3>
            </div>

            {/* Bisnis Card 5 */}
            <div className="text-center p-6 rounded-lg border border-[var(--gray-300)] hover:border-[var(--primary-turquoise)] hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[var(--primary-pale)] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-[var(--primary-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)]">
                Konsultan
              </h3>
            </div>

            {/* Bisnis Card 6 */}
            <div className="text-center p-6 rounded-lg border border-[var(--gray-300)] hover:border-[var(--primary-turquoise)] hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[var(--primary-pale)] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-[var(--primary-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)]">
                Les Privat
              </h3>
            </div>

            {/* Bisnis Card 7 */}
            <div className="text-center p-6 rounded-lg border border-[var(--gray-300)] hover:border-[var(--primary-turquoise)] hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[var(--primary-pale)] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-[var(--primary-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)]">
                Klinik Gigi
              </h3>
            </div>

            {/* Bisnis Card 8 */}
            <div className="text-center p-6 rounded-lg border border-[var(--gray-300)] hover:border-[var(--primary-turquoise)] hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[var(--primary-pale)] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-[var(--primary-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)]">
                Dan Lainnya
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* YENİ: Lihat HolTime dalam Aksi */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-[var(--gray-900)] mb-4">
          Lihat HolTime dalam Aksi
        </h2>
        <p className="text-center text-[var(--gray-700)] mb-12 max-w-2xl mx-auto">
          Begini tampilan sistem kami dari sisi pelanggan dan bisnis Anda
        </p>

        <div className="space-y-16">
          {/* Screenshot 1: Public Booking */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-[var(--gray-900)] mb-3">
                Pelanggan Booking dengan Mudah
              </h3>
              <p className="text-[var(--gray-700)] mb-4">
                Pelanggan Anda cukup klik link booking, pilih tanggal dan jam
                yang tersedia, lalu isi data diri. Sistem otomatis cek slot yang
                sudah penuh dan hanya tampilkan jam kosong.
              </p>
              <ul className="space-y-2 text-[var(--gray-700)]">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Tampilan responsif di semua perangkat
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Slot dulu otomatis tidak bisa dipilih
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Konfirmasi langsung via email
                </li>
              </ul>
            </div>
            <div className="bg-[var(--gray-100)] rounded-lg p-2 border-2 border-[var(--gray-300)]">
              <img
                src="/screenshot-booking.png"
                alt="Public Booking Interface"
                className="w-full rounded shadow-lg cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Screenshot 2: Dashboard */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <h3 className="text-2xl font-semibold text-[var(--gray-900)] mb-3">
                Dashboard Lengkap untuk Bisnis
              </h3>
              <p className="text-[var(--gray-700)] mb-4">
                Lihat semua janji temu hari ini, minggu ini, atau filter
                berdasarkan tanggal. Statistik real-time membantu Anda pantau
                bisnis dengan mudah.
              </p>
              <ul className="space-y-2 text-[var(--gray-700)]">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Statistik janji temu real-time
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Filter dan cari janji temu dengan mudah
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Hubungi pelanggan langsung via WhatsApp
                </li>
              </ul>
            </div>
            <div className="md:order-1 bg-[var(--gray-100)] rounded-lg p-2 border-2 border-[var(--gray-300)]">
              <img
                src="/screenshot-dashboard.png"
                alt="Dashboard Interface"
                className="w-full rounded shadow-lg cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Screenshot 3: Email Notifications */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-[var(--gray-900)] mb-3">
                Email Otomatis Tanpa Ribet
              </h3>
              <p className="text-[var(--gray-700)] mb-4">
                Sistem otomatis kirim email konfirmasi ke pelanggan dan Anda. 24
                jam sebelum janji temu, pengingat dikirim otomatis ke pelanggan.
              </p>
              <ul className="space-y-2 text-[var(--gray-700)]">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Konfirmasi otomatis saat booking
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Pengingat 24 jam sebelumnya
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Bahasa Indonesia yang jelas
                </li>
              </ul>
            </div>
            <div className="bg-[var(--gray-100)] rounded-lg p-2 border-2 border-[var(--gray-300)]">
              <img
                src="/screenshot-email.png"
                alt="Email Template"
                className="w-full rounded shadow-lg cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[var(--gray-900)] mb-12">
            Cara Kerja
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-turquoise)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
                Daftar Gratis
              </h3>
              <p className="text-[var(--gray-700)]">
                Buat akun dalam 2 menit. Tanpa kartu kredit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-turquoise)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
                Atur Jam Kerja
              </h3>
              <p className="text-[var(--gray-700)]">
                Tentukan kapan bisnis Anda buka. Sistem otomatis siap.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-turquoise)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
                Bagikan Link
              </h3>
              <p className="text-[var(--gray-700)]">
                Share link booking ke pelanggan. Mereka langsung bisa booking!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-[var(--gray-900)] mb-4">
          Harga Transparan
        </h2>
        <p className="text-center text-[var(--gray-700)] mb-12">
          Satu paket, semua fitur. Tanpa biaya tersembunyi.
        </p>

        <div className="max-w-md mx-auto bg-white border-2 border-[var(--primary-turquoise)] rounded-lg p-8">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[var(--gray-900)] mb-2">
              Rp 150.000
            </div>
            <div className="text-[var(--gray-700)]">per bulan</div>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[var(--gray-800)]">Unlimited booking</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[var(--gray-800)]">
                Email otomatis (konfirmasi + pengingat)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[var(--gray-800)]">Dashboard lengkap</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[var(--gray-800)]">
                Link booking sendiri
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[var(--gray-800)]">Support penuh</span>
            </li>
          </ul>

          <Link
            href="/register"
            className="block w-full py-3 bg-[var(--accent-coral)] text-white text-center font-semibold rounded-lg hover:bg-[#F97316] transition-colors"
          >
            Coba Gratis 14 Hari
          </Link>
          <p className="text-center text-sm text-[var(--gray-500)] mt-4">
            Tanpa kartu kredit
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--primary-turquoise)] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Mulai Otomasi Booking?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Bergabung dengan puluhan bisnis yang sudah percaya HolTime
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-white text-[var(--accent-coral)] text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-white"
          >
            Coba Gratis Sekarang
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--gray-900)] text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-xl font-bold mb-2">HolTime</div>
          <p className="text-gray-400 text-sm">
            Sistem booking paling simpel untuk bisnis Anda
          </p>
          <p className="text-gray-500 text-xs mt-4">
            © 2025 HolTime. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
