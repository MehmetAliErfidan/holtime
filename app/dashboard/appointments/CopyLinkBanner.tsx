"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function CopyLinkBanner({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const link = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(link);
    toast.success("Link berhasil disalin!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6 bg-[var(--primary-pale)] p-6 rounded-lg shadow-sm border border-[var(--gray-300)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-semibold text-[var(--gray-900)] mb-1">
            Link Booking Anda
          </h3>
          <p className="font-mono text-sm text-[var(--primary-turquoise)]">
            {typeof window !== "undefined"
              ? `${window.location.origin}/${slug}`
              : `holtime.com/${slug}`}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-[var(--primary-turquoise)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors whitespace-nowrap"
        >
          {copied ? "✓ Tersalin!" : "📋 Salin Link"}
        </button>
      </div>
    </div>
  );
}
