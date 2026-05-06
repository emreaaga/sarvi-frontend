import { getLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/dictionaries"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "О нас | Sarvi Cosmetics",
  description:
    "Команда Sarvi Cosmetics — твой гид по самой желанной и редкой корейской косметике.",
}

export default async function AboutPage() {
  const locale = await getLocale()
  const dict = await getDictionary(locale || "ru-RU")

  const d = dict.about_page

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
        {/* Левая часть: заголовок */}
        <div className="col-span-1">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#222] font-normal">
            {d.header}
          </h2>
        </div>

        {/* Правая часть: основной текст */}
        <div className="col-span-1 max-w-[550px]">
          <p className="text-[11px] text-[#888] mb-8 lowercase">{d.greeting}</p>

          <div className="text-[11px] leading-[2.2] tracking-[0.03em] text-[#333] space-y-6 font-light uppercase">
            <p>{d.p1}</p>
            <p>{d.p2}</p>
            <p>{d.p3}</p>
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
            {d.banner}
          </p>
        </div>
      </section>
    </main>
  )
}
