import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--gray-300)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-[var(--gray-900)]">
            HolTime
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
              className="px-6 py-2 bg-[var(--accent-coral)] text-white rounded-lg hover:bg-[#F97316] font-medium transition-colors"
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
        <p className="text-xl text-[var(--gray-600)] mb-8 max-w-2xl mx-auto">
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
            <p className="text-[var(--gray-600)]">
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
            <p className="text-[var(--gray-600)]">
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
            <p className="text-[var(--gray-600)]">
              Lihat semua janji temu dalam satu tempat. Filter, kelola, hubungi
              pelanggan.
            </p>
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
              <p className="text-[var(--gray-600)]">
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
              <p className="text-[var(--gray-600)]">
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
              <p className="text-[var(--gray-600)]">
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
        <p className="text-center text-[var(--gray-600)] mb-12">
          Satu paket, semua fitur. Tanpa biaya tersembunyi.
        </p>

        <div className="max-w-md mx-auto bg-white border-2 border-[var(--primary-turquoise)] rounded-lg p-8">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[var(--gray-900)] mb-2">
              Rp 150.000
            </div>
            <div className="text-[var(--gray-600)]">per bulan</div>
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
              <span className="text-[var(--gray-700)]">Unlimited booking</span>
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
              <span className="text-[var(--gray-700)]">
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
              <span className="text-[var(--gray-700)]">Dashboard lengkap</span>
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
              <span className="text-[var(--gray-700)]">
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
              <span className="text-[var(--gray-700)]">Support penuh</span>
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
