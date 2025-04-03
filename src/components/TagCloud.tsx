'use client'

export default function TagCloud() {
  return (
    <div className="w-full bg-black/40 backdrop-blur-sm py-4 px-2 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-x-1 gap-y-0.5 justify-center items-center text-[8px] opacity-30 hover:opacity-60 transition-opacity">
          {[
            "Анталия",
            "трансфер",
            "Алания",
            "Белек",
            "Сиде",
            "Кемер",
            "Конаклы",
            "аэропорт Анталии",
            "такси Анталии",
            "Анталия Вито",
            "Bellis deluxe hotel",
            "calista LUXURY hotel",
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
            "трансфераланья",
            "utopiaresortandresidence akkaantedon",
            "анталиятрансфер",
            "antalyaairport",
            "трансферкемер",
            "voyagebelek selectumfamilyside",
            "loniceraresortandspa litoreresorthotel",
            "travelblogger rixospremiumtekirova",
            "liuresorts трансфербелек",
            "thelandoflegendsthemepark анталия",
            "аланьятурция",
            "bosphorussorgunhotel",
            "анталия турция",
            "Транспорт Анталия аэропорт- Кемер",
            "Транспорт Анталия аэропорт- Сиде",
            "Белек",
            "Кемер",
            "Аланья",
            "коньяалты",
            "Индивидуальный трансфер по Анталии",
            "Индивидуальный транспорт в Анталии",
            "Mercedes сервис по Анталии",
            "Транспорт Анталия аэропорт- Сиде",
            "Транспорт Анталия аэропорт- Аланья",
            "Индивидуальный трансфер Анталия- Сиде",
            "Сервис по отелям Анталии",
            "Транспорт в Rixos Land of legends",
            "Сервис в Rixos Land of legends",
            "Анталия тур по городу",
            "Анталия достопримечательности",
            "что можно поделать в Анталии",
            "что посмотреть в Анталии",
            "Анталия Кемер тур",
            "Анталия аэропорт отель трансфер",
            "ШОПИНГ-ТРАНСФЕР ПО МАГАЗИНАМ АНТАЛИИ",
            "МаркАнталья",
            "Эраста",
            "Молл Оф Анталья",
            "ТерраСити",
            "Дипо Аутлет",
            "Мигрос"
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
  )
} 