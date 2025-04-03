'use client'

import TagCloudRu from '@/components/TagCloudRu'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">О Нас</span>
          </h1>
          <p className="text-xl text-gray-300">
            Более 10 лет опыта в надежных и комфортных трансферах
          </p>
        </div>

        <div className="grid gap-12 animate-fadeIn">
          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Кто мы?</h2>
            <p className="text-gray-400 leading-relaxed">
              Как Holiday Transfer, мы работаем в туристическом секторе Анталии более 10 лет.
              Мы предоставляем безопасные и комфортные трансферы, поддерживая высочайший уровень удовлетворенности клиентов.
            </p>
          </div>

          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Наша миссия</h2>
            <p className="text-gray-400 leading-relaxed">
              Наша миссия - предоставить нашим клиентам трансфер высочайшего качества и надежности,
              делая их путешествия незабываемыми.
            </p>
          </div>

          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Почему выбирают нас?</h2>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Профессиональная и опытная команда водителей</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Современный и комфортный автопарк</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Круглосуточная поддержка клиентов</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Конкурентоспособные и прозрачные цены</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TagCloudRu />
    </div>
  )
} 