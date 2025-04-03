'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import ReservationForm from '@/components/Reservation/ReservationForm'

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType>();

  const slides = [
    { image: '/images/slider/slide1.jpg' },
    { image: '/images/slider/slide2.jpg' },
    { image: '/images/slider/slide3.jpg' },
    { image: '/images/slider/slide4.jpg' },
    { image: '/images/slider/slide5.jpg' },
    { image: '/images/slider/slide6.jpg' },
    { image: '/images/slider/slide7.jpg' },
    { image: '/images/slider/slide8.jpg' },
    { image: '/images/slider/slide9.jpg' },
    { image: '/images/slider/slide10.jpg' },
    { image: '/images/slider/slide11.jpg' },
    { image: '/images/slider/slide12.jpg' },
    { image: '/images/slider/slide13.jpg' },
    { image: '/images/slider/slide14.jpg' },
    { image: '/images/slider/slide15.jpg' },
    { image: '/images/slider/slide16.jpg' }
  ]

  const getVisibleNumbers = () => {
    const totalSlides = slides.length;
    const current = activeSlide;
    
    if (current === 0) return [0, 1, 2];
    if (current === totalSlides - 1) return [totalSlides - 2, totalSlides - 1, 0];
    return [current - 1, current, current + 1];
  }

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Modern Slider Section */}
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="relative max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[55vh] lg:h-[85vh]">
              <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={false}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="w-full h-full rounded-2xl"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveSlide(swiper.realIndex);
                }}
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        style={{ objectFit: 'cover' }}
                        className="rounded-2xl lg:object-contain lg:bg-[#111]"
                        priority={index === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Custom Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {getVisibleNumbers().map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.slideToLoop(num);
                    }
                  }}
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-all duration-300 ${
                    activeSlide === num
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-black/50 text-gray-300 hover:bg-black/70 hover:text-white'
                  }`}
                >
                  {num + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Reservation Form */}
          <div className="mt-8">
            <ReservationForm showExtras={true} />
          </div>
        </div>
      </main>

      {/* About Us Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-black backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800 p-8 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">О нас</h2>
          <div className="prose prose-lg prose-invert mx-auto">
            <div className="text-white space-y-6">
              <p>
                С 2013 года Start Holiday VIP Transfer предоставляет услуги роскошных и комфортабельных перевозок в Анталии. Каждый год мы повышаем качество наших услуг благодаря ценным отзывам наших гостей и самоотверженной работе нашей профессиональной команды.
              </p>
              
              <p>
                Мы не просто предоставляем трансферные услуги нашим гостям, мы стремимся создать незабываемые впечатления от путешествия. Среди наших специальных услуг на VIP-минивэнах:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Трансферы аэропорт - отель: Мы доставляем вас к месту назначения с комфортом и безопасностью.</li>
                <li>Шоппинг-туры: Мы предоставляем специальный VIP-транспорт до самых престижных торговых центров Анталии, таких как Mall of Antalya, Terracity, Mark Antalya и другие.</li>
                <li>Анталия, Кемер, Сиде, Манавгат, Аланья, Димчайы, Каш, Фетхие, Олюдениз, Саклыкент Фетхие: Мы предлагаем специальные маршруты для наших гостей, желающих открыть для себя природные и исторические красоты Анталии и ее окрестностей.</li>
                <li>Посещение церкви Святого Николая: Церковь, построенная после смерти Святого Николая в Демре, известного как Санта-Клаус. Считается, что после его смерти Санта-Клаус некоторое время лежал здесь, а позже его останки были перевезены в Бари итальянскими моряками.</li>
              </ul>

              <p>
                <strong className="text-white">Специальные VIP-туры:</strong> Вы можете создать свою собственную программу и получить особый опыт в сопровождении наших профессиональных водителей.
              </p>

              <p className="text-xl font-semibold text-white text-center mt-8">
                Мы здесь, чтобы сделать ваше путешествие в Анталии незабываемым, предоставляя услуги, сочетающие роскошь, комфорт и безопасность!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tag Cloud */}
      <div className="w-full bg-black/40 backdrop-blur-sm py-4 px-2 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-x-1 gap-y-0.5 justify-center items-center text-[8px] opacity-30 hover:opacity-60 transition-opacity">
            {[
              "Анталия",
              "трансфер",
              "Алания",
              "Белек",
              "Сиде",
              "Кемер",
              "Конаклы",
              "аэропорт Анталии",
              "такси Анталии",
              "Анталия Вито",
              "Bellis deluxe hotel",
              "calista LUXURY hotel",
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
              "трансфераланья",
              "utopiaresortandresidence akkaantedon",
              "анталиятрансфер",
              "antalyaairport",
              "трансферкемер",
              "voyagebelek selectumfamilyside",
              "loniceraresortandspa litoreresorthotel",
              "travelblogger rixospremiumtekirova",
              "liuresorts трансфербелек",
              "thelandoflegendsthemepark анталия",
              "аланьятурция",
              "bosphorussorgunhotel",
              "анталия турция",
              "Транспорт Анталия аэропорт- Кемер",
              "Транспорт Анталия аэропорт- Сиде",
              "Белек",
              "Кемер",
              "Аланья",
              "коньяалты",
              "Индивидуальный трансфер по Анталии",
              "Индивидуальный транспорт в Анталии",
              "Mercedes сервис по Анталии",
              "Транспорт Анталия аэропорт- Сиде",
              "Транспорт Анталия аэропорт- Аланья",
              "Индивидуальный трансфер Анталия- Сиде",
              "Сервис по отелям Анталии",
              "Транспорт в Rixos Land of legends",
              "Сервис в Rixos Land of legends",
              "Анталия тур по городу",
              "Анталия достопримечательности",
              "что можно поделать в Анталии",
              "что посмотреть в Анталии",
              "Анталия Кемер тур",
              "Анталия аэропорт отель трансфер",
              "ШОПИНГ-ТРАНСФЕР ПО МАГАЗИНАМ АНТАЛИИ",
              "МаркАнталья",
              "Эраста",
              "Молл Оф Анталья",
              "ТерраСити",
              "Дипо Аутлет",
              "Мигрос"
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