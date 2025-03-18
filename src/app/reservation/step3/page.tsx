'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
}

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  notes: string
}

export default function Step3Page() {
  const router = useRouter()
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedStep1 = localStorage.getItem('reservationStep1')
    const savedStep2 = localStorage.getItem('reservationStep2')
    
    if (savedStep1 && savedStep2) {
      setStep1Data(JSON.parse(savedStep1))
      setStep2Data(JSON.parse(savedStep2))
    }
    setLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!step1Data || !step2Data) return;

    // WhatsApp mesajını oluştur
    const message = `*Yeni Transfer Rezervasyonu*%0A
----------------------------------------%0A
*Müşteri Bilgileri*%0A
İsim: ${personalInfo.fullName}%0A
Telefon: ${personalInfo.phone}%0A
E-posta: ${personalInfo.email}%0A
----------------------------------------%0A
*Transfer Detayları*%0A
Nereden: ${step1Data.pickupLocation}%0A
Nereye: ${step1Data.dropoffLocation}%0A
Yolcu: ${step1Data.adults + step1Data.children} kişi%0A
Transfer Ücreti: ${step2Data.transferPrice}₺%0A
----------------------------------------%0A
*Seçilen Araç*%0A
${step2Data.vehicleName}%0A
Araç Ücreti: ${step2Data.vehiclePrice}₺%0A
${step2Data.selectedExtras.length > 0 ? `
*Seçilen Ekstra Hizmetler*%0A${step2Data.selectedExtras.map(extra => `${extra.name}: ${extra.price}₺`).join('%0A')}%0A` : ''}
----------------------------------------%0A
*Toplam Tutar: ${step2Data.totalPrice}₺*%0A
----------------------------------------%0A
*Notlar*%0A
${personalInfo.notes || 'Not belirtilmedi'}%0A`

    // WhatsApp API URL'ini oluştur
    const whatsappUrl = `https://wa.me/905555555555?text=${message}`

    // Tüm rezervasyon verilerini temizle
    localStorage.removeItem('reservationStep1')
    localStorage.removeItem('reservationStep2')

    // WhatsApp'ı aç
    window.open(whatsappUrl, '_blank')
    
    // Ana sayfaya yönlendir
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center text-white">Yükleniyor...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!step1Data || !step2Data) {
    router.push('/reservation')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Rezervasyon Özeti */}
          <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-white">Rezervasyon Özeti</h2>
            
            {/* Transfer Detayları */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Transfer Detayları</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Nereden:</span>
                  <p className="text-white">{step1Data.pickupLocation}</p>
                </div>
                <div>
                  <span className="text-gray-400">Nereye:</span>
                  <p className="text-white">{step1Data.dropoffLocation}</p>
                </div>
                <div>
                  <span className="text-gray-400">Yolcu:</span>
                  <p className="text-white">{step1Data.adults + step1Data.children} Kişi</p>
                </div>
                <div>
                  <span className="text-gray-400">Transfer Ücreti:</span>
                  <p className="text-red-500 font-semibold">{step2Data.transferPrice}₺</p>
                </div>
              </div>
            </div>

            {/* Araç Detayları */}
            <div className="mb-6 border-t border-gray-800 pt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Araç Detayları</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Seçilen Araç:</span>
                  <p className="text-white">{step2Data.vehicleName}</p>
                </div>
                <div>
                  <span className="text-gray-400">Araç Ücreti:</span>
                  <p className="text-red-500 font-semibold">{step2Data.vehiclePrice}₺</p>
                </div>
              </div>
            </div>

            {/* Ek Hizmetler */}
            {step2Data.selectedExtras.length > 0 && (
              <div className="mb-6 border-t border-gray-800 pt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Ek Hizmetler</h3>
                <div className="space-y-2">
                  {step2Data.selectedExtras.map((extra, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-300">{extra.name}</span>
                      <span className="text-red-500 font-semibold">{extra.price}₺</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Toplam Fiyat */}
            <div className="border-t border-gray-800 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">Toplam Tutar:</span>
                <span className="text-2xl font-bold text-red-500">{step2Data.totalPrice}₺</span>
              </div>
            </div>
          </div>

          {/* Kişisel Bilgiler Formu */}
          <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-white">Kişisel Bilgiler</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 hover:border-gray-600 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 hover:border-gray-600 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 hover:border-gray-600 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Notlar (Opsiyonel)
                </label>
                <textarea
                  value={personalInfo.notes}
                  onChange={(e) => setPersonalInfo({...personalInfo, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 hover:border-gray-600 transition-colors"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Rezervasyonu Tamamla
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 