'use client'

export default function Gallery() {
  const galleryImages = Array.from({ length: 66 }, (_, index) => ({
    src: `/images/gallery/image${index + 1}.jpg`,
    alt: `Galeri Fotoğraf ${index + 1}`
  }))

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bizim{" "}
            <span className="text-red-600">
              Galerimiz
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
                "Antalya Havalimanı",
                "Antalya Taksi",
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
                "Antalya Havalimanı Kemer Ulaşım",
                "Antalya Mercedes Servis",
                "Antalya Havalimanı Side Ulaşım",
                "Antalya Havalimanı Alanya Ulaşım",
                "Antalya Otel Servisleri",
                "Land of Legends Ulaşımı",
                "Antalya Şehir Turu",
                "Antalya Gezisi",
                "Antalya'da Görülmesi Gereken Güzel Yerler",
                "Antalya Fethiye Gezisi",
                "Antalya Havalimanı Otel Transferi"
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
  )
} 