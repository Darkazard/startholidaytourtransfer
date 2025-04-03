'use client'

import ReservationForm from '@/components/Reservation/ReservationForm'

export default function Step1() {
  return (
    <div className="min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-black/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <ReservationForm showExtras={false} />

            {/* Footer Tag Cloud */}
            <div className="w-full bg-black/40 backdrop-blur-sm py-4 px-2 mt-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-x-1 gap-y-0.5 justify-center items-center text-[8px] opacity-30 hover:opacity-60 transition-opacity">
                  {[
                    "Анталья",
                    "Трансфер",
                    "Аланья",
                    "Белек",
                    "Сиде",
                    "Кемер",
                    "Конаклы",
                    "Аэропорт Анталии",
                    "Такси Анталия",
                    "Анталия Вито",
                    "Bellis Deluxe",
                    "Cullinan Belek",
                    "Lonicera Resort",
                    "Dobradan Hotel",
                    "Voyage Belek",
                    "Adalya Elit",
                    "Titanic Hotel",
                    "Kaya Palazzo",
                    "Justiniano Alanya",
                    "Granada Beach",
                    "My Home Hotel",
                    "Quattro Beach Hotel",
                    "Mall of Antalya",
                    "Terracity",
                    "Land of Legends",
                    "Rixos Sungate",
                    "Rixos Tekirova",
                    "Beldibi",
                    "Nirvana Cosmopolitan",
                    "Трансфер из аэропорта Анталии в Кемер",
                    "Мерседес сервис в Анталии",
                    "Трансфер из аэропорта Анталии в Сиде",
                    "Трансфер из аэропорта Анталии в Аланью",
                    "Сервис отелей в Анталии",
                    "Трансфер в Land of Legends",
                    "Экскурсия по Анталии",
                    "Поездка в Анталию",
                    "Красивые места в Анталии",
                    "Поездка в Анталию Фетхие",
                    "Трансфер из аэропорта Анталии в отель"
                  ].map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="hover:text-yellow-400 transition-colors"
                    >
                      {tag} {index < 38 ? "•" : ""}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 