import { Metadata } from "next"

import { listCollections } from "@lib/data/collections"
import { getLocale } from "@lib/data/locale-actions"
import { getRegion } from "@lib/data/regions"
import { getDictionary } from "@lib/dictionaries"
import About from "@modules/home/components/about"
import Atelier from "@modules/home/components/atelier"
import Brands from "@modules/home/components/brands"
import CategoryGrid from "@modules/home/components/category-grid"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Service from "@modules/home/components/service"
import Visit from "@modules/home/components/visit"

export const metadata: Metadata = {
  title: "Sarvi | Эксклюзивная парфюмерия",
  description: "Ваш эксклюзивный гид в мире парфюмерии и стиля в Узбекистане.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const locale = await getLocale()
  const dict = await getDictionary(locale || "ru-RU")

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero dict={dict.hero} />

      <CategoryGrid dict={dict.categories} />

      <div className="py-2">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts
            collections={collections}
            region={region}
            dict={dict.product}
          />
        </ul>
      </div>

      <Brands dict={dict.nav} />

      <About dict={dict.about} />
      <Atelier dict={dict.atelier} />
      <Visit dict={dict.visit} />
      <Service dict={dict.service} />
    </>
  )
}
