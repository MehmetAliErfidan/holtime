import { redirect } from "next/navigation";
import { createClient } from "../../../lib/supabase-server";
import SettingsForm from "./SettingsForm";
import PasswordForm from "./PasswordForm";

export default async function SettingsPage() {
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
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen p-8 bg-[var(--gray-50)]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--gray-900)]">
            Pengaturan
          </h1>
          <p className="text-[var(--gray-500)] mt-1">
            Kelola informasi bisnis dan akun Anda
          </p>
        </div>

        <div className="space-y-6">
          {/* Business Info Form */}
          <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-300)] p-6">
            <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-6">
              Informasi Bisnis
            </h2>
            <SettingsForm business={business} />
          </div>

          {/* Password Change Form */}
          <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-300)] p-6">
            <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-6">
              Ubah Password
            </h2>
            <PasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
}
