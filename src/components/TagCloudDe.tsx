'use client'

export default function TagCloudDe() {
  return (
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
            "Konakli",
            "Antalya Havalimani",
            "Taxi Antalya",
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
            "Dobedan World Palace",
            "Rai Premium Tekirova",
            "Güral Tekirova",
            "Bosphorus Sorgun Hotel",
            "Lusso Sorgun Hotel",
            "Gloria Serenity Hotel",
            "Gloria Golf Resort",
            "Long Beach Hotel",
            "Myhome Hotel",
            "Justiniano Club Conti",
            "Selectum Family Resort Side",
            "Aska Lara",
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
            "Royal Taj Mahal",
            "Kirman Leodikya",
            "Kirman Side Marin",
            "NG Phasalis",
            "Limak Limra",
            "Daima Biz",
            "Max Royal Kemer",
            "Utopia Beach Club",
            "Transport am Flughafen Antalya Kemer",
            "Mercedes Service Antalya",
            "Transport vom Flughafen Antalya nach Side",
            "Transport vom Flughafen Antalya nach Alanya",
            "Hotelservices in Antalya",
            "Transport ins Land der Legenden",
            "Stadtrundfahrt durch Antalya",
            "Reise nach Antalya",
            "Schöne Sehenswürdigkeiten in Antalya",
            "Reise nach Antalya Fethiye",
            "Transfer vom Flughafen Antalya zum Hotel"
          ].map((tag, index) => (
            <button
              key={index}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-yellow-400 transition-colors"
            >
              {tag} {index < 69 ? "•" : ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 