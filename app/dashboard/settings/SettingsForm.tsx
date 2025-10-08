"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";

// Input component'i inline yap (import sorunu olmasın)
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

interface Business {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string | null;
  description: string | null;
}

export default function SettingsForm({ business }: { business: Business }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(business.name);
  const [phone, setPhone] = useState(business.phone || "");
  const [description, setDescription] = useState(business.description || "");
  const [slug, setSlug] = useState(business.slug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Nama bisnis tidak boleh kosong");
      return;
    }

    if (!slug.trim()) {
      toast.error("Slug tidak boleh kosong");
      return;
    }

    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      toast.error("Slug hanya boleh huruf kecil, angka, dan dash (-)");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/business/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim() || null,
          description: description.trim() || null,
          slug: slug.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menyimpan perubahan");
      }

      toast.success("Perubahan berhasil disimpan!");
      router.refresh();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          Nama Bisnis *
        </label>
        <Input
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Salon Budi"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          Email
        </label>
        <Input
          type="email"
          value={business.email}
          disabled
          className="bg-[var(--gray-100)] cursor-not-allowed"
        />
        <p className="text-xs text-[var(--gray-500)] mt-1">
          Email tidak dapat diubah
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          Nomor Telepon
        </label>
        <Input
          type="tel"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
          placeholder="+62 812 3456 7890"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          Deskripsi Bisnis
        </label>
        <textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          placeholder="Salon & barbershop profesional di Jakarta"
          maxLength={500}
          rows={4}
          className="w-full px-4 py-2 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-turquoise)] resize-none"
        />
        <p className="text-xs text-[var(--gray-500)] mt-1">
          {description.length}/500 karakter
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          Slug (Link Booking) *
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--gray-500)]">
            holtime.vercel.app/
          </span>
          <Input
            type="text"
            value={slug}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSlug(e.target.value.toLowerCase())
            }
            placeholder="salon-budi"
            required
          />
        </div>
        <p className="text-xs text-[var(--gray-500)] mt-1">
          Hanya huruf kecil, angka, dan dash (-). Hati-hati: mengubah slug akan
          mengubah link booking Anda!
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/dashboard")}
          disabled={saving}
        >
          Batal
        </Button>
        <Button type="submit" disabled={saving} className="flex-1">
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}
