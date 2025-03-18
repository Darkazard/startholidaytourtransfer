'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/solid'
import { MapPinIcon, UserIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import VehicleList from '@/components/Vehicle/VehicleList'

interface Step1Data {
  pickupLocation: string
  dropoffLocation: string
  adults: number
  children: number
  currency: string
  price: number
}

interface VideoData {
  id: number
  thumbnail: string
  title: string
  youtubeUrl: string
}

interface Route {
  from: string
  to: string
  price: number
}

const routes: Route[] = [
  { from: 'Antalya Havalimanı', to: 'Konyaaltı', price: 1440 },
  { from: 'Antalya Havalimanı', to: 'Lara', price: 1260 },
  { from: 'Antalya Havalimanı', to: 'Kundu', price: 1260 },
  { from: 'Antalya Havalimanı', to: 'Kaleiçi', price: 1440 },
  { from: 'Antalya Havalimanı', to: 'Beldibi', price: 1980 },
  { from: 'Antalya Havalimanı', to: 'Göynük', price: 1980 },
  { from: 'Antalya Havalimanı', to: 'Kemer', price: 1980 },
  { from: 'Antalya Havalimanı', to: 'Kiriş', price: 2160 },
  { from: 'Antalya Havalimanı', to: 'Çamyuva', price: 2160 },
  { from: 'Antalya Havalimanı', to: 'Tekirova', price: 2160 },
  { from: 'Antalya Havalimanı', to: 'Kadriye Belek', price: 1800 },
  { from: 'Antalya Havalimanı', to: 'Bogazkent', price: 1800 },
  { from: 'Antalya Havalimanı', to: 'Side', price: 1980 },
  { from: 'Antalya Havalimanı', to: 'Kızılağaç', price: 2160 },
  { from: 'Antalya Havalimanı', to: 'Kızılot', price: 2160 },
  { from: 'Antalya Havalimanı', to: 'Okurcalar', price: 2520 },
  { from: 'Antalya Havalimanı', to: 'Türkler', price: 2880 },
  { from: 'Antalya Havalimanı', to: 'Konaklı', price: 2880 },
  { from: 'Antalya Havalimanı', to: 'Alanya merkez', price: 2880 },
  { from: 'Antalya Havalimanı', to: 'Mahmutlar', price: 3600 },
  { from: 'Antalya Havalimanı', to: 'Kargıcak', price: 3420 }
]

export default function ReservationForm({ showExtras = true }: { showExtras?: boolean }) {
  const router = useRouter()
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step1Data, setStep1Data] = useState<Step1Data>({
    pickupLocation: 'Antalya Havalimanı',
    dropoffLocation: '',
    adults: 1,
    children: 0,
    currency: 'TRY',
    price: 0
  })

  // Ortak input stilleri
  const inputClasses = "w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 hover:border-gray-600 transition-colors appearance-none"
  const labelClasses = "block text-sm font-medium text-gray-300 mb-2"
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false)

  const totalPassengers = step1Data.adults + step1Data.children

  const locations = [
    'Antalya Havalimanı',
    'Konyaaltı',
    'Lara',
    'Kundu',
    'Kaleiçi',
    'Beldibi',
    'Göynük',
    'Kemer',
    'Kiriş',
    'Çamyuva',
    'Tekirova',
    'Kadriye Belek',
    'Bogazkent',
    'Side',
    'Kızılağaç',
    'Kızılot',
    'Okurcalar',
    'Türkler',
    'Konaklı',
    'Alanya merkez',
    'Mahmutlar',
    'Kargıcak'
  ]

  const currencies = [
    { code: 'TRY', symbol: '₺', name: 'Türk Lirası' },
    { code: 'USD', symbol: '$', name: 'Amerikan Doları' },
    { code: 'EUR', symbol: '€', name: 'Euro' }
  ]

  const videos: VideoData[] = [
    {
      id: 1,
      thumbnail: '/video-thumb1.jpg',
      title: 'Transfer Hizmetlerimiz',
      youtubeUrl: 'https://www.youtube.com/embed/NApPUzQpDAc'
    },
    {
      id: 2,
      thumbnail: '/video-thumb2.jpg',
      title: 'VIP Araçlarımız',
      youtubeUrl: 'https://www.youtube.com/embed/VIDEO_ID_2'
    },
    {
      id: 3,
      thumbnail: '/video-thumb3.jpg',
      title: 'Müşteri Deneyimleri',
      youtubeUrl: 'https://www.youtube.com/embed/VIDEO_ID_3'
    }
  ]

  // Güzergah seçildiğinde fiyatı güncelle
  const findRoutePrice = (from: string, to: string): number => {
    const route = routes.find(r => r.from.toLowerCase() === from.toLowerCase() && r.to.toLowerCase() === to.toLowerCase());
    
    if (!route && from && to) {
      // Güzergah listede yoksa -1 döndür (özel durum için)
      return -1;
    }
    
    return route ? route.price : 0;
  };

  // Form değişikliklerini takip et ve fiyatı güncelle
  useEffect(() => {
    if (step1Data.pickupLocation && step1Data.dropoffLocation) {
      const price = findRoutePrice(step1Data.pickupLocation, step1Data.dropoffLocation);
      setStep1Data(prev => ({ ...prev, price }));
    }
  }, [step1Data.pickupLocation, step1Data.dropoffLocation]);

  // Form gönderildiğinde
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step1Data.price === -1) {
      // Listede olmayan güzergah için WhatsApp'a yönlendir
      window.location.href = `https://wa.me/+905435043030?text=Merhaba,%20${step1Data.pickupLocation}%20-%20${step1Data.dropoffLocation}%20güzergahı%20için%20fiyat%20bilgisi%20alabilir%20miyim?`;
    } else if (step1Data.price > 0) {
      localStorage.setItem('reservationStep1', JSON.stringify(step1Data));
      router.push('/reservation/step2');
    }
  };

  // Fiyat listesinden seçim yapıldığında
  const handleRouteSelect = (from: string, to: string, price: number) => {
    const newStep1Data = {
      ...step1Data,
      pickupLocation: from,
      dropoffLocation: to,
      price: price
    };
    
    setStep1Data(newStep1Data);
    localStorage.setItem('reservationStep1', JSON.stringify(newStep1Data));
    router.push('/reservation/step2');
  };

  // Fiyat listesi bileşeni
  function PriceList() {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-white text-center mb-4">
          Transfer Fiyat Listesi
        </h3>
        <p className="text-center text-gray-400 mb-8">
          Güzergah seçimi için tıklayınız
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {routes.map((route, index) => (
            <div
              key={index}
              onClick={() => handleRouteSelect(route.from, route.to, route.price)}
              className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group cursor-pointer hover:border-red-500"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <svg 
                    className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Nereden</p>
                    <p className="text-white font-medium">{route.from}</p>
                    <p className="text-sm text-gray-400 mt-2">Nereye</p>
                    <p className="text-white font-medium">{route.to}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-red-500 group-hover:text-red-600 transition-colors">
                    {route.price} ₺
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4">
      {/* Mobil Tasarım */}
      <div className="md:hidden">
        {/* Rezervasyon Formu */}
        <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-4 relative z-10 mx-auto max-w-5xl w-full border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="relative">
                <label className={labelClasses}>Nereden ?</label>
                <MapPinIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.pickupLocation}
                  onChange={(e) => setStep1Data({...step1Data, pickupLocation: e.target.value})}
                  className={`${inputClasses} bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjkzIDEuNWEuOTk3Ljk5NyAwIDAgMSAxLjQxNCAwbDYuNjQ3IDYuNjQ2YS45OTcuOTk3IDAgMCAxLS43MDcgMS43MDdIMi4zNTNhLjk5Ny45OTcgMCAwIDEtLjcwNy0xLjcwN2w2LjY0Ny02LjY0NnoiLz48L3N2Zz4=') no-repeat right 0.75rem center/12px 12px`}
                  required
                >
                  <option value="" disabled>Seçiniz</option>
                  {locations.map((location) => (
                    <option 
                      key={location} 
                      value={location}
                      className="bg-gray-800 text-white py-2 hover:bg-gray-700"
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className={labelClasses}>Nereye ?</label>
                <MapPinIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.dropoffLocation}
                  onChange={(e) => setStep1Data({...step1Data, dropoffLocation: e.target.value})}
                  className={`${inputClasses} bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjkzIDEuNWEuOTk3Ljk5NyAwIDAgMSAxLjQxNCAwbDYuNjQ3IDYuNjQ2YS45OTcuOTk3IDAgMCAxLS43MDcgMS43MDdIMi4zNTNhLjk5Ny45OTcgMCAwIDEtLjcwNy0xLjcwN2w2LjY0Ny02LjY0NnoiLz48L3N2Zz4=') no-repeat right 0.75rem center/12px 12px`}
                  required
                >
                  <option value="" disabled>Seçiniz</option>
                  {locations.map((location) => (
                    <option 
                      key={location} 
                      value={location}
                      className="bg-gray-800 text-white py-2 hover:bg-gray-700"
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className={labelClasses}>Kişi ?</label>
                <UserIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                  className={`${inputClasses} text-left`}
                >
                  {totalPassengers} Yolcu
                </button>
                {isPassengerDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-3 space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white">Yetişkin</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, adults: Math.max(1, prev.adults - 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >-</button>
                            <span className="text-white w-4 text-center">{step1Data.adults}</span>
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, adults: Math.min(10, prev.adults + 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Çocuk</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, children: Math.max(0, prev.children - 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >-</button>
                            <span className="text-white w-4 text-center">{step1Data.children}</span>
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, children: Math.min(10, prev.children + 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <label className={labelClasses}>Para Birimi ?</label>
                <CurrencyDollarIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.currency}
                  onChange={(e) => setStep1Data({...step1Data, currency: e.target.value})}
                  className={inputClasses}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={step1Data.price === 0}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                step1Data.price === 0 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : step1Data.price === -1
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {step1Data.price === 0 
                ? 'LÜTFEN GÜZERGAH SEÇİNİZ' 
                : step1Data.price === -1
                ? 'REZERVASYON İÇİN TIKLA'
                : `FİYAT: ${step1Data.price}₺ - REZERVASYON YAP`}
            </button>
          </form>
        </div>
      </div>

      {/* Masaüstü Tasarım */}
      <div className="hidden md:block">
        {/* Rezervasyon Formu */}
        <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 relative z-10 mx-auto max-w-5xl w-full border border-gray-800">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="relative">
                <label className={labelClasses}>Nereden ?</label>
                <MapPinIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.pickupLocation}
                  onChange={(e) => setStep1Data({...step1Data, pickupLocation: e.target.value})}
                  className={`${inputClasses} bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjkzIDEuNWEuOTk3Ljk5NyAwIDAgMSAxLjQxNCAwbDYuNjQ3IDYuNjQ2YS45OTcuOTk3IDAgMCAxLS43MDcgMS43MDdIMi4zNTNhLjk5Ny45OTcgMCAwIDEtLjcwNy0xLjcwN2w2LjY0Ny02LjY0NnoiLz48L3N2Zz4=') no-repeat right 0.75rem center/12px 12px`}
                  required
                >
                  <option value="" disabled>Seçiniz</option>
                  {locations.map((location) => (
                    <option 
                      key={location} 
                      value={location}
                      className="bg-gray-800 text-white py-2 hover:bg-gray-700"
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className={labelClasses}>Nereye ?</label>
                <MapPinIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.dropoffLocation}
                  onChange={(e) => setStep1Data({...step1Data, dropoffLocation: e.target.value})}
                  className={`${inputClasses} bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjkzIDEuNWEuOTk3Ljk5NyAwIDAgMSAxLjQxNCAwbDYuNjQ3IDYuNjQ2YS45OTcuOTk3IDAgMCAxLS43MDcgMS43MDdIMi4zNTNhLjk5Ny45OTcgMCAwIDEtLjcwNy0xLjcwN2w2LjY0Ny02LjY0NnoiLz48L3N2Zz4=') no-repeat right 0.75rem center/12px 12px`}
                  required
                >
                  <option value="" disabled>Seçiniz</option>
                  {locations.map((location) => (
                    <option 
                      key={location} 
                      value={location}
                      className="bg-gray-800 text-white py-2 hover:bg-gray-700"
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className={labelClasses}>Kişi ?</label>
                <UserIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                  className={`${inputClasses} text-left`}
                >
                  {totalPassengers} Yolcu
                </button>
                {isPassengerDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-3 space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white">Yetişkin</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, adults: Math.max(1, prev.adults - 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >-</button>
                            <span className="text-white w-4 text-center">{step1Data.adults}</span>
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, adults: Math.min(10, prev.adults + 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Çocuk</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, children: Math.max(0, prev.children - 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >-</button>
                            <span className="text-white w-4 text-center">{step1Data.children}</span>
                            <button
                              type="button"
                              onClick={() => setStep1Data(prev => ({...prev, children: Math.min(10, prev.children + 1)}))}
                              className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <label className={labelClasses}>Para Birimi ?</label>
                <CurrencyDollarIcon className="absolute left-3 top-[38px] w-5 h-5 text-gray-500" />
                <select
                  value={step1Data.currency}
                  onChange={(e) => setStep1Data({...step1Data, currency: e.target.value})}
                  className={inputClasses}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={step1Data.price === 0}
              className={`w-full py-3 rounded-lg font-medium transition-colors mt-3 ${
                step1Data.price === 0 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : step1Data.price === -1
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {step1Data.price === 0 
                ? 'LÜTFEN GÜZERGAH SEÇİNİZ' 
                : step1Data.price === -1
                ? 'REZERVASYON İÇİN TIKLA'
                : `FİYAT: ${step1Data.price}₺ - REZERVASYON YAP`}
            </button>
          </form>
        </div>
      </div>

      {showExtras && (
        <>
          {/* Video Galerisi */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white text-center mb-4">Biz Kimiz</h2>
            <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 relative z-10 mx-auto max-w-5xl w-full border border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => {
                      setSelectedVideo(video.youtubeUrl)
                      setIsModalOpen(true)
                    }}
                    className="relative group cursor-pointer rounded-lg overflow-hidden"
                  >
                    <div className="aspect-video bg-gray-900 flex items-center justify-center">
                      <PlayIcon className="w-16 h-16 text-red-500 group-hover:text-red-600 group-hover:scale-125 transition-all duration-300 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white text-center mb-6">SOSYAL MEDYA</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-red-500 transition-colors w-full flex items-center justify-center"
                >
                  <img src="/instagram.png" alt="Instagram" className="h-12 w-auto" />
                </a>
                <span className="text-gray-300 text-sm text-center">Lütfen inceleyiniz</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://www.tripadvisor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-red-500 transition-colors w-full flex items-center justify-center"
                >
                  <img src="/tripadvisor.png" alt="TripAdvisor" className="h-12 w-auto" />
                </a>
                <span className="text-gray-300 text-sm text-center">Lütfen yorumları okuyun</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://www.google.com/business/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-red-500 transition-colors w-full flex items-center justify-center"
                >
                  <img src="/google-reviews.png" alt="Google Reviews" className="h-12 w-auto" />
                </a>
                <span className="text-gray-300 text-sm text-center">Lütfen yorumları okuyun</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Fiyat Listesi */}
      <PriceList />

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-auto max-h-[80vh] max-w-[95vw] md:max-w-[80vw]">
            <div className="w-full h-full md:aspect-video">
              <iframe
                src={selectedVideo}
                className="w-full h-[50vh] md:h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => {
                setIsModalOpen(false)
                setSelectedVideo(null)
              }}
              className="absolute -top-8 right-2 md:-right-8 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 