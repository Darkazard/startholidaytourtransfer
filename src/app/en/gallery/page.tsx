'use client'

export default function Gallery() {
  const galleryImages = Array.from({ length: 66 }, (_, index) => ({
    src: `/images/gallery/image${index + 1}.jpg`,
    alt: `Gallery Photo ${index + 1}`
  }))

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{" "}
            <span className="text-red-600">
              Gallery
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fadeIn">
          {galleryImages.map((image, index) => (
            <div key={index} className="bg-black rounded-xl shadow-lg overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>

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
              "Nirvana Cosmopolitan",
              "Royal Tac Mahal",
              "Kirman Leodaikya",
              "Kirman Side Marin",
              "NG Phasalis",
              "Limak Limra",
              "Daima Biz",
              "Max Royal Kemer",
              "Utopia Beach Club",
              "Utopia Resort and Residence",
              "Antalya Transfer",
              "Antalya Airport",
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
              "Antalya",
              "Alanya Turkey",
              "Bosphorus Sorgun Hotel",
              "Antalya Turkey",
              "Transport Antalya airport - Kemer",
              "Transport Antalya airport - Side",
              "Belek",
              "Kemer",
              "Alanya",
              "Konyaalti",
              "Private transfer in Antalya",
              "Private transport in Antalya",
              "Mercedes service in Antalya",
              "Transport Antalya airport - Side",
              "Transport Antalya airport - Alanya",
              "Private transfer Antalya - Side",
              "Belek",
              "Kemer",
              "Alanya",
              "Konyaalti",
              "Service in Antalya hotels",
              "Transport in Rixos Land of legends",
              "Service in Rixos Land of legends",
              "Antalya city tour",
              "Antalya attractions",
              "What to do in Antalya",
              "What to see in Antalya",
              "Antalya Kemer tour",
              "Antalya airport hotel transfer",
              "SHOPPING TRANSFER TO ANTALYA SHOPS",
              "MarkAntalya",
              "Erasta",
              "Mall of Antalya",
              "TerraCity",
              "Deepo Outlet",
              "Migros"
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