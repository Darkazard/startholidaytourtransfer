import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Holiday Transfer - Antalya Transfer Hizmetleri",
  description: "Antalya'nın en güvenilir ve konforlu transfer hizmetleri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-gray-900">
          <nav className="bg-black shadow-md">
            <div className="container mx-auto max-w-6xl px-4 py-4">
              <div className="flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-white">
                  <span className="text-red-600">Holiday</span> Transfer
                </a>
                <div className="flex gap-6">
                  <a href="/anasayfa" className="nav-link">Anasayfa</a>
                  <a href="/rezervasyon" className="nav-link">Rezervasyon</a>
                  <a href="/arabalar" className="nav-link">Araçlar</a>
                  <a href="/transferler" className="nav-link">Transferler</a>
                  <a href="/galeri" className="nav-link">Galeri</a>
                  <a href="/hakkimizda" className="nav-link">Hakkımızda</a>
                  <a href="/yorumlar" className="nav-link">Yorumlar</a>
                  <a href="/iletisim" className="nav-link">İletişim</a>
                </div>
              </div>
            </div>
          </nav>

          <main className="flex-grow">{children}</main>

          <footer className="bg-black text-white py-12">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Holiday Transfer</h3>
                  <p className="text-gray-400">
                    Antalya'nın en güvenilir ve konforlu transfer hizmetleri ile
                    hizmetinizdeyiz.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Hızlı Linkler</h3>
                  <ul className="space-y-2">
                    <li><a href="/anasayfa" className="text-gray-400 hover:text-red-500">Anasayfa</a></li>
                    <li><a href="/rezervasyon" className="text-gray-400 hover:text-red-500">Rezervasyon</a></li>
                    <li><a href="/arabalar" className="text-gray-400 hover:text-red-500">Araçlar</a></li>
                    <li><a href="/transferler" className="text-gray-400 hover:text-red-500">Transferler</a></li>
                    <li><a href="/galeri" className="text-gray-400 hover:text-red-500">Galeri</a></li>
                    <li><a href="/hakkimizda" className="text-gray-400 hover:text-red-500">Hakkımızda</a></li>
                    <li><a href="/yorumlar" className="text-gray-400 hover:text-red-500">Yorumlar</a></li>
                    <li><a href="/iletisim" className="text-gray-400 hover:text-red-500">İletişim</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">İletişim</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-phone"></i>
                      <span>+90 534 518 7167</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-envelope"></i>
                      <span>info@holidaytransfer.com</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>Fener Mah. Tekelioğlu Cad. No:1 Muratpaşa/Antalya</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Sosyal Medya</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-gray-400 hover:text-red-500 text-2xl">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-red-500 text-2xl">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-red-500 text-2xl">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>© 2024 Holiday Transfer. Tüm hakları saklıdır.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
