import { Metadata } from "next"

import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import About from "@modules/home/components/about"
import Atelier from "@modules/home/components/atelier"
import Brands from "@modules/home/components/brands"
import CategoryGrid from "@modules/home/components/category-grid"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Service from "@modules/home/components/service"
import Visit from "@modules/home/components/visit"

// 1. Для локализации заголовка вкладки лучше использовать generateMetadata
export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = await params

  const isRu = locale === "ru-RU"

  return {
    title: isRu
      ? "Sarvi | Эксклюзивная косметика"
      : "Sarvi | Ekskluziv kosmetika",
    description: isRu
      ? "Ваш эксклюзивный гид в мире премиальной косметики в Узбекистане."
      : "O'zbekistondagi premium kosmetika dunyosidagi ekskluziv yo'lboshchingiz.",
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string; locale: string }>
}) {
  const params = await props.params

  const { countryCode, locale } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero locale={locale} />

      <CategoryGrid locale={locale} />
      <div className="py-2">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <Brands locale={locale} />

      <About locale={locale} />
      <Atelier locale={locale} />
      <Visit locale={locale} />
      <Service locale={locale} />
    </>
  )
}
