import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Gift, Package, ShieldCheck, Truck } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  original: <ShieldCheck size={32} strokeWidth={1} />,
  delivery: <Truck size={32} strokeWidth={1} />,
  packaging: <Gift size={32} strokeWidth={1} />,
  audit: <Package size={32} strokeWidth={1} />,
}

export const Service = ({ dict }: { dict: any }) => {
  return (
    <section className="bg-[#F9F9F9] w-full py-12 md:py-20 font-sans">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <span className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-[#A0A0A0] uppercase font-normal mb-4 md:mb-5">
            {dict.subtitle}
          </span>
          <h2
            className="text-[22px] md:text-[30px] font-medium leading-[1.2] md:leading-[1.1] tracking-tight uppercase text-black max-w-[850px]"
            dangerouslySetInnerHTML={{ __html: dict.title }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-20">
          {Object.entries(dict.items).map(([key, item]: [string, any]) => (
            <div
              key={key}
              className="flex flex-col items-center text-center group h-full"
            >
              <div className="mb-6 md:mb-10 transition-transform duration-700 group-hover:scale-110 text-black">
                {iconMap[key]}
              </div>

              <h3 className="text-[12px] md:text-[13px] font-extrabold tracking-[0.1em] uppercase text-black mb-3 md:mb-5">
                {item.title}
              </h3>

              <p className="text-[11px] md:text-[12px] leading-[1.6] text-[#444] mb-6 md:mb-8 md:min-h-[60px] max-w-[280px] md:max-w-none">
                {item.description}
              </p>

              <div className="mt-auto">
                <LocalizedClientLink
                  href="/"
                  className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase text-black border-b border-black pb-0.5 hover:opacity-50 transition-all"
                >
                  {dict.details}
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
