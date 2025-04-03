'use client'

import TagCloudDe from '@/components/TagCloudDe'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">Über Uns</span>
          </h1>
          <p className="text-xl text-gray-300">
            Über 10 Jahre Erfahrung in zuverlässigen und komfortablen Transferdiensten
          </p>
        </div>

        <div className="grid gap-12 animate-fadeIn">
          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Wer sind wir?</h2>
            <p className="text-gray-400 leading-relaxed">
              Als Holiday Transfer sind wir seit über 10 Jahren im Tourismussektor in Antalya tätig.
              Wir bieten sichere und komfortable Transferdienste bei höchster Kundenzufriedenheit.
            </p>
          </div>

          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Unsere Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Unsere Mission ist es, unseren Kunden den höchsten Qualitätsstandard und den zuverlässigsten Transferdienst zu bieten,
              um ihre Reiseerlebnisse unvergesslich zu machen.
            </p>
          </div>

          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Warum uns wählen?</h2>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Professionelles und erfahrenes Fahrerteam</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Moderne und komfortable Fahrzeugflotte</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>24/7 Kundensupport</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Wettbewerbsfähige und transparente Preise</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TagCloudDe />
    </div>
  )
} 