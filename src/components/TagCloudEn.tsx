'use client'

export default function TagCloudEn() {
  return (
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
            "Konakli",
            "Antalya airport",
            "Antalya taxi",
            "Antalya Vito",
            "Bellis deluxe hotel",
            "Calista LUXURY hotel",
            "Dobedan World Palace",
            "Rai Premium Tekirova",
            "Güral Tekirova",
            "Cullinan Belek",
            "Lonicera Resort",
            "Dobedan hotel",
            "Voyage Belek",
            "Adalya Elit",
            "Bosphorus Sorgun hotel",
            "Lusso Sorgun hotel",
            "Titanic hotel",
            "Kaya Palazzo",
            "Justiniano Alanya",
            "Granada Beach",
            "My Home hotel",
            "Quattro Beach hotel",
            "Mall of Antalya",
            "Terracity",
            "Land of Legends",
            "Rixos Sungate",
            "Rixos Tekirova",
            "Beldibi",
            "Gloria Serenity Hotel",
            "Gloria Golf Resort",
            "Long Beach hotel",
            "Myhome hotel",
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
            "Nirvana Cosmopolitan",
            "Royal Taj Mahal",
            "Kirman Leodikya",
            "Kirman Side Marin",
            "NG Phasalis",
            "Limak Limra",
            "Daima Biz",
            "Max Royal Kemer",
            "Utopia Beach Club",
            "Utopia Resort and Residence",
            "Akka Antedon",
            "Antalya transfer",
            "Antalya airport",
            "Transfer Kemer",
            "Voyage Belek",
            "Selectum Family Side",
            "Lonicera Resort and Spa",
            "Litora Resort Hotel",
            "Travel Blogger",
            "Rixos Premium Tekirova",
            "Liu Resorts",
            "Transfer Belek",
            "The Land of Legends Theme Park",
            "Antalya Turkey",
            "Alanya Turkey",
            "Bosphorus Sorgun Hotel",
            "Transport Antalya airport - Kemer",
            "Transport Antalya airport - Side",
            "Transport Antalya airport - Alanya",
            "Private transfer in Antalya",
            "Private transport in Antalya",
            "Mercedes service in Antalya",
            "Service in Antalya hotels",
            "Transport in Rixos Land of Legends",
            "Service in Rixos Land of Legends",
            "Antalya city tour",
            "Antalya attractions",
            "What to do in Antalya",
            "What to see in Antalya",
            "Antalya Kemer tour",
            "Antalya airport hotel transfer",
            "Shopping transfer to Antalya shops",
            "MarkAntalya",
            "Erasta",
            "Deepo Outlet",
            "Migros"
          ].map((tag, index) => (
            <button
              key={index}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-yellow-400 transition-colors"
            >
              {tag} {index < 99 ? "•" : ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 