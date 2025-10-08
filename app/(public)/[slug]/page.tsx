import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import BookingForm from "@/components/booking/BookingForm";
import Card from "@/components/ui/Card";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = await createClient();

  const { slug } = await params;

  // Business bilgilerini slug ile bul
  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !business) {
    notFound();
  }

  // Trial bitmiş mi kontrol et
  const now = new Date();
  const trialEnd = new Date(business.trial_end);
  const isExpired =
    business.subscription_status === "expired" ||
    (business.subscription_status === "trial" && now > trialEnd);

  if (isExpired) {
    return (
      <main className="min-h-screen p-8 bg-[var(--gray-50)]">
        <div className="max-w-2xl mx-auto">
          <Card>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
                Booking Tidak Tersedia
              </h1>
              <p className="text-[var(--gray-500)]">
                Mohon maaf, {business.name} sedang tidak menerima booking untuk
                saat ini.
              </p>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  // Working hours çek
  const { data: workingHours } = await supabase
    .from("working_hours")
    .select("*")
    .eq("business_id", business.id)
    .eq("is_active", true)
    .order("day_of_week", { ascending: true });

  // Bugünden itibaren 30 gün sonrası
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-[var(--gray-50)]">
      <div className="max-w-3xl mx-auto">
        {/* Business Header */}
        <Card className="mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--gray-900)] mb-2">
              {business.name}
            </h1>
            {business.description && (
              <p className="text-[var(--gray-600)] mb-4">
                {business.description}
              </p>
            )}
            {business.phone && (
              <p className="text-sm text-[var(--gray-500)]">
                📞 {business.phone}
              </p>
            )}
          </div>
        </Card>

        {/* Booking Form */}
        <Card>
          <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-6">
            Buat Janji Temu
          </h2>

          <BookingForm
            businessId={business.id}
            businessName={business.name}
            workingHours={workingHours || []}
            slotDuration={business.slot_duration || 30}
            maxDate={maxDate.toISOString().split("T")[0]}
          />
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-[var(--gray-500)]">
          <p>Powered by HolTime</p>
        </div>
      </div>
    </main>
  );
}
