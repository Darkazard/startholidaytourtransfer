"use client";
import ReservationForm from "@/components/Reservation/ReservationForm";

export default function ReservationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Rezervasyon</h1>
        <ReservationForm showExtras={false} />
      </div>
    </div>
  );
} 