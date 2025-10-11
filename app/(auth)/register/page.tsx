"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { signUp } from "@/lib/auth";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🚀 Form submitted!"); // DEBUG
    console.log("📝 Form data:", formData); // DEBUG

    // Validation
    if (formData.password !== formData.confirmPassword) {
      console.log("❌ Password mismatch"); // DEBUG
      toast.error("Kata sandi tidak cocok!");
      return;
    }

    if (formData.password.length < 6) {
      console.log("❌ Password too short"); // DEBUG
      toast.error("Kata sandi minimal 6 karakter!");
      return;
    }

    console.log("✅ Validation passed"); // DEBUG
    setIsLoading(true);

    try {
      console.log("📡 Calling signUp..."); // DEBUG

      const result = await signUp({
        email: formData.email,
        password: formData.password,
        businessName: formData.businessName,
        phone: formData.phone,
      });

      console.log("📦 SignUp result:", result); // DEBUG

      if (result.success) {
        console.log("✅ Success! Redirecting..."); // DEBUG
        toast.success("📧 Cek email untuk konfirmasi akun!", {
          duration: 5000,
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else {
        console.log("❌ SignUp failed:", result.error); // DEBUG
        toast.error(result.error || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("💥 Catch error:", error); // DEBUG
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
      console.log("🏁 Process finished"); // DEBUG
    }
  };

  console.log("🎨 Register page rendered"); // DEBUG

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="HolTime Logo" className="h-12" />
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nama Bisnis"
              type="text"
              placeholder="Salon Budi"
              required
              value={formData.businessName}
              onChange={(e) => {
                console.log("Business name changed:", e.target.value); // DEBUG
                setFormData({ ...formData, businessName: e.target.value });
              }}
            />

            <Input
              label="Email"
              type="email"
              placeholder="bisnis@email.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Input
              label="Nomor HP (Opsional)"
              type="tel"
              placeholder="+62 812 3456 7890"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <Input
              label="Kata Sandi"
              type="password"
              placeholder="Min. 6 karakter"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Input
              label="Konfirmasi Kata Sandi"
              type="password"
              placeholder="Ulangi kata sandi"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              onClick={() => console.log("🖱️ Button clicked!")} // DEBUG
            >
              Daftar Gratis 14 Hari
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--gray-500)]">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-[var(--primary-turquoise)] font-medium hover:text-[var(--primary-dark)]"
              >
                Masuk di sini
              </Link>
            </p>
          </div>

          {/* Trial Info */}
          <div className="mt-6 p-4 bg-[var(--primary-pale)] rounded-lg">
            <p className="text-sm text-[var(--gray-700)] text-center">
              <strong>Gratis 14 hari</strong> - Tanpa kartu kredit
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
