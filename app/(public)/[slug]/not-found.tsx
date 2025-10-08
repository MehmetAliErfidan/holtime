import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen p-8 bg-[var(--gray-50)] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <Card>
          <div className="py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-[var(--gray-500)] mb-6">
              Business yang Anda cari tidak ditemukan atau link salah.
            </p>
            <Link href="/">
              <Button>Kembali ke Beranda</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
