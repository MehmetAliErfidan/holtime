"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { signIn } from "@/lib/auth";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting login..."); // DEBUG

      const result = await signIn({
        email: formData.email,
        password: formData.password,
      });

      console.log("Login result:", result); // DEBUG

      if (result.success) {
        console.log("Login successful, redirecting to dashboard...");
        toast.success("Berhasil masuk!");

        // Hard redirect (window.location kullan)
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        console.log("Login failed:", result.error); // DEBUG
        toast.error(result.error || "Email atau kata sandi salah");
      }
    } catch (error) {
      console.error("Login catch error:", error); // DEBUG
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-turquoise bg-clip-text text-transparent">
              HolTime
            </span>
          </h1>
          <p className="text-[var(--gray-500)]">Masuk ke akun Anda</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              label="Kata Sandi"
              type="password"
              placeholder="Masukkan kata sandi"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--gray-500)]">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-[var(--primary-turquoise)] font-medium hover:text-[var(--primary-dark)]"
              >
                Daftar gratis
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
