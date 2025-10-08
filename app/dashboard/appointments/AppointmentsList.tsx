"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Card ve Button inline tanımla (import etme)
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-[var(--gray-300)] p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "sm",
}: any) {
  const variantClasses =
    variant === "secondary"
      ? "bg-white text-[var(--gray-700)] border-2 border-[var(--gray-300)] hover:border-[var(--primary-turquoise)]"
      : "bg-[var(--primary-turquoise)] text-white hover:bg-[var(--primary-dark)]";

  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-sm" : "px-6 py-3";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variantClasses} ${sizeClasses} rounded-lg font-medium transition-all disabled:opacity-50`}
    >
      {children}
    </button>
  );
}

interface Appointment {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string | null;
  status: string;
  created_at: string;
}

interface Props {
  appointments: Appointment[];
  currentFilter: string;
}

const FILTERS = [
  { id: "all", label: "Semua" },
  { id: "today", label: "Hari Ini" },
  { id: "tomorrow", label: "Besok" },
  { id: "week", label: "Minggu Ini" },
  { id: "month", label: "Bulan Ini" },
];

export default function AppointmentsList({
  appointments,
  currentFilter,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cancelling, setCancelling] = useState<string | null>(null);

  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    router.push(`/dashboard/appointments?${params.toString()}`);
  };

  const handleCancel = async (appointmentId: string) => {
    if (!confirm("Yakin ingin membatalkan janji temu ini?")) {
      return;
    }

    setCancelling(appointmentId);

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!response.ok) {
        throw new Error("Gagal membatalkan");
      }

      toast.success("Janji temu dibatalkan");
      router.refresh();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Terjadi kesalahan");
    } finally {
      setCancelling(null);
    }
  };

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhone}`;
    window.open(whatsappUrl, "_blank");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors
              ${
                currentFilter === filter.id
                  ? "bg-[var(--primary-turquoise)] text-white"
                  : "bg-white text-[var(--gray-700)] border border-[var(--gray-300)] hover:border-[var(--primary-turquoise)]"
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Appointments */}
      {appointments.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2">
              Belum Ada Janji Temu
            </h3>
            <p className="text-[var(--gray-500)]">
              Bagikan link booking Anda ke pelanggan untuk mulai menerima
              booking.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <Card
              key={apt.id}
              className={apt.status === "cancelled" ? "opacity-50" : ""}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Date & Time */}
                <div className="flex-shrink-0 md:w-48">
                  <div className="text-sm text-[var(--gray-500)]">
                    {formatDate(apt.appointment_date)}
                  </div>
                  <div className="text-2xl font-bold text-[var(--primary-turquoise)]">
                    {apt.appointment_time}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--gray-900)] text-lg">
                    {apt.customer_name}
                  </h3>
                  <div className="text-sm text-[var(--gray-600)] space-y-1 mt-1">
                    <div>✉️ {apt.customer_email}</div>
                    <div>📱 {apt.customer_phone}</div>
                    {apt.notes && (
                      <div className="mt-2 p-2 bg-[var(--gray-100)] rounded text-xs">
                        📝 {apt.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col gap-2 md:items-end">
                  {apt.status === "cancelled" ? (
                    <span className="px-3 py-1 bg-[var(--accent-red)] text-white text-xs font-semibold rounded-full">
                      Dibatalkan
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-[var(--accent-green)] text-white text-xs font-semibold rounded-full">
                      Terkonfirmasi
                    </span>
                  )}

                  {apt.status !== "cancelled" && (
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleWhatsApp(apt.customer_phone)}
                      >
                        WhatsApp
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCancel(apt.id)}
                        disabled={cancelling === apt.id}
                      >
                        {cancelling === apt.id ? "Membatalkan..." : "Batal"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
