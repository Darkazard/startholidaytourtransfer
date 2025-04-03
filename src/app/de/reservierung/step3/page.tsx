'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { translations } from '@/translations'

interface Step1Data {
  pickupLocation: string
  dropoffLocation: string
  adults: number
  children: number
  currency: string
  price: number
}

interface Step2Data {
  vehicleId: number
  vehicleName: string
  vehiclePrice: number
  transferPrice: number
  selectedExtras: { name: string; price: number }[]
  totalPrice: number
  vehicleImage: string
  tripType: string
}

interface PersonalInfo {
  firstName: string
  lastName: string
  phone: string
  notes: string
  meetingDate: string
  meetingTime: string
  pickupAddress: string
  dropoffAddress: string
  returnDate: string
  returnTime: string
}

// CSS classes for form elements
const labelClasses = 'block text-sm font-medium text-gray-300 mb-1'
const inputClasses = 'w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
const errorClasses = 'border-red-500 focus:ring-red-500'

export default function Step3Page() {
  const router = useRouter()
  const t = translations.de
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    notes: '',
    meetingDate: '',
    meetingTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    returnDate: '',
    returnTime: ''
  })
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const savedStep1 = localStorage.getItem('reservationStep1')
    const savedStep2 = localStorage.getItem('reservationStep2')
    
    if (savedStep1 && savedStep2) {
      setStep1Data(JSON.parse(savedStep1))
      setStep2Data(JSON.parse(savedStep2))
    }
    setLoading(false)
  }, [])

  const handleBack = () => {
    router.push('/de/reservierung/step2')
  }

  const calculatePrices = () => {
    if (!step1Data || !step2Data) return {
      basePrice: 0,
      vehiclePrice: 0,
      extrasTotal: 0,
      totalPrice: 0,
      isRoundTrip: false
    };

    // Route price
    const basePrice = step1Data.price;
    
    // Vehicle price
    const vehiclePrice = step2Data.vehiclePrice;
    
    // Round-trip check
    const isRoundTrip = step2Data.tripType === 'round-trip';
    
    // Total of extra services
    const extrasTotal = step2Data.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    
    // Total price calculation - use total amount from step2
    const totalPrice = step2Data.totalPrice;

    return {
      basePrice,
      vehiclePrice,
      extrasTotal,
      totalPrice,
      isRoundTrip
    };
  };

  const prices = calculatePrices();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const step1Data = JSON.parse(localStorage.getItem('reservationStep1') || '{}')
      const step2Data = JSON.parse(localStorage.getItem('reservationStep2') || '{}')
      const step3Data = JSON.parse(localStorage.getItem('reservationStep3') || '{}')

      const currencySymbol = '€'

      const message = `*Neue Reservierung*\n\n` +
        `*Transfer Details:*\n` +
        `📍 Abholung: ${step1Data.pickupLocation}\n` +
        `📍 Abgabe: ${step1Data.dropoffLocation}\n` +
        `👥 Passagiere: ${step1Data.adults + step1Data.children} Personen\n` +
        `🚗 Fahrzeug: ${step2Data.vehicleName}\n` +
        `💰 Transferpreis: ${step2Data.transferPrice}${currencySymbol}\n` +
        `💰 Fahrzeugpreis: ${step2Data.vehiclePrice}${currencySymbol}\n` +
        (step2Data.selectedExtras.length > 0 ? `*Zusätzliche Dienste:*\n${step2Data.selectedExtras.map((extra: any) => `• ${extra.name}: +${extra.price}${currencySymbol}`).join('\n')}\n` : '') +
        `*Gesamtbetrag:* ${step2Data.totalPrice}${currencySymbol}\n\n` +
        `*Passagierinformationen:*\n` +
        `👤 Name: ${step3Data.name}\n` +
        `📧 E-Mail: ${step3Data.email}\n` +
        `📱 Telefon: ${step3Data.phone}\n` +
        `📅 Datum: ${step3Data.date}\n` +
        `🕒 Uhrzeit: ${step3Data.time}\n` +
        `📝 Notizen: ${step3Data.notes || 'Keine'}`

      const whatsappUrl = `https://wa.me/905528988899?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center text-white">{t.loading}</div>
          </div>
        </div>
      </div>
    )
  }

  if (!step1Data || !step2Data) {
    router.push('/de/reservierung')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 text-gray-400 hover:text-white flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            {t.back}
          </button>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">{t.personalInfo}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{t.step3}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personal Information */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">{t.personalInfo}</h2>
                <form className="space-y-4" noValidate>
                  <div>
                    <label className={labelClasses}>
                      {t.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      className={`${inputClasses} ${errors.firstName ? errorClasses : ''}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.surname} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      className={`${inputClasses} ${errors.lastName ? errorClasses : ''}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      className={inputClasses}
                      placeholder={t.enterPhoneNumber}
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Arrival Transfer Information */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">{t.arrivalTransferInfo}</h2>
                <form className="space-y-4" noValidate>
                  <div>
                    <label className={labelClasses}>
                      {t.flightArrivalDate} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={personalInfo.meetingDate}
                        onChange={(e) => setPersonalInfo({...personalInfo, meetingDate: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.meetingDate ? errorClasses : ''}`}
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-calendar"></i>
                      </span>
                    </div>
                    {errors.meetingDate && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.flightArrivalTime} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={personalInfo.meetingTime}
                        onChange={(e) => setPersonalInfo({...personalInfo, meetingTime: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.meetingTime ? errorClasses : ''}`}
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-clock"></i>
                      </span>
                    </div>
                    {errors.meetingTime && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.flightNumber} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={personalInfo.pickupAddress}
                        onChange={(e) => setPersonalInfo({...personalInfo, pickupAddress: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.pickupAddress ? errorClasses : ''}`}
                        placeholder="Beispiel: QX0707"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-plane"></i>
                      </span>
                    </div>
                    {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.whereYouWantToGo} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={personalInfo.dropoffAddress}
                        onChange={(e) => setPersonalInfo({...personalInfo, dropoffAddress: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.dropoffAddress ? errorClasses : ''}`}
                        placeholder={t.locationHotel}
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                    </div>
                    {errors.dropoffAddress && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  {prices.isRoundTrip && (
                    <>
                      <div>
                        <label className={labelClasses}>
                          {t.returnDate} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={personalInfo.returnDate}
                            onChange={(e) => setPersonalInfo({...personalInfo, returnDate: e.target.value})}
                            className={`${inputClasses} pl-10 ${errors.returnDate ? errorClasses : ''}`}
                          />
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <i className="fas fa-calendar"></i>
                          </span>
                        </div>
                        {errors.returnDate && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                      </div>
                      <div>
                        <label className={labelClasses}>
                          {t.returnTime} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            value={personalInfo.returnTime}
                            onChange={(e) => setPersonalInfo({...personalInfo, returnTime: e.target.value})}
                            className={`${inputClasses} pl-10 ${errors.returnTime ? errorClasses : ''}`}
                          />
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <i className="fas fa-clock"></i>
                          </span>
                        </div>
                        {errors.returnTime && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>

            {/* Vehicle Details and Price Summary */}
            <div className="md:col-span-1">
              {/* Vehicle Details */}
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-white">{t.selectedVehicle}</h2>
                
                {/* Vehicle Image */}
                <div className="mb-6">
                  <img
                    src={step2Data?.vehicleImage || '/images/vehicles/vito.jpg'}
                    alt={step2Data?.vehicleName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Vehicle Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="ml-2 font-medium">{step2Data?.vehicleName}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="ml-2">{step1Data?.pickupLocation} → {step1Data?.dropoffLocation}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="ml-2">{step1Data?.adults + step1Data?.children} {t.passengers}</span>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">{t.priceSummary}</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-gray-300">
                    <span>{t.routePrice}:</span>
                    <span className="font-medium">{prices.basePrice}€</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>{t.vehiclePrice}:</span>
                    <span className="font-medium">{prices.vehiclePrice}€</span>
                  </div>
                  {prices.isRoundTrip && (
                    <div className="flex justify-between items-center text-green-400">
                      <span>{t.roundTripDiscount}:</span>
                      <span className="font-medium">-5€</span>
                    </div>
                  )}
                  {prices.extrasTotal > 0 && (
                    <>
                      <div className="pt-2 border-t border-gray-700">
                        <div className="text-sm font-medium text-gray-400 mb-2">{t.selectedExtras}:</div>
                        {step2Data?.selectedExtras.map((extra, idx) => (
                          <div key={idx} className="flex justify-between items-center text-gray-300 text-sm">
                            <span>{extra.name}</span>
                            <span>+{extra.price}€</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center text-gray-300 mt-2 pt-2 border-t border-gray-700">
                          <span>{t.extrasTotal}:</span>
                          <span className="font-medium">+{prices.extrasTotal}€</span>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="pt-4 mt-4 border-t-2 border-gray-700">
                    <div className="flex justify-between items-center text-xl">
                      <span className="font-bold text-white">{t.totalPrice}:</span>
                      <span className="font-bold text-red-500">{prices.totalPrice}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/25"
            >
              {t.bookWithWhatsApp}
            </button>
          </div>
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