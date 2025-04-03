'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useTripType } from '@/contexts/TripTypeContext';
import { translations } from '@/translations';

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
  maxPassengers: number;
  extras: Extra[];
}

interface ExtraService {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface Extra {
  id: number;
  name: string;
  price: number;
}

interface Step1Data {
  pickupLocation: string
  dropoffLocation: string
  adults: number
  children: number
  currency: string
  price: number
}

interface VehicleSelectProps {
  onVehicleSelect: (data: {
    vehicleId: number | null
    extras: number[]
    vehiclePrice: number
    vehicleName: string
    selectedExtras: { name: string; price: number }[]
    vehicleImage: string
    tripType: 'one-way' | 'round-trip'
  }) => void
  initialPrice: number
  onTripTypeChange: (tripType: 'one-way' | 'round-trip') => void
}

type TripType = 'one-way' | 'round-trip';

interface TripTypeSelectorProps {
  vehicleId: string;
  selectedTripType: TripType;
  onTripTypeChange: (tripType: TripType) => void;
}

// Move vehicles array outside component
const getVehicles = (lang: string): Vehicle[] => {
  switch (lang) {
    case 'tr':
      return [
        {
          id: 1,
          name: "Ekonomik",
          description: "Konforlu ve ekonomik seyahat seçeneği",
          images: [
            "/vehicles/ekonomik1.jpg",
            "/vehicles/ekonomik2.jpg",
            "/vehicles/ekonomik3.jpg"
          ],
          passengerCapacity: "1-5",
          luggageCapacity: "1-5",
          features: [
            "Fiyata Dahil Hizmetler",
            "Bebek Koltuğu",
            "ÜCRETSİZ Su"
          ],
          extraFeatures: [
            "İsim Tabelası ile Karşılama",
            "Gizli Ücret Yok"
          ],
          price: 0,
          maxPassengers: 6,
          extras: []
        },
        {
          id: 2,
          name: "Premium",
          description: "Premium araç ile lüks seyahat deneyimi",
          images: [
            "/vehicles/premium1.jpg",
            "/vehicles/premium2.jpg",
            "/vehicles/premium3.jpg",
            "/vehicles/premium4.jpg"
          ],
          passengerCapacity: "1-4",
          luggageCapacity: "1-4",
          features: [
            "✨ Premium Hizmetler Dahil",
            "📱 Yüksek Hızlı WiFi & 4K TV",
            "❄️ Özel Mini Bar & Buzdolabı",
            "👶 Lüks Bebek Koltuğu",
            "🌊 Premium İçecek Servisi",
            "💺 VIP Masaj Koltukları"
          ],
          extraFeatures: [
            "🎯 İsim Tabelası ile VIP Karşılama",
            "💎 %100 Müşteri Memnuniyeti",
            "🏆 En Çok Tercih Edilen Seçenek",
            "⭐ Premium Müşteri Desteği"
          ],
          price: 10,
          isPopular: true,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 3,
          name: "Maybach",
          description: "VIP seyahat için ultra lüks Maybach",
          images: [
            "/vehicles/maybach1.jpg",
            "/vehicles/maybach2.jpg",
            "/vehicles/maybach3.jpg",
            "/vehicles/maybach4.jpg",
            "/vehicles/maybach5.jpg"
          ],
          passengerCapacity: "1-4",
          luggageCapacity: "1-4",
          features: [
            "Fiyata Dahil Hizmetler",
            "TV & WiFi & BUZDOLABI",
            "Çalışma Masası",
            "ÜCRETSİZ Su",
            "Mini Bar (Ücretli)"
          ],
          extraFeatures: [
            "İsim Tabelası ile Karşılama",
            "Gizli Ücret Yok"
          ],
          price: 25,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 4,
          name: "VIP Sprinter",
          description: "Büyük gruplar için ideal seçim",
          images: [
            "/vehicles/sprinter1.jpg",
            "/vehicles/sprinter2.jpg",
            "/vehicles/sprinter3.jpg"
          ],
          passengerCapacity: "7-13",
          luggageCapacity: "7-13",
          features: [
            "Fiyata Dahil Hizmetler",
            "ÜCRETSİZ Su",
            "1 Çocuk Koltuğu"
          ],
          extraFeatures: [
            "İsim Tabelası ile Karşılama",
            "Gizli Ücret Yok"
          ],
          price: 20,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 5,
          name: "VIP Sprinter Plus",
          description: "Büyük gruplar için ultimatif lüks deneyim",
          images: [
            "/vehicles/sprinterplus1.jpg",
            "/vehicles/sprinterplus2.jpg",
            "/vehicles/sprinterplus3.jpg",
            "/vehicles/sprinterplus4.jpg"
          ],
          passengerCapacity: "6-12",
          luggageCapacity: "6-12",
          features: [
            "Fiyata Dahil Hizmetler",
            "TV & WiFi & BUZDOLABI",
            "Çalışma Masası",
            "ÜCRETSİZ Su",
            "Mini Bar (Ücretli)"
          ],
          extraFeatures: [
            "İsim Tabelası ile Karşılama",
            "Gizli Ücret Yok"
          ],
          price: 30,
          maxPassengers: 16,
          extras: []
        }
      ];
    case 'de':
      return [
        {
          id: 1,
          name: "Ekonomisch",
          description: "Komfortable und wirtschaftliche Reisemöglichkeit",
          images: [
            "/vehicles/ekonomik1.jpg",
            "/vehicles/ekonomik2.jpg",
            "/vehicles/ekonomik3.jpg"
          ],
          passengerCapacity: "1-5",
          luggageCapacity: "1-5",
          features: [
            "Im Preis enthaltene Leistungen",
            "Babysitz",
            "GRATIS Wasser"
          ],
          extraFeatures: [
            "Treffen mit Namensschild",
            "Keine versteckten Kosten"
          ],
          price: 0,
          maxPassengers: 6,
          extras: []
        },
        {
          id: 2,
          name: "Premium",
          description: "Premium-Fahrzeug mit Luxus-Reiseerlebnis",
          images: [
            "/vehicles/premium1.jpg",
            "/vehicles/premium2.jpg",
            "/vehicles/premium3.jpg",
            "/vehicles/premium4.jpg"
          ],
          passengerCapacity: "1-4",
          luggageCapacity: "1-4",
          features: [
            "✨ Premium-Dienste inklusive",
            "📱 Hochgeschwindigkeits-WLAN & 4K TV",
            "❄️ Private Minibar & Kühlschrank",
            "👶 Luxus-Babysitz",
            "🌊 Premium-Getränkeservice",
            "💺 VIP-Massagesitze"
          ],
          extraFeatures: [
            "🎯 VIP-Empfang mit Namensschild",
            "💎 100% Kundenzufriedenheit",
            "🏆 Meistgewählte Option",
            "⭐ Premium-Kundenbetreuung"
          ],
          price: 10,
          isPopular: true,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 3,
          name: "Maybach",
          description: "Ultra-Luxus Maybach für VIP-Reisen",
          images: [
            "/vehicles/maybach1.jpg",
            "/vehicles/maybach2.jpg",
            "/vehicles/maybach3.jpg",
            "/vehicles/maybach4.jpg",
            "/vehicles/maybach5.jpg"
          ],
          passengerCapacity: "1-3",
          luggageCapacity: "1-3",
          features: [
            "Im Preis enthaltene Leistungen",
            "TV & WLAN & KÜHLSCHRANK",
            "Arbeitsplatz",
            "GRATIS Wasser",
            "Minibar (kostenpflichtig)"
          ],
          extraFeatures: [
            "Treffen mit Namensschild",
            "Keine versteckten Kosten"
          ],
          price: 25,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 4,
          name: "VIP Sprinter",
          description: "Ideale Wahl für große Gruppen",
          images: [
            "/vehicles/sprinter1.jpg",
            "/vehicles/sprinter2.jpg",
            "/vehicles/sprinter3.jpg"
          ],
          passengerCapacity: "7-13",
          luggageCapacity: "7-13",
          features: [
            "Im Preis enthaltene Leistungen",
            "GRATIS Wasser",
            "1 Kindersitz"
          ],
          extraFeatures: [
            "Treffen mit Namensschild",
            "Keine versteckten Kosten"
          ],
          price: 20,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 5,
          name: "VIP Sprinter Plus",
          description: "Ultimatives Luxus-Erlebnis für große Gruppen",
          images: [
            "/vehicles/sprinterplus1.jpg",
            "/vehicles/sprinterplus2.jpg",
            "/vehicles/sprinterplus3.jpg",
            "/vehicles/sprinterplus4.jpg"
          ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
          features: [
            "Im Preis enthaltene Leistungen",
            "TV & WLAN & KÜHLSCHRANK",
            "Massagesitz",
            "GRATIS Wasser",
            "Erfrischungen",
            "Minibar (kostenpflichtig)"
          ],
          extraFeatures: [
            "Treffen mit Namensschild",
            "Keine versteckten Kosten"
          ],
          price: 30,
          maxPassengers: 16,
          extras: []
        }
      ];
    case 'ru':
      return [
        {
          id: 1,
          name: "Экономичный",
          description: "Комфортный и экономичный вариант путешествия",
          images: [
            "/vehicles/ekonomik1.jpg",
            "/vehicles/ekonomik2.jpg",
            "/vehicles/ekonomik3.jpg"
          ],
          passengerCapacity: "1-5",
          luggageCapacity: "1-5",
          features: [
            "Услуги включены в цену",
            "Детское кресло",
            "БЕСПЛАТНАЯ вода"
          ],
          extraFeatures: [
            "Встреча с табличкой",
            "Без скрытых платежей"
          ],
          price: 0,
          maxPassengers: 6,
          extras: []
        },
        {
          id: 2,
          name: "Премиум",
          description: "Премиальный автомобиль с люксовым путешествием",
          images: [
            "/vehicles/premium1.jpg",
            "/vehicles/premium2.jpg",
            "/vehicles/premium3.jpg",
            "/vehicles/premium4.jpg"
          ],
          passengerCapacity: "1-4",
          luggageCapacity: "1-4",
          features: [
            "✨ Премиум-услуги включены",
            "📱 Высокоскоростной WiFi и 4K ТВ",
            "❄️ Приватный мини-бар и холодильник",
            "👶 Люкс детское кресло",
            "🌊 Премиум-напитки",
            "💺 VIP-массажные кресла"
          ],
          extraFeatures: [
            "🎯 VIP-встреча с табличкой",
            "💎 100% удовлетворенность клиентов",
            "🏆 Самый популярный вариант",
            "⭐ Премиум-поддержка"
          ],
          price: 10,
          isPopular: true,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 3,
          name: "Майбах",
          description: "Ультра-люкс Maybach для VIP-путешествий",
          images: [
            "/vehicles/maybach1.jpg",
            "/vehicles/maybach2.jpg",
            "/vehicles/maybach3.jpg",
            "/vehicles/maybach4.jpg",
            "/vehicles/maybach5.jpg"
          ],
          passengerCapacity: "1-3",
          luggageCapacity: "1-3",
          features: [
            "Услуги включены в цену",
            "ТВ и WiFi и ХОЛОДИЛЬНИК",
            "Рабочий стол",
            "БЕСПЛАТНАЯ вода",
            "Мини-бар (платный)"
          ],
          extraFeatures: [
            "Встреча с табличкой",
            "Без скрытых платежей"
          ],
          price: 25,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 4,
          name: "VIP Спринтер",
          description: "Идеальный выбор для больших групп",
          images: [
            "/vehicles/sprinter1.jpg",
            "/vehicles/sprinter2.jpg",
            "/vehicles/sprinter3.jpg"
          ],
          passengerCapacity: "7-13",
          luggageCapacity: "7-13",
          features: [
            "Услуги включены в цену",
            "БЕСПЛАТНАЯ вода",
            "1 детское кресло"
          ],
          extraFeatures: [
            "Встреча с табличкой",
            "Без скрытых платежей"
          ],
          price: 20,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 5,
          name: "VIP Спринтер Плюс",
          description: "Ультимативный люкс для больших групп",
          images: [
            "/vehicles/sprinterplus1.jpg",
            "/vehicles/sprinterplus2.jpg",
            "/vehicles/sprinterplus3.jpg",
            "/vehicles/sprinterplus4.jpg"
          ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
          features: [
            "Услуги включены в цену",
            "ТВ и WiFi и ХОЛОДИЛЬНИК",
            "Массажное кресло",
            "БЕСПЛАТНАЯ вода",
            "Напитки",
            "Мини-бар (платный)"
          ],
          extraFeatures: [
            "Встреча с табличкой",
            "Без скрытых платежей"
          ],
          price: 30,
          maxPassengers: 16,
          extras: []
        }
      ];
    case 'en':
    default:
      return [
        {
          id: 1,
          name: "Economic",
          description: "Comfortable and economical travel option",
          images: [
            "/vehicles/ekonomik1.jpg",
            "/vehicles/ekonomik2.jpg",
            "/vehicles/ekonomik3.jpg"
          ],
          passengerCapacity: "1-5",
          luggageCapacity: "1-5",
          features: [
            "Services Included in Price",
            "Baby Seat",
            "FREE Water"
          ],
          extraFeatures: [
            "Meeting with Name Sign",
            "No Hidden Costs"
          ],
          price: 0,
          maxPassengers: 6,
          extras: []
        },
        {
          id: 2,
          name: "Premium",
          description: "Premium vehicle with luxury travel experience",
          images: [
            "/vehicles/premium1.jpg",
            "/vehicles/premium2.jpg",
            "/vehicles/premium3.jpg",
            "/vehicles/premium4.jpg"
          ],
          passengerCapacity: "1-4",
          luggageCapacity: "1-4",
          features: [
            "✨ Premium Services Included",
            "📱 High-Speed WiFi & 4K TV",
            "❄️ Private Mini Bar & Fridge",
            "👶 Luxury Baby Seat",
            "🌊 Premium Beverage Service",
            "💺 Massage VIP Seats"
          ],
          extraFeatures: [
            "🎯 VIP Welcome with Name Sign",
            "💎 100% Customer Satisfaction",
            "🏆 Most Preferred Option",
            "⭐ Premium Customer Support"
          ],
          price: 10,
          isPopular: true,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 3,
          name: "Maybach",
          description: "Ultra luxury Maybach for VIP travel",
          images: [
            "/vehicles/maybach1.jpg",
            "/vehicles/maybach2.jpg",
            "/vehicles/maybach3.jpg",
            "/vehicles/maybach4.jpg",
            "/vehicles/maybach5.jpg"
          ],
          passengerCapacity: "1-3",
          luggageCapacity: "1-3",
          features: [
            "Services Included in Price",
            "TV & WiFi & FRIDGE",
            "Work Desk",
            "FREE Water",
            "Mini Bar (Paid)"
          ],
          extraFeatures: [
            "Meeting with Name Sign",
            "No Hidden Costs"
          ],
          price: 25,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 4,
          name: "VIP Sprinter",
          description: "Ideal choice for large groups",
          images: [
            "/vehicles/sprinter1.jpg",
            "/vehicles/sprinter2.jpg",
            "/vehicles/sprinter3.jpg"
          ],
          passengerCapacity: "7-13",
          luggageCapacity: "7-13",
          features: [
            "Services Included in Price",
            "FREE Water",
            "1 Child Seat"
          ],
          extraFeatures: [
            "Meeting with Name Sign",
            "No Hidden Costs"
          ],
          price: 20,
          maxPassengers: 16,
          extras: []
        },
        {
          id: 5,
          name: "VIP Sprinter Plus",
          description: "Ultimate luxury experience for large groups",
          images: [
            "/vehicles/sprinterplus1.jpg",
            "/vehicles/sprinterplus2.jpg",
            "/vehicles/sprinterplus3.jpg",
            "/vehicles/sprinterplus4.jpg"
          ],
          passengerCapacity: "6-8",
          luggageCapacity: "6-8",
          features: [
            "Services Included in Price",
            "TV & WiFi & FRIDGE",
            "Massage Seat",
            "FREE Water",
            "Refreshments",
            "Mini Bar (Paid)"
          ],
          extraFeatures: [
            "Meeting with Name Sign",
            "No Hidden Costs"
          ],
          price: 30,
          maxPassengers: 16,
          extras: []
        }
      ];
  }
};

const getExtraServices = (lang: string): ExtraService[] => {
  switch (lang) {
    case 'tr':
      return [
        {
          id: 1,
          name: "Buket Çiçek",
          price: 30,
          description: "Güzel buket çiçek"
        },
        {
          id: 2,
          name: "Şişe Şampanya",
          price: 25,
          description: "Premium şampanya"
        },
        {
          id: 3,
          name: "Meyve Tabağı",
          price: 15,
          description: "Taze meyve tabağı"
        },
        {
          id: 4,
          name: "Uçan Balon",
          price: 10,
          description: "Dekoratif balon"
        }
      ];
    case 'de':
      return [
        {
          id: 1,
          name: "Blumenstrauß",
          price: 30,
          description: "Schöner Blumenstrauß"
        },
        {
          id: 2,
          name: "Champagner",
          price: 25,
          description: "Premium Champagner"
        },
        {
          id: 3,
          name: "Obstkorb",
          price: 15,
          description: "Frischer Obstkorb"
        },
        {
          id: 4,
          name: "Fliegender Ballon",
          price: 10,
          description: "Dekorativer Ballon"
        }
      ];
    case 'ru':
      return [
        {
          id: 1,
          name: "Букет цветов",
          price: 30,
          description: "Красивый букет цветов"
        },
        {
          id: 2,
          name: "Шампанское",
          price: 25,
          description: "Премиум шампанское"
        },
        {
          id: 3,
          name: "Фруктовая корзина",
          price: 15,
          description: "Свежая фруктовая корзина"
        },
        {
          id: 4,
          name: "Воздушный шар",
          price: 10,
          description: "Декоративный шар"
        }
      ];
    case 'en':
    default:
      return [
        {
          id: 1,
          name: "Flower Bouquet",
          price: 30,
          description: "Beautiful flower bouquet"
        },
        {
          id: 2,
          name: "Champagne",
          price: 25,
          description: "Premium champagne"
        },
        {
          id: 3,
          name: "Fruit Basket",
          price: 15,
          description: "Fresh fruit basket"
        },
        {
          id: 4,
          name: "Flying Balloon",
          price: 10,
          description: "Decorative balloon"
        }
      ];
  }
};

// Trip type selection component
const TripTypeSelector = ({ vehicleId, selectedTripType, onTripTypeChange }: TripTypeSelectorProps) => {
  const params = useParams();
  const lang = (typeof params.lang === 'string' ? params.lang : '') || 'en';
  
  const getText = (lang: string) => {
    switch (lang) {
      case 'tr':
        return {
          roundTrip: 'Gidiş-Dönüş',
          discount: 'indirim',
          discountNote: 'Gidiş-Dönüş seçeneğinde 5$ indirim!'
        };
      case 'de':
        return {
          roundTrip: 'Hin und Zurück',
          discount: 'Rabatt',
          discountNote: '5$ Rabatt bei Hin- und Rückfahrt!'
        };
      case 'ru':
        return {
          roundTrip: 'Туда и обратно',
          discount: 'скидка',
          discountNote: 'Скидка 5$ при поездке туда и обратно!'
        };
      default:
        return {
          roundTrip: 'Round Trip',
          discount: 'discount',
          discountNote: '5$ discount on round trip!'
        };
    }
  };

  const texts = getText(lang);

  return (
    <div className="absolute top-2 right-2 z-10">
      <div className="flex flex-row gap-1">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-1.5">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onTripTypeChange(selectedTripType === 'round-trip' ? 'one-way' : 'round-trip')}
              className={`relative px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 w-full ${
                selectedTripType === 'round-trip'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {selectedTripType === 'round-trip' && (
                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {texts.roundTrip}
            </button>
          </div>
          <div className="text-xs text-green-400 text-center mt-1 font-medium">
            {texts.discountNote}
          </div>
        </div>
      </div>
    </div>
  );
};

const getText = (lang: string) => {
  switch (lang) {
    case 'tr':
      return {
        roundTrip: 'Gidiş-Dönüş',
        discount: 'indirim',
        discountNote: 'Gidiş-Dönüş seçeneğinde 5$ indirim!',
        vehiclePrice: 'Araç Ücreti',
        passenger: 'Yolcu',
        luggage: 'Bavul',
        extraServices: 'Ek Hizmetler',
        selectedServices: 'Seçilen Hizmetler',
        extrasTotal: 'Ek Hizmet Toplamı',
        totalAmount: 'Toplam Tutar',
        bookNow: 'HEMEN REZERVASYON YAP',
        makeReservation: 'REZERVASYON YAP',
        mostPreferred: 'En Çok Tercih Edilen',
        selected: 'Seçildi',
        select: 'Seç'
      };
    case 'de':
      return {
        roundTrip: 'Hin und Zurück',
        discount: 'Rabatt',
        discountNote: '5$ Rabatt bei Hin- und Rückfahrt!',
        vehiclePrice: 'Fahrzeugpreis',
        passenger: 'Passagier',
        luggage: 'Gepäck',
        extraServices: 'Zusätzliche Dienste',
        selectedServices: 'Ausgewählte Dienste',
        extrasTotal: 'Zusatzleistungen Gesamt',
        totalAmount: 'Gesamtbetrag',
        bookNow: 'JETZT BUCHEN',
        makeReservation: 'RESERVIERUNG VORNEHMEN',
        mostPreferred: 'Am meisten bevorzugt',
        selected: 'Ausgewählt',
        select: 'Auswählen'
      };
    case 'ru':
      return {
        roundTrip: 'Туда и обратно',
        discount: 'скидка',
        discountNote: 'Скидка 5$ при поездке туда и обратно!',
        vehiclePrice: 'Цена автомобиля',
        passenger: 'Пассажир',
        luggage: 'Багаж',
        extraServices: 'Дополнительные услуги',
        selectedServices: 'Выбранные услуги',
        extrasTotal: 'Сумма доп. услуг',
        totalAmount: 'Итого к оплате',
        bookNow: 'ЗАБРОНИРОВАТЬ СЕЙЧАС',
        makeReservation: 'СДЕЛАТЬ БРОНИРОВАНИЕ',
        mostPreferred: 'Самый предпочтительный',
        selected: 'Выбрано',
        select: 'Выбрать'
      };
    default:
      return {
        roundTrip: 'Round Trip',
        discount: 'discount',
        discountNote: '5$ discount on round trip!',
        vehiclePrice: 'Vehicle Price',
        passenger: 'Passenger',
        luggage: 'Luggage',
        extraServices: 'Extra Services',
        selectedServices: 'Selected Services',
        extrasTotal: 'Extras Total',
        totalAmount: 'Total Amount',
        bookNow: 'BOOK NOW',
        makeReservation: 'MAKE RESERVATION',
        mostPreferred: 'Most Preferred',
        selected: 'Selected',
        select: 'Select'
      };
  }
};

const VehicleSelect = ({ onVehicleSelect, initialPrice, onTripTypeChange }: VehicleSelectProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<number[]>([])
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way')
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { tripType: contextTripType, setTripType: setContextTripType } = useTripType()
  const [step1Data, setStep1Data] = useState<{
    pickupLocation: string;
    dropoffLocation: string;
    adults: number;
    children: number;
    currency: string;
    price: number;
    tripType: 'one-way' | 'round-trip';
  } | null>(null)

  useEffect(() => {
    const savedStep1 = localStorage.getItem('reservationStep1')
    if (savedStep1) {
      const parsedData = JSON.parse(savedStep1)
      setStep1Data(parsedData)
    }
  }, [])

  // URL'den dil parametresini belirle
  let lang = 'tr' // Varsayılan dil Türkçe
  if (pathname.startsWith('/de/')) {
    lang = 'de'
  } else if (pathname.startsWith('/ru/')) {
    lang = 'ru'
  } else if (pathname.startsWith('/en/')) {
    lang = 'en'
  }

  // URL'den dil parametresini al ve doğru dildeki araçları getir
  const vehicles = getVehicles(lang)
  const extraServices = getExtraServices(lang)
  const texts = getText(lang)

  const handleExtraServiceToggle = (vehicleId: number, serviceId: number) => {
    setSelectedExtras(prev => {
      const currentExtras = prev.filter(id => id !== serviceId)
      if (currentExtras.length === prev.length) {
        // Eğer hizmet seçili değilse, ekle
        return [...currentExtras, serviceId]
      } else {
        // Eğer hizmet seçiliyse, çıkar
        return currentExtras
      }
    })
  }

  const handleTripTypeChange = (vehicleId: number, type: TripType) => {
    setTripType(type)
    
    if (onTripTypeChange) {
      onTripTypeChange(type)
    }
  }

  const calculateTotalPrice = (vehicle: Vehicle, extras: { name: string; price: number }[], vehicleId: number) => {
    // Ekstra hizmetlerin toplam fiyatı
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0)
    
    let finalPrice

    if (tripType === 'round-trip') {
      // Gidiş-dönüş seçiliyse: (Güzergah fiyatı + Araç fiyatı) × 2 - 5$ indirim + Ekstra hizmetler
      finalPrice = ((initialPrice + vehicle.price) * 2) - 5 + extrasTotal
    } else {
      // Tek yön seçiliyse: Güzergah fiyatı + Araç fiyatı + Ekstra hizmetler
      finalPrice = initialPrice + vehicle.price + extrasTotal
    }
    
    return finalPrice
  }

  const handleVehicleSelect = (vehicleId: number) => {
    setSelectedVehicle(vehicleId)
    const vehicle = vehicles.find(v => v.id === vehicleId)
    if (vehicle) {
      const extrasTotal = selectedExtras.reduce((sum, extraId) => {
        const extra = extraServices.find(e => e.id === extraId)
        return sum + (extra?.price || 0)
      }, 0)

      let vehicleTotal
      if (tripType === 'round-trip') {
        vehicleTotal = ((initialPrice + vehicle.price) * 2) - 5 + extrasTotal
      } else {
        vehicleTotal = initialPrice + vehicle.price + extrasTotal
      }

      // Dil kontrolü ve yönlendirme
      let langCode = ''
      let routePath = 'rezervasyon'
      
      if (pathname.startsWith('/en/')) {
        langCode = 'en'
        routePath = 'reservation'
      } else if (pathname.startsWith('/de/')) {
        langCode = 'de'
        routePath = 'reservierung'
      } else if (pathname.startsWith('/ru/')) {
        langCode = 'ru'
        routePath = 'rezervatsiya'
      } else if (pathname.startsWith('/tr/')) {
        langCode = 'tr'
        routePath = 'rezervasyon'
      }

      const step2Data = {
        vehicleId,
        extras: selectedExtras,
        vehiclePrice: vehicle.price,
        vehicleName: vehicle.name,
        selectedExtras: selectedExtras.map(extraId => {
          const extra = extraServices.find(e => e.id === extraId)
          return { name: extra?.name || '', price: extra?.price || 0 }
        }),
        vehicleImage: vehicle.images[getCurrentImageIndex(vehicle.id)],
        tripType,
        transferPrice: initialPrice,
        totalPrice: vehicleTotal,
        currency: pathname.startsWith('/de/') ? 'EUR' : 'USD'
      }

      localStorage.setItem('reservationStep2', JSON.stringify(step2Data))
      onVehicleSelect(step2Data)

      const redirectPath = langCode ? `/${langCode}/${routePath}/step3` : '/rezervasyon/step3'
      router.push(redirectPath)
    }
  }

  // Resim navigasyonu
  const nextImage = (vehicleId: number, maxLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [vehicleId]: (prev[vehicleId] + 1) % maxLength || 0
    }))
  }

  const prevImage = (vehicleId: number, maxLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [vehicleId]: prev[vehicleId] === 0 ? maxLength - 1 : (prev[vehicleId] - 1) || 0
    }))
  }

  const getCurrentImageIndex = (vehicleId: number) => {
    return currentImageIndices[vehicleId] || 0
  }

  return (
    <div className="max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] mx-auto space-y-3 p-2">
      {/* Transfer Özeti */}
      {step1Data && (
        <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Transfer Özeti</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-gray-400 text-sm">Lokasyon</p>
                <p className="text-white">{step1Data.pickupLocation} → {step1Data.dropoffLocation}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <p className="text-gray-400 text-sm">Yolcu Sayısı</p>
                <p className="text-white">{step1Data.adults + step1Data.children} Kişi</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-gray-400 text-sm">Transfer Tipi</p>
                <p className="text-white">{tripType === 'one-way' ? 'Tek Yön' : 'Gidiş-Dönüş'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-gray-400 text-sm">Transfer Ücreti</p>
                <p className="text-white">{pathname.startsWith('/de/') ? '€' : '$'}{initialPrice}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Araç Seçimi */}
      {vehicles.map((vehicle, index) => {
        const currentImageIndex = getCurrentImageIndex(vehicle.id)
        const vehicleExtras = selectedExtras.filter(id => vehicle.extras.some(e => e.id === id))
        const selectedExtrasDetails = vehicleExtras.map(id => {
          const service = extraServices.find(s => s.id === id)
          return {
            name: service?.name || '',
            price: service?.price || 0
          }
        })

        const extrasTotal = selectedExtrasDetails.reduce((sum, extra) => sum + extra.price, 0)
        const vehicleTotal = calculateTotalPrice(vehicle, selectedExtrasDetails, vehicle.id)
        const isSelected = selectedVehicle === vehicle.id

        return (
          <div
            key={vehicle.id}
            className={`relative bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border transition-all duration-300 ${
              selectedVehicle === vehicle.id 
                ? 'border-blue-500' 
                : index === 1 || index === 2
                ? 'border-blue-500/50 hover:border-blue-500'
                : 'border-gray-800 hover:border-red-500'
            } ${index === 1 ? 'shadow-blue-500/20' : ''}`}
          >
            {index === 1 && (
              <div className="absolute -top-3 -left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                {texts.mostPreferred}
              </div>
            )}
            <div className="grid grid-cols-12 gap-2 lg:gap-4">
              {/* Vehicle Image */}
              <div className="col-span-12 md:col-span-3 relative h-[200px] md:h-[250px]">
                <div className="absolute inset-0 flex items-center justify-between z-10 px-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage(vehicle.id, vehicle.images.length)
                    }} 
                    className="w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors text-lg"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage(vehicle.id, vehicle.images.length)
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
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndices(prev => ({ ...prev, [vehicle.id]: idx }))
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="col-span-12 md:col-span-6 space-y-3 mt-4 md:mt-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-bold ${
                      vehicle.isPopular 
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent' 
                        : 'text-white'
                    }`}>
                      {vehicle.name}
                      {vehicle.isPopular && <span className="ml-2 text-yellow-400">⭐</span>}
                    </h3>
                    <p className="text-gray-400 mt-1 text-sm">{vehicle.description}</p>
                    {vehicle.id > 1 && (
                      <div className="absolute top-4 right-4 text-right">
                        <div className="flex items-center gap-2">
                          <p className="text-gray-400 text-sm">Araç Fiyatı:</p>
                          <p className="text-2xl font-bold text-amber-200">
                            +{vehicle.price} {pathname.startsWith('/de/') ? '€' : '$'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-1.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTripTypeChange(vehicle.id, tripType === 'round-trip' ? 'one-way' : 'round-trip')
                        }}
                        className={`relative px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 w-full ${
                          tripType === 'round-trip'
                            ? 'bg-red-500 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {tripType === 'round-trip' && (
                          <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                        )}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        {texts.roundTrip}
                      </button>
                    </div>
                    <div className="text-xs text-green-400 text-center mt-1 font-medium">
                      {texts.discountNote}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 p-2 rounded-lg bg-gray-900/50">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">{texts.passenger}:</span>
                    <span className="font-medium text-white">{vehicle.passengerCapacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">{texts.luggage}:</span>
                    <span className="font-medium text-white">{vehicle.luggageCapacity}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      {vehicle.isPopular ? (
                        <span className="text-gray-200">{feature}</span>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {vehicle.extraFeatures.length > 0 && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                    {vehicle.extraFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        {vehicle.isPopular ? (
                          <span className="text-gray-200">{feature}</span>
                        ) : (
                          <>
                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300">{feature}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Extra Services */}
              <div className="col-span-12 md:col-span-3 text-white mt-4 md:mt-8">
                <div className={`rounded-lg p-2.5 ${
                  vehicle.isPopular 
                    ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/20' 
                    : 'bg-gray-900/50'
                }`}>
                  <h4 className="text-[11px] font-medium mb-2 text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {texts.extraServices}
                  </h4>
                  <div className="space-y-1 mt-2">
                    {extraServices.map((extra) => (
                      <div key={extra.id} 
                        className="flex items-center justify-between p-1.5 rounded-md bg-black/30 hover:bg-black/40 transition-colors group">
                        <label className="flex items-center gap-1.5 cursor-pointer w-full">
                          <input
                            type="checkbox"
                            checked={selectedExtras.includes(extra.id)}
                            onChange={(e) => {
                              e.stopPropagation()
                              handleExtraServiceToggle(vehicle.id, extra.id)
                            }}
                            className="w-3 h-3 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                          />
                          <div className="flex justify-between w-full">
                            <span className="text-[11px] text-gray-300 group-hover:text-white transition-colors">
                              {extra.name}
                            </span>
                            <span className="text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors">
                              +{extra.price}{pathname.startsWith('/de/') ? '€' : '$'}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {selectedExtras.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-700">
                      <div className="text-[11px] text-gray-400 mb-1">
                        {texts.selectedServices}:
                      </div>
                      <div className="space-y-1">
                        {selectedExtras.map((extraId) => {
                          const extra = extraServices.find(e => e.id === extraId)
                          return extra ? (
                            <div key={extra.id} className="flex justify-between text-[11px]">
                              <span className="text-gray-300">{extra.name}</span>
                              <span className="text-gray-300">+{extra.price}{pathname.startsWith('/de/') ? '€' : '$'}</span>
                            </div>
                          ) : null
                        })}
                        <div className="flex justify-between text-[11px] font-medium pt-1 border-t border-gray-700">
                          <span className="text-gray-300">
                            {texts.extrasTotal}:
                          </span>
                          <span className="text-gray-300">
                            +{selectedExtras.reduce((sum, id) => {
                              const extra = extraServices.find(e => e.id === id)
                              return sum + (extra?.price || 0)
                            }, 0)}{pathname.startsWith('/de/') ? '€' : '$'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs text-gray-300">
                      {texts.totalAmount}:
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${
                        vehicle.isPopular 
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent' 
                          : 'text-red-400'
                      }`}>
                        {calculateTotalPrice(vehicle, selectedExtras.map(extraId => {
                          const extra = extraServices.find(e => e.id === extraId)
                          return { name: extra?.name || '', price: extra?.price || 0 }
                        }), vehicle.id)}
                      </span>
                      <span className="text-sm text-gray-400">{pathname.startsWith('/de/') ? '€' : '$'}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVehicleSelect(vehicle.id)
                    }}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                      vehicle.isPopular
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    {selectedVehicle === vehicle.id ? texts.selected : texts.select}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
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
  )
}

export default VehicleSelect 