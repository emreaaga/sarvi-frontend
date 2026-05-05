import { Metadata } from "next"
import Image from "next/image"

async function getDictionary(locale: string) {
  const code = locale || "ru-RU"
  try {
    const dict = await import(`../../../../..//lib/constants/${code}.json`)
    return dict.default
  } catch {
    const fallback = await import(`../../../../..//lib/constants/ru-RU.json`)
    return fallback.default
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return {
    title: dict.about_page?.meta_title,
    description: dict.about_page?.meta_description,
  }
}

export default async function AboutPage(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const dict = await getDictionary(locale)

  return (
    <main className="w-full bg-white font-sans">
      <section className="grid grid-cols-1 md:grid-cols-3 w-full">
        <div className="relative w-full h-[650px] overflow-hidden">
          <Image
            src="/images/about/top-left.png"
            alt="Antala Spiruru Gel"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
        <div className="relative w-full h-[650px] overflow-hidden border-x border-white">
          <Image
            src="/images/about/top-center.jpg"
            alt="Sarvi Model"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
        <div className="relative w-full h-[650px] overflow-hidden">
          <Image
            src="/images/about/top-right.png"
            alt="Antala Bubble Toner"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-10 py-[30px] grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="col-span-1">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#222] font-normal">
            {dict.about_page?.header}
          </h2>
        </div>

        <div className="col-span-1 max-w-[550px]">
          <p className="text-[11px] text-[#888] mb-8 lowercase">
            {dict.about_page?.greeting}
          </p>

          <div className="text-[11px] leading-[2.2] tracking-[0.03em] text-[#333] space-y-6 font-light uppercase">
            <p>{dict.about_page?.p1}</p>
            <p>{dict.about_page?.p2}</p>
            <p>{dict.about_page?.p3}</p>
          </div>
        </div>
      </section>

      <section className="relative w-full h-[400px] overflow-hidden">
        <Image
          src="/images/about/bottom-full.png"
          alt="Petitra Luxury Serum"
          fill
          className="object-cover"
          quality={100}
        />

        <div className="absolute top-12 right-12 text-right px-4">
          <p className="text-[13px] tracking-[0.15em] text-white/80 uppercase font-light">
            {dict.about_page?.banner}
          </p>
        </div>
      </section>
    </main>
  )
}
