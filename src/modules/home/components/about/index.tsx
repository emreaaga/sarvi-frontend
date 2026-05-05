import Image from "next/image"

// Функция загрузки словаря
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

const About = async ({ locale }: { locale: string }) => {
  const dict = await getDictionary(locale)

  return (
    <section className="w-full overflow-hidden bg-[#D9E8F0] border-x border-[#4A9FBF]">
      <div className="relative flex flex-col md:flex-row w-full md:min-h-[600px]">
        <div className="relative w-full md:w-1/2 h-[320px] sm:h-[400px] md:h-auto">
          <Image
            src="/images/about/about-hero.png"
            alt="SARVI Founder"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative w-full md:w-1/2 flex flex-col justify-start bg-[#D9E8F0] px-5 pt-4 pb-32 sm:pb-36 md:pt-6 md:pl-10 md:pr-10 md:pb-10">
          <h2
            className="font-black text-white leading-none tracking-tighter select-none pointer-events-none"
            style={{
              fontSize: "clamp(64px, 18vw, 160px)",
              lineHeight: 0.85,
              marginLeft: "-4px",
            }}
          >
            SARVI
          </h2>

          <div className="mt-3 md:mt-4">
            <h3
              className="font-bold text-black leading-snug"
              style={{
                fontSize: "clamp(15px, 4vw, 24px)",
                maxWidth: "480px",
              }}
            >
              {dict.about?.title}
            </h3>

            <div
              className="mt-4 md:mt-6 space-y-3 md:space-y-4 text-gray-700"
              style={{
                fontSize: "clamp(11px, 2.5vw, 12px)",
                maxWidth: "340px",
              }}
            >
              <p>{dict.about?.p1}</p>
              <p>{dict.about?.p2}</p>
            </div>
          </div>

          <div
            className="absolute bottom-0 right-0 overflow-hidden shadow-md"
            style={{
              width: "clamp(100px, 30vw, 200px)",
              height: "clamp(130px, 38vw, 270px)",
            }}
          >
            <Image
              src="/images/about/about-small.png"
              alt="SARVI Lifestyle"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
