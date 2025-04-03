'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import VehicleSelect from '@/components/Vehicle/VehicleSelect'
import { translations } from '@/translations'

interface Step1Data {
  pickupLocation: string
  dropoffLocation: string
  adults: number
  children: number
  currency: string
  price: number
  tripType: 'one-way' | 'round-trip'
}

export default function Step2Page() {
  const router = useRouter()
  const t = translations.en
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way')

  useEffect(() => {
    const savedData = localStorage.getItem('reservationStep1')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setStep1Data(parsedData)
    }
    setLoading(false)
  }, [])

  const handleVehicleSelect = (data: {
    vehicleId: number | null;
    extras: number[];
    vehiclePrice: number;
    vehicleName: string;
    selectedExtras: { name: string; price: number }[];
    vehicleImage: string;
    tripType: 'one-way' | 'round-trip';
  }) => {
    if (data.vehicleId && step1Data) {
      const extrasTotal = data.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
      
      // Calculate vehicle total based on trip type
      let vehicleTotal;
      if (step1Data.tripType === 'round-trip') {
        vehicleTotal = ((step1Data.price + data.vehiclePrice) * 2) - 5 + extrasTotal;
      } else {
        vehicleTotal = step1Data.price + data.vehiclePrice + extrasTotal;
      }

      const step2Data = {
        ...data,
        transferPrice: step1Data.price,
        totalPrice: vehicleTotal,
        vehicleImage: data.vehicleImage,
        tripType: data.tripType,
        currency: 'USD'
      };
      localStorage.setItem('reservationStep2', JSON.stringify(step2Data));
      router.push('/en/reservation/step3');
    }
  };

  const handleTripTypeChange = (type: 'one-way' | 'round-trip') => {
    setTripType(type);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center text-white">{t.loading}</div>
          </div>
        </div>
      </div>
    )
  }

  if (!step1Data) {
    router.push('/en/reservation/step1')
    return null
  }

  return (
    <div className="min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-black/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-800">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white">{t.selectedVehicle}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{t.step2}</span>
                </div>
              </div>

              <VehicleSelect
                onVehicleSelect={handleVehicleSelect}
                onTripTypeChange={handleTripTypeChange}
                initialPrice={step1Data.price}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 