"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../lib/supabase";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full px-4 py-2 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-turquoise)]"
      {...props}
    />
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Hata mesajlarını Bahasa Indonesia'ya çevir
        let errorMessage = "Terjadi kesalahan";

        const errorLower = error.message.toLowerCase();

        if (
          errorLower.includes("invalid") ||
          errorLower.includes("credentials") ||
          errorLower.includes("password")
        ) {
          errorMessage = "Email atau password salah";
        } else if (
          errorLower.includes("email") &&
          errorLower.includes("confirmed")
        ) {
          errorMessage = "Silakan konfirmasi email Anda terlebih dahulu";
        } else if (errorLower.includes("not found")) {
          errorMessage = "Akun tidak ditemukan";
        } else {
          errorMessage = error.message;
        }

        throw new Error(errorMessage);
      }

      toast.success("Login berhasil!");
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Gagal login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gray-50)] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-[var(--gray-300)] p-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-6 text-center">
          Masuk ke HolTime
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="nama@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="Masukkan password"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--gray-600)] mt-6">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-[var(--primary-turquoise)] hover:underline font-medium"
          >
            Daftar Gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
