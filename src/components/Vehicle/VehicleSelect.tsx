'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface Vehicle {
  id: number;
  name: string;
  description: string;
  images: string[];
  passengerCapacity: string;
  luggageCapacity: string;
  features: string[];
  extraFeatures: string[];
  price: number;
  isPopular?: boolean;
}

interface ExtraService {
  id: number;
  name: string;
  price: number;
}

interface VehicleSelectProps {
  onVehicleSelect: (data: {
    vehicleId: number | null;
    extras: number[];
    vehiclePrice: number;
    vehicleName: string;
    selectedExtras: { name: string; price: number }[];
  }) => void;
  initialPrice: number;
}

// Move vehicles array outside component
const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Ekonomik VIP",
    description: "Geniş iç hacim deri koltuklar ve özel iç tasarım.",
    images: [
      "/vehicles/ekonomik1.jpg",
      "/vehicles/ekonomik2.jpg",
      "/vehicles/ekonomik3.jpg",
      "/vehicles/ekonomik4.jpg",
      "/vehicles/ekonomik5.jpg"
    ],
    passengerCapacity: "1-5",
    luggageCapacity: "1-5",
    features: [
      "Fiyata Dahil Hizmetlerdir",
      "TV & WiFi & BUZDOLAP",
      "Bebek koltuk",
      "SU Ücretsiz",
      "Alıştırmalık",
      "Mini Bar ( Ücretli )"
    ],
    extraFeatures: [
      "İsim levhası ile buluşma",
      "Gizli Maliyet Yok"
    ],
    price: 25
  },
  {
    id: 2,
    name: "Premium VIP (Ultra Lüx)",
    description: "🌟 VIP Deneyimin Zirvesi - En Çok Tercih Edilen 🌟\nLüks, konfor ve prestijin mükemmel uyumu. Özel şoför ve premium hizmet garantisi.",
    images: [
      "/vehicles/premium1.jpg",
      "/vehicles/premium2.jpg",
      "/vehicles/premium3.jpg",
      "/vehicles/premium4.jpg",
      "/vehicles/premium5.jpg"
    ],
    passengerCapacity: "12",
    luggageCapacity: "12",
    features: [
      "✨ Premium Hizmetler Dahil",
      "📱 Yüksek Hızlı WiFi & 4K TV",
      "❄️ Özel Mini Bar & Buzdolabı",
      "👶 Lüks Bebek Koltuğu",
      "🌊 Premium İçecek İkramları",
      "💺 Masajlı VIP Koltuklar"
    ],
    extraFeatures: [
      "🎯 VIP Karşılama ve İsim Tabelası",
      "💎 %100 Müşteri Memnuniyeti",
      "🏆 En Çok Tercih Edilen Seçenek",
      "⭐ Premium Müşteri Desteği"
    ],
    price: 35,
    isPopular: true
  },
  {
    id: 3,
    name: "Business VIP",
    description: "İş seyahatleri için özel tasarlanmış konfor.",
    images: [
      "/vehicles/business1.jpg",
      "/vehicles/business2.jpg",
      "/vehicles/business3.jpg",
      "/vehicles/business4.jpg",
      "/vehicles/business5.jpg"
    ],
    passengerCapacity: "1-3",
    luggageCapacity: "1-3",
    features: [
      "Fiyata Dahil Hizmetlerdir",
      "TV & WiFi & BUZDOLAP",
      "Çalışma Masası",
      "SU Ücretsiz",
      "Mini Bar ( Ücretli )"
    ],
    extraFeatures: [
      "İsim levhası ile buluşma",
      "Gizli Maliyet Yok"
    ],
    price: 30
  },
  {
    id: 4,
    name: "Aile VIP",
    description: "Geniş aileler için ideal seçim.",
    images: [
      "/vehicles/family1.jpg",
      "/vehicles/family2.jpg",
      "/vehicles/family3.jpg",
      "/vehicles/family4.jpg",
      "/vehicles/family5.jpg"
    ],
    passengerCapacity: "6-8",
    luggageCapacity: "6-8",
    features: [
      "Fiyata Dahil Hizmetlerdir",
      "TV & WiFi & BUZDOLAP",
      "2 Bebek koltuğu",
      "SU Ücretsiz",
      "Alıştırmalık",
      "Mini Bar ( Ücretli )"
    ],
    extraFeatures: [
      "İsim levhası ile buluşma",
      "Gizli Maliyet Yok"
    ],
    price: 40
  },
  {
    id: 5,
    name: "Luxury VIP",
    description: "En üst düzey konfor ve lüks deneyim.",
    images: [
      "/vehicles/luxury1.jpg",
      "/vehicles/luxury2.jpg",
      "/vehicles/luxury3.jpg",
      "/vehicles/luxury4.jpg",
      "/vehicles/luxury5.jpg"
    ],
    passengerCapacity: "1-4",
    luggageCapacity: "1-4",
    features: [
      "Fiyata Dahil Hizmetlerdir",
      "TV & WiFi & BUZDOLAP",
      "Masaj Koltuğu",
      "SU Ücretsiz",
      "Alıştırmalık",
      "Mini Bar ( Ücretli )"
    ],
    extraFeatures: [
      "İsim levhası ile buluşma",
      "Gizli Maliyet Yok"
    ],
    price: 45
  }
];

const extraServices: ExtraService[] = [
  { id: 1, name: "Buket Çiçek", price: 30 },
  { id: 2, name: "Şişe Şampanya", price: 25 },
  { id: 3, name: "Meyve Tabağı", price: 15 },
  { id: 4, name: "Uçan Balon (Adet)", price: 10 }
];

const VehicleSelect: React.FC<VehicleSelectProps> = ({ onVehicleSelect, initialPrice }) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [selectedExtrasMap, setSelectedExtrasMap] = useState<{ [key: number]: number[] }>({});
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Araç seçimi
  const handleVehicleSelect = (vehicleId: number) => {
    const selectedVehicle = vehicles.find(v => v.id === vehicleId);
    if (selectedVehicle) {
      const vehicleExtras = selectedExtrasMap[vehicleId] || [];
      const selectedExtrasDetails = vehicleExtras.map(id => {
        const service = extraServices.find(s => s.id === id);
        return {
          name: service?.name || '',
          price: service?.price || 0
        };
      });

      const extrasTotal = vehicleExtras.reduce((sum, id) => {
        const service = extraServices.find(s => s.id === id);
        return sum + (service?.price || 0);
      }, 0);

      onVehicleSelect({
        vehicleId,
        extras: vehicleExtras,
        vehiclePrice: selectedVehicle.price + extrasTotal,
        vehicleName: selectedVehicle.name,
        selectedExtras: selectedExtrasDetails
      });
    }
  };

  // Ek hizmet seçimi
  const handleExtraServiceToggle = (vehicleId: number, serviceId: number) => {
    setSelectedExtrasMap(prev => {
      const vehicleExtras = prev[vehicleId] || [];
      const updatedExtras = vehicleExtras.includes(serviceId)
        ? vehicleExtras.filter(id => id !== serviceId)
        : [...vehicleExtras, serviceId];
      
      return {
        ...prev,
        [vehicleId]: updatedExtras
      };
    });
  };

  // Resim navigasyonu
  const nextImage = (vehicleId: number, maxLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [vehicleId]: (prev[vehicleId] + 1) % maxLength || 0
    }));
  };

  const prevImage = (vehicleId: number, maxLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [vehicleId]: prev[vehicleId] === 0 ? maxLength - 1 : (prev[vehicleId] - 1) || 0
    }));
  };

  const getCurrentImageIndex = (vehicleId: number) => {
    return currentImageIndices[vehicleId] || 0;
  };

  return (
    <div className="max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] mx-auto space-y-3 p-2">
      {vehicles.map((vehicle) => {
        const currentImageIndex = getCurrentImageIndex(vehicle.id);
        const vehicleExtras = selectedExtrasMap[vehicle.id] || [];
        const selectedExtrasDetails = vehicleExtras.map(id => {
          const service = extraServices.find(s => s.id === id);
          return {
            name: service?.name || '',
            price: service?.price || 0
          };
        });

        const extrasTotal = selectedExtrasDetails.reduce((sum, extra) => sum + extra.price, 0);
        const vehicleTotal = vehicle.price + extrasTotal;
        const isSelected = selectedVehicleId === vehicle.id;

        return (
          <div
            key={vehicle.id}
            className={`bg-black/80 backdrop-blur-sm rounded-xl p-2 lg:p-3 border ${
              vehicle.id === selectedVehicleId
                ? vehicle.isPopular
                  ? 'border-blue-500 ring-2 ring-blue-500'
                  : 'border-red-500 ring-2 ring-red-500'
                : vehicle.isPopular
                ? 'border-blue-500/50 hover:border-blue-500'
                : 'border-gray-800 hover:border-red-500'
            } transition-all duration-300 relative`}
          >
            {vehicle.isPopular && (
              <>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg z-10 whitespace-nowrap flex items-center gap-2">
                  <span className="animate-pulse">👑</span>
                  <span>En Çok Tercih Edilen</span>
                  <span className="animate-pulse">👑</span>
                </div>
                <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold transform rotate-12 shadow-lg z-10">
                  Premium Seçim 🌟
                </div>
              </>
            )}
            
            <div className="grid grid-cols-12 gap-2 lg:gap-4">
              {/* Araç Görseli */}
              <div className={`relative ${vehicle.isPopular ? 'col-span-12 md:col-span-4' : 'col-span-12 md:col-span-3'}`}>
                <div className="absolute inset-0 flex items-center justify-between z-10 px-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(vehicle.id, vehicle.images.length);
                    }} 
                    className="w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors text-lg"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(vehicle.id, vehicle.images.length);
                    }} 
                    className="w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors text-lg"
                  >
                    ›
                  </button>
                </div>
                <div className="relative h-full w-full group">
                  <Image
                    src={vehicle.images[currentImageIndex]}
                    alt={vehicle.name}
                    fill
                    className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                  {vehicle.images.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndices(prev => ({ ...prev, [vehicle.id]: idx }));
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Özellikler */}
              <div className={`${vehicle.isPopular ? 'col-span-12 md:col-span-5' : 'col-span-12 md:col-span-6'} space-y-3`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-bold ${vehicle.isPopular ? 'text-blue-400' : 'text-white'}`}>
                      {vehicle.name}
                      {vehicle.isPopular && <span className="ml-2 text-yellow-400">⭐</span>}
                    </h3>
                    <p className="text-gray-400 mt-1">{vehicle.description}</p>
                  </div>
                  <div className="text-right">
                    {vehicle.isPopular ? (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
                        <p className="text-sm text-blue-400">Premium Fiyat</p>
                        <p className="text-2xl font-bold text-white">
                          {vehicle.price}₺
                          <span className="text-blue-400 text-sm ml-1">/kişi</span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-xl font-semibold text-white">
                        {vehicle.price}₺
                        <span className="text-gray-400 text-sm ml-1">/kişi</span>
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Yolcu</span>
                    <span className="font-medium ml-1">{vehicle.passengerCapacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Bavul</span>
                    <span className="font-medium ml-1">{vehicle.luggageCapacity}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2 space-y-0.5">
                  {vehicle.extraFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs">
                      <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ek Hizmetler ve Fiyat */}
              <div className="col-span-12 md:col-span-3 text-white">
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <h4 className="text-xs font-medium mb-2 text-gray-400 uppercase tracking-wider">Ek Hizmetler</h4>
                  <div className="space-y-2">
                    {extraServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between text-xs group">
                        <label className="flex items-center gap-2 cursor-pointer w-full">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={vehicleExtras.includes(service.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleExtraServiceToggle(vehicle.id, service.id);
                              }}
                              className="w-3.5 h-3.5 rounded-full text-blue-500 focus:ring-blue-500 focus:ring-offset-0 focus:ring-2 border-gray-600 bg-gray-700"
                            />
                          </div>
                          <div className="flex justify-between w-full">
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                              {service.name}
                            </span>
                            <span className="text-gray-400 group-hover:text-gray-200 transition-colors">
                              +{service.price}$
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {selectedExtrasDetails.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-800">
                      <div className="text-xs text-gray-400">Seçilen Ek Hizmetler:</div>
                      <div className="mt-1 space-y-1">
                        {selectedExtrasDetails.map((extra, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-gray-400">
                            <span>{extra.name}</span>
                            <span>+{extra.price}$</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-xs font-medium text-gray-300 pt-1 border-t border-gray-800">
                          <span>Ek Hizmet Toplamı:</span>
                          <span>+{extrasTotal}$</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-gray-300">Genel Toplam:</span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${vehicle.isPopular ? 'text-blue-400' : 'text-red-400'}`}>
                        {vehicleTotal}
                      </span>
                      <span className="text-sm text-gray-400">$</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVehicleSelect(vehicle.id);
                    }}
                    className={`w-full mt-2 py-2 rounded text-sm font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                      vehicle.isPopular
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {vehicle.isPopular ? 'HEMEN REZERVASYON YAP' : 'REZERVASYON YAP'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-6xl max-h-[90vh] aspect-video">
            <Image
              src={selectedImage}
              alt="Büyütülmüş görsel"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleSelect; 