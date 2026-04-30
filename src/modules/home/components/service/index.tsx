import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Gift, Package, ShieldCheck, Truck } from "lucide-react"

const SERVICES = [
  {
    title: "100% Оригинал",
    description:
      "Мы гарантируем подлинность каждого флакона. Только прямые поставки от официальных брендов.",
    icon: <ShieldCheck size={32} strokeWidth={1} />,
  },
  {
    title: "Быстрая доставка",
    description:
      "Оперативная доставка по Ташкенту и во все регионы Узбекистана в кратчайшие сроки.",
    icon: <Truck size={32} strokeWidth={1} />,
  },
  {
    title: "Премиум упаковка",
    description:
      "Каждый заказ оформляется в нашу фирменную люксовую упаковку — готовое решение для подарка.",
    icon: <Gift size={32} strokeWidth={1} />,
  },
  {
    title: "Экспертный аудит",
    description:
      "Тщательный отбор лучших линеек корейской косметики и нишевой парфюмерии.",
    icon: <Package size={32} strokeWidth={1} />,
  },
]

export const Service = () => {
  return (
    <section className="bg-[#F9F9F9] w-full py-12 md:py-20 font-sans">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <span className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-[#A0A0A0] uppercase font-normal mb-4 md:mb-5">
            С заботой о вас
          </span>
          <h2 className="text-[22px] md:text-[30px] font-medium leading-[1.2] md:leading-[1.1] tracking-tight uppercase text-black max-w-[850px]">
            SARVI ПРЕДОСТАВЛЯЕТ <br className="hidden md:block" />{" "}
            НЕПРЕВЗОЙДЕННЫЙ СЕРВИС
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-20">
          {SERVICES.map((service, idx) => (
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
                  href="/"
                  className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase text-black border-b border-black pb-0.5 hover:opacity-50 transition-all"
                >
                  подробнее
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
