"use client";

import { useState, useEffect } from "react";
import { WorkingHour } from "@/lib/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

interface BookingFormProps {
  businessId: string;
  businessName: string;
  workingHours: WorkingHour[];
  slotDuration: number;
  maxDate: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookingForm({
  businessId,
  businessName,
  workingHours,
  slotDuration,
  maxDate,
}: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingSlots, setCheckingSlots] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Bugünün tarihi (minimum date)
  const today = new Date().toISOString().split("T")[0];

  // Tarih seçildiğinde müsait saatleri hesapla
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: string) => {
    console.log("=== FETCH SLOTS START ===");
    console.log("Date:", date);
    console.log("Working Hours:", workingHours);

    setCheckingSlots(true);
    setSelectedTime("");

    try {
      const selectedDateObj = new Date(date + "T00:00:00");
      const dayOfWeek = selectedDateObj.getDay();

      console.log("Day of Week:", dayOfWeek);

      const dayWorkingHours = workingHours.find(
        (wh) => wh.day_of_week === dayOfWeek
      );

      console.log("Found Working Hours:", dayWorkingHours);

      if (!dayWorkingHours) {
        console.log("NO WORKING HOURS FOUND!");
        setTimeSlots([]);
        toast.error("Bisnis tutup pada hari ini");
        setCheckingSlots(false);
        return;
      }

      // Slot'ları oluştur
      const slots: TimeSlot[] = [];
      const [startHour, startMinute] = dayWorkingHours.start_time
        .split(":")
        .map(Number);
      const [endHour, endMinute] = dayWorkingHours.end_time
        .split(":")
        .map(Number);

      let currentMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;

      // EKLE: Bugünse ve saat geçmişse, o saatleri gösterme
      const now = new Date();
      const isToday = date === now.toISOString().split("T")[0];
      const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();

      while (currentMinutes < endMinutes) {
        const hour = Math.floor(currentMinutes / 60);
        const minute = currentMinutes % 60;
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;

        // Bugünse ve saat geçmişse skip et
        if (isToday && currentMinutes <= currentTimeMinutes) {
          currentMinutes += slotDuration;
          continue;
        }

        slots.push({
          time: timeString,
          available: true,
        });

        currentMinutes += slotDuration;
      }

      // Dolu saatleri işaretle
      const response = await fetch(
        `/api/check-availability?businessId=${businessId}&date=${date}`
      );

      if (response.ok) {
        const data = await response.json();
        const bookedTimes = data.bookedTimes || [];

        console.log("Booked Times from API:", bookedTimes);
        console.log("All Slots before marking:", slots);

        // Format eşitle: '11:00:00' -> '11:00'
        const normalizedBookedTimes = bookedTimes.map((time: string) =>
          time.substring(0, 5)
        );

        console.log("Normalized Booked Times:", normalizedBookedTimes);

        slots.forEach((slot) => {
          if (normalizedBookedTimes.includes(slot.time)) {
            console.log("Marking as unavailable:", slot.time);
            slot.available = false;
          }
        });
        console.log("All Slots after marking:", slots);
      }

      setTimeSlots(slots);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.error("Gagal memuat jam tersedia");
    } finally {
      setCheckingSlots(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      toast.error("Pilih tanggal dan jam terlebih dahulu");
      return;
    }

    setLoading(true);

    try {
      const checkResponse = await fetch(
        `/api/check-availability?businessId=${businessId}&date=${selectedDate}`
      );
      if (checkResponse.ok) {
        const checkData = await checkResponse.json();

        const normalizedTimes = checkData.bookedTimes.map((time: string) =>
          time.substring(0, 5)
        );

        if (normalizedTimes.includes(selectedTime)) {
          toast.error("Maaf, jam ini baru saja terisi. Pilih jam lain.");
          await fetchAvailableSlots(selectedDate);
          setSelectedTime("");
          setLoading(false);
          return;
        }
      }
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime,
          notes: notes || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal membuat janji temu");
      }

      // Success!
      toast.success("Janji temu berhasil dibuat! Cek email Anda.");

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setSelectedDate("");
      setSelectedTime("");
      setTimeSlots([]);
    } catch (error: any) {
      console.error("Error creating appointment:", error);
      toast.error(error.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Pilih Tanggal */}
      <div>
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
          Pilih Tanggal *
        </label>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={today}
          max={maxDate}
          required
        />
      </div>

      {/* Pilih Jam */}
      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
            Pilih Jam *
          </label>

          {checkingSlots ? (
            <div className="text-center py-8">
              <p className="text-[var(--gray-500)]">Memuat jam tersedia...</p>
            </div>
          ) : timeSlots.length === 0 ? (
            <div className="text-center py-8 bg-[var(--gray-100)] rounded-lg">
              <p className="text-[var(--gray-500)]">
                Tidak ada jam tersedia pada hari ini
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`
                    time-slot-button
                    ${selectedTime === slot.time ? "selected" : ""}
                    ${!slot.available ? "disabled" : ""}
                  `}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Form Data (hanya saat tarih+jam seçildiğinde göster) */}
      {selectedDate && selectedTime && (
        <div className="space-y-4 pt-4 border-t border-[var(--gray-300)]">
          <div>
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
              Nama Lengkap *
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
              Email *
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
              Nomor HP/WhatsApp *
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+62 812 3456 7890"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
              Catatan (Opsional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tambahkan catatan jika ada..."
              maxLength={500}
              rows={3}
              className="input-field w-full resize-none"
            />
            <p className="text-xs text-[var(--gray-500)] mt-1">
              {notes.length}/500 karakter
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Memproses..." : "Pesan Janji Temu"}
          </Button>
        </div>
      )}
    </form>
  );
}
