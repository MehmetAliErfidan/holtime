import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import CopyLinkBanner from "./CopyLinkBanner";
import AppointmentsList from "./AppointmentsList";

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id, name, slug")
    .eq("id", user.id)
    .single();

  if (!business) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const filter = params.filter || "all";

  const today = new Date().toISOString().split("T")[0];

  let query = supabase
    .from("appointments")
    .select("*")
    .eq("business_id", business.id);

  if (filter === "today") {
    query = query.eq("appointment_date", today);
  } else if (filter === "tomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    query = query.eq("appointment_date", tomorrowStr);
  } else if (filter === "week") {
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 7);
    query = query
      .gte("appointment_date", today)
      .lte("appointment_date", weekLater.toISOString().split("T")[0]);
  } else if (filter === "month") {
    const monthLater = new Date();
    monthLater.setMonth(monthLater.getMonth() + 1);
    query = query
      .gte("appointment_date", today)
      .lte("appointment_date", monthLater.toISOString().split("T")[0]);
  }

  query = query
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  const { data: appointments } = await query;

  return (
    <main className="min-h-screen p-8 bg-[var(--gray-50)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--gray-900)]">
            Janji Temu
          </h1>
          <p className="text-[var(--gray-500)] mt-1">
            Kelola semua booking Anda
          </p>
        </div>

        <CopyLinkBanner slug={business.slug} />
        <AppointmentsList
          appointments={appointments || []}
          currentFilter={filter}
        />
      </div>
    </main>
  );
}
