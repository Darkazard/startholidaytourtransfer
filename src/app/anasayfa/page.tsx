'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import ReservationForm from '@/components/Reservation/ReservationForm'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import LanguageSelector from '@/components/LanguageSelector'
import { usePathname } from 'next/navigation'
import { translations } from '@/translations'

// Video Popup Component
const VideoPopup = ({ isOpen, onClose, videoId }: { isOpen: boolean; onClose: () => void; videoId: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-red-500 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType>();
  const pathname = usePathname();
  const currentLang = pathname?.startsWith('/en/') ? 'en' : pathname?.startsWith('/de/') ? 'de' : pathname?.startsWith('/ru/') ? 'ru' : 'tr';

  // Menü açıldığında sayfa scrollunu engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isMenuOpen]);

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

  // Görünecek pagination numaralarını hesapla
  const getVisibleNumbers = () => {
    const totalSlides = slides.length;
    const current = activeSlide;
    
    // İlk görüntülemede 1-2-3 göster
    if (current === 0) return [0, 1, 2];
    if (current === totalSlides - 1) return [totalSlides - 2, totalSlides - 1, 0];
    return [current - 1, current, current + 1];
  }

  const links = [
    { href: '/anasayfa', text: 'Anasayfa' },
    { href: '/rezervasyon', text: 'Rezervasyon' },
    { href: '/araclar', text: 'Araçlar' },
    { href: '/transferler', text: 'Transferler' },
    { href: '/galeri', text: 'Galeri' },
    { href: '/hakkimizda', text: 'Hakkımızda' },
    { href: '/yorumlar', text: 'Yorumlar' },
    { href: '/iletisim', text: 'İletişim' }
  ]

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
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Hakkımızda</h2>
              <div className="prose prose-lg prose-invert mx-auto">
                <div className="text-white space-y-6">
                  <p>
                    2013 yılından bu yana, Start Holiday VIP Transfer olarak Antalya'da lüks ve konforlu ulaşım hizmetleri sunuyoruz. Her geçen yıl, değerli misafirlerimizden aldığımız geri bildirimler ve profesyonel ekibimizin özverili çalışmaları sayesinde hizmet kalitemizi daha da kusursuz hale getiriyoruz.
                  </p>
                  
                  <p>
                    Misafirlerimize sadece bir transfer hizmeti sunmuyor, aynı zamanda unutulmaz bir seyahat deneyimi yaşatmayı hedefliyoruz. VIP minibüslerimizle sunduğumuz özel hizmetler arasında:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Havalimanı - Otel Transferleri: Konforlu ve güvenli bir şekilde gideceğiniz noktaya ulaştırıyoruz.</li>
                    <li>Alışveriş Turları: Antalya'nın en prestijli alışveriş merkezlerine Mall of Antalya, Terracity, Mark Antalya vb... özel VIP ulaşım sağlıyoruz.</li>
                    <li>Antalya city, Kemer, Side, Manavgat, Alanya, Dimçayı, Kaş, Fethiye, Ölüdeniz, Saklıkent Fethiye: Antalya ve çevresinin doğal ve tarihi güzelliklerini keşfetmek isteyen misafirlerimize özel rotalar sunuyoruz.</li>
                    <li>St. Nicholas Kilisesi Ziyareti: Demre'de bulunan, Noel Baba olduğuna inanılan Aziz Nikolaos'ın ölümü ile yapılan kilise. Noel Baba'nın ölümünden sonra bir süre burada yattığı daha sonra kemiklerinin İtalyan denizcilerce Bari'ye götürüldüğüne inanılır.</li>
                  </ul>

                  <p>
                    <strong className="text-white">Özel VIP Geziler:</strong> Kendi programınızı oluşturabilir, profesyonel sürücülerimiz eşliğinde size özel bir deneyim yaşayabilirsiniz.
                  </p>

                  <p className="text-xl font-semibold text-white text-center mt-8">
                    Lüks, konfor ve güveni bir arada sunan hizmetlerimizle, Antalya'da unutulmaz bir yolculuk için buradayız!
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
              "Antalya Havalimanı",
              "Antalya",
              "Transfer",
              "Alanya",
              "Belek",
              "Side",
              "Kemer",
              "Antalya havalimanı",
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
              "Antalya Havalimanı Transfer",
              "Antalya Mercedes Servis",
              "Antalya Havalimanı Side Transfer",
              "Antalya Havalimanı Alanya Transfer",
              "Antalya Otel Servisleri",
              "Land of Legends Transfer",
              "Antalya Şehir Turu",
              "Antalya Turu",
              "Antalya'da Gezilecek Yerler",
              "Antalya Fethiye Turu",
              "Antalya Havalimanı Otel Transfer"
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