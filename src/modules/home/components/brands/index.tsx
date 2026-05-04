import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export const BRANDS_DATA = [
  { name: "Aesthein", src: "/images/brands/aesthein.png", handle: "aesthein" },
  { name: "antala", src: "/images/brands/antala.png", handle: "antala" },
  { name: "rebloom", src: "/images/brands/rebloom.png", handle: "rebloom" },
  {
    name: "by the quality",
    src: "/images/brands/quality.png",
    handle: "by-the-quality",
  },
]

// ... ваш импорт
const Brands = () => {
  return (
    <section className="w-full bg-[#FFFDF8] font-sans py-20">
      <div className="content-container px-4 md:px-10">
        <div className="flex justify-between items-center mb-10">
          <Text className="text-[12px] md:text-lg uppercase tracking-[0.2em] font-semibold text-[#1a1a1a]">
            бренды
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
          {BRANDS_DATA.map((brand, idx) => (
            <LocalizedClientLink
              key={idx}
              href={`/brands/${brand.handle}`} // Обновленная ссылка
              className="group relative aspect-[3/4] w-full overflow-hidden"
            >
              {/* Остальной код карточки остается без изменений */}
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6">
                <div className="bg-[#D9D9D9] bg-opacity-90 px-4 py-2">
                  <span className="text-[12px] uppercase tracking-[0.2em] text-black font-medium">
                    {brand.name}
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Brands
