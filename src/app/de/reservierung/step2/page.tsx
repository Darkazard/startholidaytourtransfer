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
  const t = translations.de
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedData = localStorage.getItem('reservationStep1')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      // Almanca sayfada her zaman EUR kullan
      parsedData.currency = 'EUR'
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
        currency: 'EUR' // Her zaman EUR kullan
      };
      localStorage.setItem('reservationStep2', JSON.stringify(step2Data));
      router.push('/de/reservierung/step3');
    }
  };

  const handleTripTypeChange = (tripType: 'one-way' | 'round-trip') => {
    if (step1Data) {
      setStep1Data({ ...step1Data, tripType });
    }
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
    router.push('/de/reservierung/step1')
    return null
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Transfer Zusammenfassung */}
          <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800 mb-8">
            <div className="flex items-center justify-between space-x-4">
              {/* Standort */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-gray-300">
                  <span className="font-medium">{step1Data.pickupLocation}</span>
                  <span className="mx-2">→</span>
                  <span className="font-medium">{step1Data.dropoffLocation}</span>
                </div>
              </div>

              {/* Separator */}
              <div className="h-8 w-px bg-gray-800"></div>

              {/* Passagierzahl */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="text-gray-300">
                  <span>{step1Data.adults + step1Data.children} {t.passengers}</span>
                </div>
              </div>

              {/* Separator */}
              <div className="h-8 w-px bg-gray-800"></div>

              {/* Transfertyp */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {step1Data.tripType === 'round-trip' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  )}
                </svg>
                <div className="text-gray-300">
                  <span>{step1Data.tripType === 'round-trip' ? t.roundTrip : t.oneWay}</span>
                  <span className="ml-2 text-sm text-gray-500">(EUR)</span>
                </div>
              </div>

              {/* Separator */}
              <div className="h-8 w-px bg-gray-800"></div>

              {/* Transferpreis */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-gray-300">
                  <span>{step1Data.price} €</span>
                </div>
              </div>
            </div>
          </div>

          <VehicleSelect
            onVehicleSelect={handleVehicleSelect}
            initialPrice={step1Data.price}
            onTripTypeChange={handleTripTypeChange}
          />
        </div>
      </div>

      {/* Footer Tag Cloud */}
      <div className="w-full bg-black/40 backdrop-blur-sm py-4 px-2 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-x-1 gap-y-0.5 justify-center items-center text-[8px] opacity-30 hover:opacity-60 transition-opacity">
            {[
              "Flughafen Antalya",
              "Antalya",
              "Transfer",
              "Alanya",
              "Belek",
              "Side",
              "Kemer",
              "Antalya Flughafen",
              "konaklı",
              "Antalya havalimanı",
              "Taxi Antalya",
              "Antalya vito",
              "Bellis deluxe",
              "cullinan belek",
              "Lonicera Resort",
              "dobradan hotel",
              "voyage Belek",
              "adalya elit",
              "titanic hotel",
              "kaya pallazo",
              "justiano Alanya",
              "granada Beach",
              "my lome hotel",
              "quattro Beach hotel",
              "Mall of Antalya",
              "Terracity",
              "Land of Legens",
              "Rixos Sungate",
              "Rixos tekirova",
              "Beldibi",
              "Nirvana cosmopolitan",
              "Dobedan World Palace",
              "Rai Premium Tekirova",
              "Güral Tekirova",
              "cullinan belek",
              "Lonicera Resort",
              "Dobedan hotel",
              "voyage Belek",
              "adalya elit",
              "Bosphorus Sorgun hotel",
              "Lusso Sorgun hotel",
              "titanic hotel",
              "kaya pallazo",
              "justiano Alanya",
              "granada Beach",
              "my lome hotel",
              "quattro Beach hotel",
              "Mall of Antalya",
              "Terracity",
              "Land of Legens",
              "Rixos Sungate",
              "Rixos tekirova",
              "Beldibi",
              "Gloria Serenity Hotel",
              "Gloria Golf Resort",
              "Long Beach hotel",
              "Myhome hotel",
              "Justiano club Conti",
              "Selectum Family Resort Side",
              "Aska Lara",
              "Adalya Elit",
              "Titanic Mardan Palace",
              "Titanic Deluxe Belek",
              "Mega Saray Hotel",
              "Spice Hotel",
              "Liu Resort",
              "Tui Magic Life Jacaranda",
              "Tui Magic Life Masmavi",
              "Crystal Water World",
              "Crystal Aura Beach",
              "Barut Hemera",
              "Nirvana cosmopolitan",
              "Royal Tac Mahal",
              "Kirman Leodaikya",
              "Kirman Side Marin",
              "NG Phasalis",
              "Limak Limrq",
              "Daima Biz",
              "Max Royal Kemer",
              "utopiabeachclub",
              "Transport am Flughafen Antalya Kemer",
              "Mercedes Service Antalya",
              "Transport vom Flughafen Antalya nach Side",
              "Transport vom Flughafen Antalya nach Alanya",
              "Hotelservices in Antalya",
              "Transport ins Land der Legenden",
              "Stadtrundfahrt durch Antalya",
              "Reise nach Antalya",
              "schöne Sehenswürdigkeiten in Antalya",
              "Reise nach Antalya Fethiye",
              "Transfer vom Flughafen Antalya zum Hotel"
            ].map((tag, index) => (
              <button
                key={index}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-yellow-400 transition-colors"
              >
                {tag} {index < 89 ? "•" : ""}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 