"use client";

import { useState } from "react";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-4 py-2 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-turquoise)] ${className}`}
      {...props}
    />
  );
}

// Şifre gücü hesaplama
function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++; // Hem küçük hem büyük harf
  if (/[0-9]/.test(password)) score++; // Rakam
  if (/[^a-zA-Z0-9]/.test(password)) score++; // Özel karakter

  if (score <= 2) {
    return { score, label: "Lemah", color: "bg-[var(--accent-red)]" };
  } else if (score <= 3) {
    return { score, label: "Sedang", color: "bg-[var(--accent-yellow)]" };
  } else {
    return { score, label: "Kuat", color: "bg-[var(--accent-green)]" };
  }
}

// Icon component'leri ekle (en üste, export default'tan önce)
function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function PasswordForm() {
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password strength
  const passwordStrength = newPassword
    ? calculatePasswordStrength(newPassword)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sıkı
    if (newPassword.length < 8) {
      toast.error("Password baru minimal 8 karakter");
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      toast.error("Password harus mengandung minimal 1 huruf besar");
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      toast.error("Password harus mengandung minimal 1 angka");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Password baru tidak cocok");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/business/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengubah password");
      }

      toast.success(
        "Password berhasil diubah! Email konfirmasi telah dikirim."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          Password Saat Ini *
        </label>
        <div className="relative">
          <Input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentPassword(e.target.value)
            }
            placeholder="Masukkan password saat ini"
            required
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-500)] hover:text-[var(--gray-700)]"
          >
            {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          Password Baru *
        </label>
        <div className="relative">
          <Input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
            placeholder="Minimal 8 karakter"
            required
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-500)] hover:text-[var(--gray-700)]"
          >
            {showNew ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {passwordStrength && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-2 bg-[var(--gray-200)] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-[var(--gray-700)]">
                {passwordStrength.label}
              </span>
            </div>

            {/* Requirements */}
            <div className="text-xs text-[var(--gray-600)] space-y-1">
              <div
                className={
                  newPassword.length >= 8 ? "text-[var(--accent-green)]" : ""
                }
              >
                {newPassword.length >= 8 ? "✓" : "○"} Minimal 8 karakter
              </div>
              <div
                className={
                  /[A-Z]/.test(newPassword) ? "text-[var(--accent-green)]" : ""
                }
              >
                {/[A-Z]/.test(newPassword) ? "✓" : "○"} Minimal 1 huruf besar
              </div>
              <div
                className={
                  /[0-9]/.test(newPassword) ? "text-[var(--accent-green)]" : ""
                }
              >
                {/[0-9]/.test(newPassword) ? "✓" : "○"} Minimal 1 angka
              </div>
              <div
                className={
                  /[^a-zA-Z0-9]/.test(newPassword)
                    ? "text-[var(--accent-green)]"
                    : "text-[var(--gray-500)]"
                }
              >
                {/[^a-zA-Z0-9]/.test(newPassword) ? "✓" : "○"} Karakter khusus
                (opsional, meningkatkan keamanan)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          Konfirmasi Password Baru *
        </label>
        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="Ketik ulang password baru"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-500)] hover:text-[var(--gray-700)]"
          >
            {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {confirmPassword && newPassword !== confirmPassword && (
          <p className="text-xs text-[var(--accent-red)] mt-1">
            Password tidak cocok
          </p>
        )}
      </div>

      <Button type="submit" disabled={saving} className="w-full">
        {saving ? "Mengubah..." : "Ubah Password"}
      </Button>
    </form>
  );
}
