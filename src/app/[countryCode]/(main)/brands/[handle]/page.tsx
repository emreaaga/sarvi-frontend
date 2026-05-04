import { listProductTypes } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import Image from "next/image"

const BRAND_IMAGES: Record<string, string[]> = {
  aesthein: [
    "/images/brands/aesthein-1.png",
    "/images/brands/aesthein-2.png",
    "/images/brands/aesthein-3.png",
  ],
  antala: [
    "/images/brands/antala-1.png",
    "/images/brands/antala-2.png",
    "/images/brands/antala-3.png",
  ],
  rebloom: [
    "/images/brands/rebloom-1.png",
    "/images/brands/rebloom-2.png",
    "/images/brands/rebloom-3.png",
  ],
  "by-the-quality": [
    "/images/brands/quality-1.png",
    "/images/brands/quality-2.png",
    "/images/brands/quality-3.png",
  ],
}

export default async function BrandPage(props: {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ sortBy?: SortOptions; page?: string }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams

  const { countryCode, handle } = params
  const { sortBy, page } = searchParams

  // 1. Загружаем типы продуктов
  const types = await listProductTypes().catch(() => [])

  // 2. Ищем бренд по handle
  const currentBrand = types.find(
    (t) => t.value.toLowerCase().replace(/\s+/g, "-") === handle
  )

  const typeId = currentBrand?.id

  // Если такого бренда нет в базе вообще — страница пустая
  if (!typeId) {
    return null
  }

  // 3. Проверяем количество товаров
  const {
    response: { count },
  } = await listProducts({
    countryCode,
    queryParams: { type_id: [typeId], limit: 1 },
  })

  const images = BRAND_IMAGES[handle] || [
    "/images/placeholder.png",
    "/images/placeholder.png",
    "/images/placeholder.png",
  ]

  return (
    <main className="w-full bg-[#FFFDF8]">
      {/* Фотографии бренда выводятся всегда */}
      <section className="content-container pt-6 pb-2">
        <div className="grid grid-cols-3 gap-2">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[2/3] w-full bg-gray-100 overflow-hidden"
            >
              <Image
                src={src}
                alt={`${handle} image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        {count > 0 ? (
          <StoreTemplate
            sortBy={sortBy}
            page={page}
            countryCode={countryCode}
            typeId={typeId}
            disabledTypeSelect={true}
          />
        ) : (
          <div className="content-container flex flex-col items-center justify-center py-24">
            <span className="text-[12px] uppercase tracking-[0.3em] text-[#999] font-medium">
              нет товаров
            </span>
          </div>
        )}
      </section>
    </main>
  )
}
