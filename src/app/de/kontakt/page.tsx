'use client'

import TagCloudDe from '@/components/TagCloudDe'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">Kontakt</span>
          </h1>
          <p className="text-xl text-white">
            Kontaktieren Sie uns, wir sind hier, um zu helfen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 animate-fadeIn">
          <div className="bg-black p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white">Kontaktformular</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-400 mb-2">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">Ihre Nachricht</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Senden
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-black p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-white">Kontaktinformationen</h2>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center gap-3">
                  <i className="fas fa-phone text-red-500"></i>
                  <span>+90 552 898 8899</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-envelope text-red-500"></i>
                  <span>info@startholidaytransfer.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-map-marker-alt text-red-500"></i>
                  <span>Peir Glory Apt. A blok 4/12 Florya sokak Altıntaş/Antalya</span>
                </div>
              </div>
            </div>

            <div className="bg-black p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-white">Soziale Medien</h2>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/share/1E1ibqFgR6/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/antalia_transfer/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/905528988899" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tag Cloud */}
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
              "Transport am Flughafen Antalya Kemer",
              "Mercedes Service Antalya",
              "Transport vom Flughafen Antalya nach Side",
              "Transport vom Flughafen Antalya nach Alanya",
              "Hotelservices in Antalya",
              "Transport ins Land der Legenden",
              "Stadtrundfahrt durch Antalya",
              "Reise nach Antalya",
              "schöne Sehenswürdigkeiten in Antalya",
              "Reise nach Antalya Fethiye",
              "Transfer vom Flughafen Antalya zum Hotel"
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
      <TagCloudDe />
    </div>
  )
} 