'use client'

export default function Transfers() {
  const transferServices = [
    {
      title: "🛍🚕 ШОПИНГ-ТРАНСФЕР ПО МАГАЗИНАМ АНТАЛИИ",
      description: `🛒 Воспользуйтесь нашим автомобилем с водителем, чтобы совершить комфортную поездку по магазинам и торговым центрам в Анталии.
  
🏪 Вот в какие места для любителей шопинга мы можем Вас доставить:
 
1. MarkAntalya (МаркАнталья)
2. Erasta (Эраста)
3. Mall of Antalya (Молл Оф Анталья)
4. ÖzdilekPark (ОздилекПарк)
5. Agora (Агора)
6. TerraCity (ТерраСити)
7. 5М Migros (Мигрос)
8. Deepo Outlet ( Дипо Аутлет ) дипоаутлет 
 
или другие маfгазины в Анталии по Вашему желанию🤗.
 
 
📩 Чтобы узнать подробнее и забронировать поездку, пишите в Whatsap !`,
      icon: "shopping-cart"
    },
    {
      title: "ШОПИНГ-ТРАНСФЕР ПО земля легенд",
      description: `нет ограничения по времени. Мы заберем вас из отеля в назначенное время и отвезем в торговый центр. Мы заберем вас из торгового центра в назначенное время и доставим в отель.

Режим работы: ежедневно с 10.00 - 22.00
‼
Наш сервис аренды авто с водителем быстро и комфортно доставит вас в любой ТЦ Анталии. Кстати, время на шопинг определяете вы сами!🤝
📲 ‪+90 552 898 88 99‬`,
      icon: "map-marked-alt"
    },
    {
      title: "ШОПИНГ-ТРАНСФЕР ПО КАЛЕИЧИ",
      description: `СЕКРЕТНЫЕ МЕСТА КАЛЕИЧИ
Друзья, не знаете куда пойти в Анталии?? Делюсь, с Вами 3мя интереснейшими местами в Старом Городе. Сохраняйте для будущего, пригодится!!
__________
👍🇹🇷☀
1. Скрытый парк
2. Панорамный лифт
3. Пляж Мермерли

Дорогие туристы! Напоминаем, что у нас Вы можете забронировать индивидуальный трансфер, а так же, съездить в индивидуальный тур по собственно-составленному маршруту!`,
      icon: "landmark"
    },
    {
      title: "Обзорная экскурсия по Анталии",
      description: `УНИКАЛЬНОЕ ПРЕДЛОЖЕНИЕ❗❗❗

Только у нас, впервые в Анталии, экскурсионные индивидуальные туры продолжительностью до 8 часов. К вашим услугам предоставляется личный автомобиль премиум-класса (до 8 посадочных мест).

➡Анталия,
🔹Водопады Дуден (Кепез)
🔹Старый город Калеичи
🔹Археологический музей
🔹Аквариум
🔹Парк Ататюрка
🔹Улица зонтиков

Напишите нам! ⤵
Whatsapp & viber & Telegram
‪+90 552 898 88 99‬`,
      icon: "car"
    },
    {
      title: "VIP Трансфер",
      description: `Индивидуальные поездки в:

➡ Памуккале
➡ Фетхие
➡ Каппадокия

Комфортабельные автомобили премиум-класса
Профессиональные водители
Индивидуальный подход к каждому клиенту`,
      icon: "star"
    }
  ]

  const handleWhatsAppClick = (title: string) => {
    const phoneNumber = "905528988899";
    const message = encodeURIComponent(title);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наши{" "}
            <span className="text-red-600">
              Трансферы
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Мы предлагаем вам безопасное и комфортное путешествие с нашими специальными трансферными решениями.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          {transferServices.map((service, index) => (
            <div key={index} className="bg-black p-8 rounded-xl shadow-lg hover-card">
              <div className="text-red-500 text-4xl mb-4">
                <i className={`fas fa-${service.icon}`}></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white whitespace-pre-line">{service.title}</h3>
              <p className="text-gray-400 mb-4 whitespace-pre-line">{service.description}</p>
              <button 
                onClick={() => handleWhatsAppClick(service.title)}
                className="btn btn-primary w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                Написать в WhatsApp
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-black p-8 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Специальный Запрос Трансфера
          </h2>
          <p className="text-center text-gray-400 mb-8">
            У вас есть специальный запрос на трансфер, которого нет в наших услугах?
            Свяжитесь с нами, и мы предоставим вам индивидуальное решение.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => handleWhatsAppClick("Специальный запрос трансфера")}
              className="btn btn-outline bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              Написать в WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Footer Tag Cloud */}
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
    </div>
  )
} 