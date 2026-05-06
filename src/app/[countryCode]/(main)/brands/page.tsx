import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Бренды | Sarvi",
  description: "Список всех брендов премиальной косметики на Sarvi.",
}

export default function BrandsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-6 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
        Наши Бренды
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Мы собрали для вас лучшие марки премиальной K-Beauty косметики. Раздел
        находится в разработке и скоро здесь появится полный каталог.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl opacity-40">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex items-center justify-center text-sm text-gray-400"
          >
            Brand Logo
          </div>
        ))}
      </div>
    </div>
  )
}
