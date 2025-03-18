import VehicleList from '@/components/Vehicle/VehicleList'

export default function ArabalarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Araçlarımız ve Fiyatlar</h1>
        <div className="mb-8">
          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            Antalya'nın her noktasına güvenli ve konforlu transfer hizmeti sunuyoruz. 
            Modern araç filomuz ve profesyonel sürücülerimizle hizmetinizdeyiz.
          </p>
        </div>
        <VehicleList showPrices={true} />
      </div>
    </div>
  )
} 