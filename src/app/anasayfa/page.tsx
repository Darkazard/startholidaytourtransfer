'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import ReservationForm from '@/components/Reservation/ReservationForm'

export default function Anasayfa() {
  const slides = [
    {
      image: '/images/slider/slide1.jpg',
      title: 'VIP Transfer Hizmeti',
    },
    {
      image: '/images/slider/slide2.jpg',
      title: 'Havalimanı Transfer',
    },
    {
      image: '/images/slider/slide3.jpg',
      title: 'Özel Turlar',
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Modern Slider Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative h-[55vh] max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-full rounded-2xl"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                    className="rounded-2xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Reservation Form */}
        <div className="container mx-auto px-4">
          <ReservationForm showExtras={true} />
        </div>
      </div>

      {/* Transfer Info Section */}
      <div className="bg-black/80 backdrop-blur-sm py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center space-y-6">
            <p className="text-xl text-gray-300 leading-relaxed">
              Antalya'da güvenli ve konforlu ulaşımın adresi! Havalimanından otelinize, şehir içi transferlerden özel turlara kadar tüm ulaşım ihtiyaçlarınızda yanınızdayız. Modern araç filomuz ve profesyonel sürücülerimizle 7/24 hizmetinizdeyiz. Rezervasyonunuzu hemen yapın, transfer stresinizi unutun!
            </p>
          </div>
        </div>
      </div>

      {/* Phone Number Section */}
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-2">Bize Ulaşın</h3>
            <a href="tel:+905435355488" className="text-3xl md:text-4xl font-bold text-red-500 hover:text-red-600 transition-colors">
              +90 543 535 54 88
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-900 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">
            <div className="bg-black p-6 rounded-xl shadow-lg hover-card">
              <div className="text-red-500 text-3xl mb-4">
                <i className="fas fa-plane"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Havalimanı Transferi</h3>
              <p className="text-gray-400 mb-4">
                Antalya Havalimanı'ndan otelinize güvenli transfer.
              </p>
              <a href="/transferler" className="text-red-500 hover:text-red-600">
                Detaylı Bilgi →
              </a>
            </div>

            <div className="bg-black p-6 rounded-xl shadow-lg hover-card">
              <div className="text-red-500 text-3xl mb-4">
                <i className="fas fa-hotel"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Otel Transferi</h3>
              <p className="text-gray-400 mb-4">
                Oteller arası konforlu transfer hizmeti.
              </p>
              <a href="/transferler" className="text-red-500 hover:text-red-600">
                Detaylı Bilgi →
              </a>
            </div>

            <div className="bg-black p-6 rounded-xl shadow-lg hover-card">
              <div className="text-red-500 text-3xl mb-4">
                <i className="fas fa-car"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">VIP Transfer</h3>
              <p className="text-gray-400 mb-4">
                Lüks araçlarla özel transfer hizmeti.
              </p>
              <a href="/transferler" className="text-red-500 hover:text-red-600">
                Detaylı Bilgi →
              </a>
            </div>

            <div className="bg-black p-6 rounded-xl shadow-lg hover-card">
              <div className="text-red-500 text-3xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Grup Transferi</h3>
              <p className="text-gray-400 mb-4">
                Büyük gruplar için özel transfer çözümleri.
              </p>
              <a href="/transferler" className="text-red-500 hover:text-red-600">
                Detaylı Bilgi →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 