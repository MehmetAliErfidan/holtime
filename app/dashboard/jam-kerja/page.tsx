"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

const DAYS = [
  { id: 0, name: "Minggu", shortName: "Min" },
  { id: 1, name: "Senin", shortName: "Sen" },
  { id: 2, name: "Selasa", shortName: "Sel" },
  { id: 3, name: "Rabu", shortName: "Rab" },
  { id: 4, name: "Kamis", shortName: "Kam" },
  { id: 5, name: "Jum'at", shortName: "Jum" },
  { id: 6, name: "Sabtu", shortName: "Sab" },
];

const SLOT_DURATIONS = [
  { value: 15, label: "15 menit" },
  { value: 30, label: "30 menit" },
  { value: 45, label: "45 menit" },
  { value: 60, label: "60 menit" },
];

interface WorkingHour {
  day_of_week: number;
  is_active: boolean;
  start_time: string;
  end_time: string;
}

export default function JamKerjaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slotDuration, setSlotDuration] = useState(30);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>(
    DAYS.map((day) => ({
      day_of_week: day.id,
      is_active: day.id >= 1 && day.id <= 6, // Default: Senin-Sabtu aktif
      start_time: "09:00",
      end_time: "18:00",
    }))
  );

  // Mevcut working hours'ları fetch et
  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const fetchWorkingHours = async () => {
    try {
      const response = await fetch("/api/working-hours");
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      if (data.workingHours && data.workingHours.length > 0) {
        // Backend'den gelen data varsa güncelle
        const updatedHours = DAYS.map((day) => {
          const existingHour = data.workingHours.find(
            (wh: any) => wh.day_of_week === day.id
          );

          if (existingHour) {
            return {
              day_of_week: day.id,
              is_active: existingHour.is_active,
              start_time: existingHour.start_time,
              end_time: existingHour.end_time,
            };
          }

          // Yoksa default değerler
          return {
            day_of_week: day.id,
            is_active: false,
            start_time: "09:00",
            end_time: "18:00",
          };
        });

        setWorkingHours(updatedHours);
      }

      if (data.slotDuration) {
        setSlotDuration(data.slotDuration);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching working hours:", error);
      toast.error("Gagal memuat data");
      setLoading(false);
    }
  };

  const handleDayToggle = (dayId: number) => {
    setWorkingHours((prev) =>
      prev.map((wh) =>
        wh.day_of_week === dayId ? { ...wh, is_active: !wh.is_active } : wh
      )
    );
  };

  const handleTimeChange = (
    dayId: number,
    field: "start_time" | "end_time",
    value: string
  ) => {
    setWorkingHours((prev) =>
      prev.map((wh) =>
        wh.day_of_week === dayId ? { ...wh, [field]: value } : wh
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi: end_time > start_time
    const invalidDays = workingHours.filter((wh) => {
      if (!wh.is_active) return false;
      return wh.end_time <= wh.start_time;
    });

    if (invalidDays.length > 0) {
      toast.error("Jam tutup harus lebih besar dari jam buka!");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/working-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workingHours,
          slotDuration,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save");
      }

      toast.success(data.message || "Jam kerja berhasil disimpan!");

      // Dashboard'a dön
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      console.error("Error saving:", error);
      toast.error(error.message || "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="dashboard-main">
        <div className="dashboard-container">
          <Card>
            <div className="text-center py-12">
              <p className="text-[var(--gray-500)]">Memuat data...</p>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-main">
      <div className="dashboard-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--gray-900)] mb-2">
            Atur Jam Kerja
          </h1>
          <p className="text-[var(--gray-500)]">
            Tentukan jam operasional bisnis Anda
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Working Hours */}
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-6">
              Jam Operasional
            </h2>

            <div className="space-y-4">
              {DAYS.map((day) => {
                const dayHour = workingHours.find(
                  (wh) => wh.day_of_week === day.id
                );
                if (!dayHour) return null;

                return (
                  <div key={day.id} className="working-hour-row">
                    {/* Checkbox + Day Name */}
                    <div className="day-checkbox">
                      <input
                        type="checkbox"
                        id={`day-${day.id}`}
                        checked={dayHour.is_active}
                        onChange={() => handleDayToggle(day.id)}
                        className="checkbox"
                      />
                      <label htmlFor={`day-${day.id}`} className="day-label">
                        <span className="day-name-full">{day.name}</span>
                        <span className="day-name-short">{day.shortName}</span>
                      </label>
                    </div>

                    {/* Time Inputs */}
                    <div className="time-inputs">
                      <Input
                        type="time"
                        value={dayHour.start_time}
                        onChange={(e) =>
                          handleTimeChange(day.id, "start_time", e.target.value)
                        }
                        disabled={!dayHour.is_active}
                        required={dayHour.is_active}
                      />
                      <span className="time-separator">—</span>
                      <Input
                        type="time"
                        value={dayHour.end_time}
                        onChange={(e) =>
                          handleTimeChange(day.id, "end_time", e.target.value)
                        }
                        disabled={!dayHour.is_active}
                        required={dayHour.is_active}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Slot Duration */}
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-4">
              Durasi Janji Temu
            </h2>
            <p className="text-sm text-[var(--gray-500)] mb-6">
              Berapa lama waktu yang dibutuhkan untuk setiap janji temu?
            </p>

            <div className="slot-duration-grid">
              {SLOT_DURATIONS.map((slot) => (
                <label
                  key={slot.value}
                  className={`slot-duration-option ${
                    slotDuration === slot.value ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="slotDuration"
                    value={slot.value}
                    checked={slotDuration === slot.value}
                    onChange={(e) => setSlotDuration(Number(e.target.value))}
                    className="hidden"
                  />
                  <span className="slot-label">{slot.label}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/dashboard")}
              disabled={saving}
            >
              Batal
            </Button>
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? "Menyimpan..." : "Simpan Jam Kerja"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
