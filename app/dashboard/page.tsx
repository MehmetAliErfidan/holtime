import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!business) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <p className="text-[var(--accent-red)]">
              Business data not found. Please contact support.
            </p>
          </Card>
        </div>
      </main>
    );
  }

  // Trial durumu
  const trialEnd = new Date(business.trial_end);
  const now = new Date();
  const daysLeft = Math.ceil(
    (trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Bugünün tarihi
  const today = new Date().toISOString().split("T")[0];

  // Bu haftanın başlangıcı (Pazartesi)
  const startOfWeek = new Date();
  const dayOfWeek = startOfWeek.getDay(); // 0 = Pazar, 1 = Senin, ..., 6 = Sabtu
  // Eğer Pazar ise (0), geriye 6 gün git (önceki Pazartesi)
  // Değilse, (dayOfWeek - 1) kadar geriye git
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(startOfWeek.getDate() - daysToMonday);
  const startOfWeekStr = startOfWeek.toISOString().split("T")[0];

  const endOfWeek = new Date();
  const daysToSunday = 7 - endOfWeek.getDay(); // Pazar'a kaç gün var
  endOfWeek.setDate(endOfWeek.getDate() + daysToSunday);
  const endOfWeekStr = endOfWeek.toISOString().split("T")[0];

  // Stats: Bugün, bu hafta, toplam
  const { count: todayCount } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("business_id", business.id)
    .eq("appointment_date", today)
    .eq("status", "confirmed");

  const { count: weekCount } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("business_id", business.id)
    .gte("appointment_date", startOfWeekStr)
    .lte("appointment_date", endOfWeekStr)
    .eq("status", "confirmed");

  const { count: totalCount } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("business_id", business.id)
    .eq("status", "confirmed");

  // Bugünkü randevular (ilk 5)
  const { data: todayAppointments } = await supabase
    .from("appointments")
    .select("*")
    .eq("business_id", business.id)
    .eq("appointment_date", today)
    .eq("status", "confirmed")
    .order("appointment_time", { ascending: true })
    .limit(5);

  return (
    <main className="min-h-screen p-8 bg-[var(--gray-50)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--gray-900)]">
            Dashboard
          </h1>
          <p className="text-[var(--gray-500)] mt-1">
            Selamat datang, {business.name}
          </p>
        </div>

        {/* Trial Status */}
        {business.subscription_status === "trial" && daysLeft > 0 && (
          <Card className="mb-6 bg-[var(--primary-pale)] border-[var(--primary-turquoise)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[var(--gray-900)]">
                  Trial Aktif
                </h3>
                <p className="text-sm text-[var(--gray-700)] mt-1">
                  {daysLeft} hari tersisa dari trial gratis Anda
                </p>
              </div>
              <div className="text-2xl font-bold text-[var(--primary-turquoise)]">
                {daysLeft} hari
              </div>
            </div>
          </Card>
        )}

        {/* Trial Status */}
        {business.subscription_status === "trial" && daysLeft > 0 && (
          <Card className="mb-6 bg-[var(--primary-pale)] border-[var(--primary-turquoise)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[var(--gray-900)]">
                  Trial Aktif
                </h3>
                <p className="text-sm text-[var(--gray-700)] mt-1">
                  {daysLeft} hari tersisa dari trial gratis Anda
                </p>
              </div>
              <div className="text-2xl font-bold text-[var(--primary-turquoise)]">
                {daysLeft} hari
              </div>
            </div>
          </Card>
        )}

        {/* Trial Expired Banner */}
        {(business.subscription_status === "expired" ||
          (business.subscription_status === "trial" && daysLeft <= 0)) && (
          <Card className="mb-6 bg-red-50 border-2 border-[var(--accent-red)]">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[var(--accent-red)] mb-2">
                  Trial Anda Sudah Habis
                </h3>
                <p className="text-[var(--gray-700)]">
                  Untuk melanjutkan menerima booking, aktifkan akun Anda dengan
                  transfer Rp 150.000/bulan.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Sol: QR Code */}
                <div className="bg-white p-6 rounded-lg border border-[var(--gray-300)] text-center">
                  <h4 className="font-semibold text-[var(--gray-900)] mb-4">
                    Scan QR Code
                  </h4>
                  <div className="bg-white p-4 inline-block rounded-lg border-2 border-[var(--gray-300)]">
                    <img
                      src="/qr-payment.png"
                      alt="QRIS Payment"
                      className="w-48 h-48"
                    />
                  </div>
                  <p className="text-sm text-[var(--gray-600)] mt-3">
                    QRIS - Semua e-wallet
                  </p>
                </div>

                {/* Sağ: Manual Transfer */}
                <div className="bg-white p-6 rounded-lg border border-[var(--gray-300)]">
                  <h4 className="font-semibold text-[var(--gray-900)] mb-4">
                    Transfer Manual
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-[var(--gray-600)] mb-1">Bank BRI</p>
                      <p className="font-mono text-base text-[var(--gray-900)]">
                        1863-01-003727-50-1
                      </p>
                      <p className="text-[var(--gray-600)]">
                        a.n. Rita Alpa Nur
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[var(--gray-300)]">
                      <p className="text-[var(--gray-600)] mb-1">Jumlah</p>
                      <p className="text-2xl font-bold text-[var(--accent-coral)]">
                        Rp 150.000
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bukti Transfer */}
              <div className="bg-[var(--primary-pale)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--gray-900)] mb-3">
                  Setelah Transfer:
                </h4>
                <ol className="space-y-2 text-sm text-[var(--gray-700)]">
                  <li>1. Screenshot bukti transfer</li>
                  <li>
                    2. Kirim ke WhatsApp:
                    <a
                      href="https://wa.me/6281373082074"
                      target="_blank"
                      className="font-mono font-semibold text-[var(--primary-turquoise)] hover:underline ml-1"
                    >
                      +62 813-7308-2074
                    </a>
                  </li>
                  <li>
                    3. Sertakan email bisnis Anda:{" "}
                    <span className="font-mono">{business.email}</span>
                  </li>
                  <li>4. Akun akan diaktifkan dalam 1-6 jam</li>
                </ol>
              </div>

              <div className="bg-[var(--gray-100)] p-3 rounded-lg">
                <p className="text-sm text-[var(--gray-700)]">
                  <span className="font-semibold">Penting:</span> Link booking
                  Anda (holtime.vercel.app/{business.slug}) tidak aktif sampai
                  pembayaran dikonfirmasi.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary-turquoise)] mb-1">
                {todayCount || 0}
              </div>
              <p className="text-sm text-[var(--gray-600)]">
                Janji Temu Hari Ini
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary-turquoise)] mb-1">
                {weekCount || 0}
              </div>
              <p className="text-sm text-[var(--gray-600)]">Minggu Ini</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary-turquoise)] mb-1">
                {totalCount || 0}
              </div>
              <p className="text-sm text-[var(--gray-600)]">Total Janji Temu</p>
            </div>
          </Card>
        </div>

        {/* Today's Appointments Widget */}
        <Card className="mb-6" title="Hari Ini">
          {todayAppointments && todayAppointments.length > 0 ? (
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 bg-[var(--gray-50)] rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-[var(--gray-900)]">
                      {apt.customer_name}
                    </p>
                    <p className="text-sm text-[var(--gray-500)]">
                      {apt.customer_phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[var(--primary-turquoise)]">
                      {apt.appointment_time}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                href="/dashboard/appointments?filter=today"
                className="block text-center text-sm text-[var(--primary-turquoise)] hover:underline mt-4"
              >
                Lihat Semua
              </Link>
            </div>
          ) : (
            <p className="text-center text-[var(--gray-500)] py-8">
              Tidak ada janji temu hari ini
            </p>
          )}
        </Card>

        {/* Business Info */}
        <Card title="Informasi Bisnis" className="mb-6">
          <div className="space-y-3">
            <div>
              <span className="text-sm text-[var(--gray-500)]">Nama:</span>
              <p className="font-medium text-[var(--gray-900)]">
                {business.name}
              </p>
            </div>
            <div>
              <span className="text-sm text-[var(--gray-500)]">Email:</span>
              <p className="font-medium text-[var(--gray-900)]">
                {business.email}
              </p>
            </div>
            <div>
              <span className="text-sm text-[var(--gray-500)]">
                Link Booking:
              </span>
              <p className="font-mono text-sm text-[var(--primary-turquoise)]">
                holtime.vercel.app/{business.slug}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/jam-kerja">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="text-3xl mb-2">Jam Kerja</div>
              <h3 className="font-semibold">Atur Jam Kerja</h3>
              <p className="text-sm text-[var(--gray-500)] mt-1">
                Tentukan jam buka/tutup
              </p>
            </Card>
          </Link>

          <Link href="/dashboard/appointments">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="text-3xl mb-2">Janji Temu</div>
              <h3 className="font-semibold">Lihat Janji Temu</h3>
              <p className="text-sm text-[var(--gray-500)] mt-1">
                Kelola semua booking
              </p>
            </Card>
          </Link>

          <Link href="/dashboard/settings">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="text-3xl mb-2">Pengaturan</div>
              <h3 className="font-semibold">Pengaturan</h3>
              <p className="text-sm text-[var(--gray-500)] mt-1">
                Edit profil bisnis
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
