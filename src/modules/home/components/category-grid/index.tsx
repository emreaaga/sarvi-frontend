import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

async function getDictionary(locale: string) {
  const code = locale || "ru-RU"
  try {
    const dict = await import(`../../../../lib/constants/${code}.json`)
    return dict.default
  } catch {
    const fallback = await import(`../../../../lib/constants/ru-RU.json`)
    return fallback.default
  }
}

const CategoryGrid = async ({ locale }: { locale: string }) => {
  const dict = await getDictionary(locale)

  const GridItem = ({
    label,
    src,
    href = "/",
    className = "",
    aspectClass = "aspect-square",
  }: {
    label: string
    src?: string
    href?: string
    className?: string
    aspectClass?: string
  }) => (
    <LocalizedClientLink
      href={href}
      className={`relative border-r border-b border-gray-200 group overflow-hidden bg-gray-50 flex flex-col ${aspectClass} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic uppercase text-[9px]">
          image placeholder
        </div>
      )}

      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-[9px] md:text-[10px] uppercase tracking-widest text-[#1a1a1a] z-10 bg-white/80 px-2 py-1 backdrop-blur-sm">
        {label}
      </span>
    </LocalizedClientLink>
  )

  return (
    <section className="py-10 md:py-20 border-t border-ui-border-base">
      <div className="content-container">
        <div className="flex justify-between items-center mb-10">
          <Text className="text-[12px] md:text-lg uppercase tracking-[0.2em] font-semibold text-[#1a1a1a]">
            {dict.categories?.title}
          </Text>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-gray-200">
          <GridItem
            label={dict.categories?.spf}
            src="/images/categories/spf.png"
            href="/store?category=spf"
          />
          <GridItem
            label={dict.categories?.penka}
            src="/images/categories/penka.png"
            href="/store?category=penka"
          />
          <GridItem
            label={dict.categories?.toner}
            src="/images/categories/toner.png"
            href="/store?category=toner"
          />
          <GridItem
            label={dict.categories?.serum}
            src="/images/categories/serum.png"
            href="/store?category=serum"
          />

          <GridItem
            label={dict.categories?.mist}
            src="/images/categories/mist-wide.png"
            href="/store?category=mist"
            className="col-span-2"
            aspectClass="aspect-[2/1]"
          />
          <GridItem
            label={dict.categories?.sarvi}
            src="/images/categories/about-sarvi.png"
            href="/about"
          />

          <GridItem
            label={dict.categories?.all_products}
            src="/images/categories/all-products-tall.png"
            href="/store"
            className="hidden md:flex md:row-span-2"
            aspectClass="md:aspect-[1/2]"
          />

          <GridItem
            label={dict.categories?.new}
            src="/images/categories/new.png"
            href="/store?category=new"
          />
          <GridItem
            label={dict.categories?.cream}
            src="/images/categories/cream.png"
            href="/store?category=cream"
          />
          <GridItem
            label={dict.categories?.sale}
            src="/images/categories/sale.png"
            href="/store?category=sale"
          />

          <GridItem
            label={dict.categories?.all_products}
            src="/images/categories/all-products-tall.jpg"
            href="/store"
            className="md:hidden"
          />
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
