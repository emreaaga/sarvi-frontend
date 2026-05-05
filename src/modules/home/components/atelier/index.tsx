import Button from "@modules/common/components/button"
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

export const Atelier = async ({ locale }: { locale: string }) => {
  const dict = await getDictionary(locale)

  return (
    <section className="bg-[#F7F7F7] w-full min-h-[650px] md:min-h-[800px] xl:min-h-[1100px] flex items-center justify-center relative overflow-hidden font-sans py-12 md:py-20">
      <div className="absolute top-[5%] left-[2%] md:top-[8%] md:left-[4%] w-[130px] h-[190px] md:w-[350px] md:h-[580px] opacity-80 md:opacity-100 transition-transform duration-1000 hover:scale-105 z-10">
        <Image
          src="/images/atelier/cocktail.png"
          alt="Meso Exosome"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute top-[2%] right-[2%] md:top-[4%] md:right-[15%] w-[100px] h-[140px] md:w-[280px] md:h-[380px] opacity-80 md:opacity-100 transition-transform duration-1000 hover:scale-105 z-10">
        <Image
          src="/images/atelier/roses.png"
          alt="Meso Epigenetic"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-[2%] left-[-2%] md:bottom-[0%] md:left-[0%] w-[110px] h-[150px] md:w-[280px] md:h-[380px] opacity-80 md:opacity-100 transition-transform duration-1000 hover:scale-105 z-10">
        <Image
          src="/images/atelier/rocks.png"
          alt="Meso Stem Cell"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-[5%] right-[2%] md:bottom-[5%] md:right-[8%] w-[120px] h-[170px] md:w-[320px] md:h-[450px] opacity-80 md:opacity-100 transition-transform duration-1000 hover:scale-105 z-10">
        <Image
          src="/images/atelier/woman.png"
          alt="Diamond Jewelry"
          fill
          className="object-cover"
        />
      </div>

      <div className="z-20 text-center max-w-[480px] flex flex-col items-center gap-4 md:gap-6 px-6">
        <h2 className="uppercase text-[#111111] text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-[0.01em]">
          SARVI <br /> COSMETICS
        </h2>

        <p className="text-[10px] md:text-[13px] leading-[1.5] text-[#333333] max-w-[280px] md:max-w-[420px]">
          {dict.atelier?.description}
        </p>

        <Button
          variant="primary"
          className="mt-2 md:mt-4 px-8 md:px-10 h-10 md:h-12 text-[8px] md:text-[10px] tracking-widest uppercase border-none rounded-sm transition-opacity hover:opacity-90 bg-[#1A1A1A] text-white"
        >
          {dict.atelier?.button}
        </Button>
      </div>
    </section>
  )
}

export default Atelier
