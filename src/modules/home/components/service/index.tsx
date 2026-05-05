import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Gift, Package, ShieldCheck, Truck } from "lucide-react"

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

export const Service = async ({ locale }: { locale: string }) => {
  const dict = await getDictionary(locale)

  const SERVICES_DATA = [
    {
      title: dict.service?.items?.original?.title,
      description: dict.service?.items?.original?.description,
      icon: <ShieldCheck size={32} strokeWidth={1} />,
    },
    {
      title: dict.service?.items?.delivery?.title,
      description: dict.service?.items?.delivery?.description,
      icon: <Truck size={32} strokeWidth={1} />,
    },
    {
      title: dict.service?.items?.packaging?.title,
      description: dict.service?.items?.packaging?.description,
      icon: <Gift size={32} strokeWidth={1} />,
    },
    {
      title: dict.service?.items?.audit?.title,
      description: dict.service?.items?.audit?.description,
      icon: <Package size={32} strokeWidth={1} />,
    },
  ]

  return (
    <section className="bg-[#F9F9F9] w-full py-12 md:py-20 font-sans">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <span className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-[#A0A0A0] uppercase font-normal mb-4 md:mb-5">
            {dict.service?.subtitle}
          </span>
          <h2
            className="text-[22px] md:text-[30px] font-medium leading-[1.2] md:leading-[1.1] tracking-tight uppercase text-black max-w-[850px]"
            dangerouslySetInnerHTML={{ __html: dict.service?.title }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-20">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group h-full"
            >
              <div className="mb-6 md:mb-10 transition-transform duration-700 group-hover:scale-110 text-black">
                {service.icon}
              </div>

              <h3 className="text-[12px] md:text-[13px] font-extrabold tracking-[0.1em] uppercase text-black mb-3 md:mb-5">
                {service.title}
              </h3>

              <p className="text-[11px] md:text-[12px] leading-[1.6] text-[#444] mb-6 md:mb-8 md:min-h-[60px] max-w-[280px] md:max-w-none">
                {service.description}
              </p>

              <div className="mt-auto">
                <LocalizedClientLink
                  href="/store"
                  className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase text-black border-b border-black pb-0.5 hover:opacity-50 transition-all"
                >
                  {dict.service?.details}
                </LocalizedClientLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service
