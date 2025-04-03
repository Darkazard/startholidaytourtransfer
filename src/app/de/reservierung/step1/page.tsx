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
                    "Antalya",
                    "Transfer",
                    "Alanya",
                    "Belek",
                    "Side",
                    "Kemer",
                    "Konaklı",
                    "Antalya Flughafen",
                    "Antalya Taxi",
                    "Antalya Vito",
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
                    "Antalya Flughafen Kemer Transfer",
                    "Antalya Mercedes Service",
                    "Antalya Flughafen Side Transfer",
                    "Antalya Flughafen Alanya Transfer",
                    "Antalya Hotel Services",
                    "Land of Legends Transfer",
                    "Antalya Stadtrundfahrt",
                    "Antalya Reise",
                    "Schöne Orte in Antalya",
                    "Antalya Fethiye Reise",
                    "Antalya Flughafen Hotel Transfer"
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