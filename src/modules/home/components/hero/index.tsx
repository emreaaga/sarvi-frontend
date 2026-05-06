import Button from "@modules/common/components/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = ({ dict }: { dict: any }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-ui-border-base">
      <div className="relative w-full overflow-hidden h-[50vh] md:h-[750px] border-b md:border-b-0 md:border-r border-ui-border-base">
        <Image
          src="/images/hero/hero-brand.png"
          alt="Premium Brand"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="relative w-full overflow-hidden h-[70vh] md:h-[750px] flex flex-col">
        <Image
          src="/images/hero/hero-woman.png"
          alt="Collection"
          fill
          className="object-cover"
          unoptimized
        />

        <div className="absolute inset-0 bg-black/5 md:bg-transparent" />

        <div className="absolute top-8 left-6 right-6 md:top-10 md:left-10 z-10 max-w-[320px]">
          <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-snug text-[#1a1a1a] uppercase font-semibold tracking-wider">
            {dict.description}
          </p>
        </div>

        <LocalizedClientLink
          href="/store"
          className="absolute bottom-10 left-6 md:bottom-14 md:left-14 z-10"
        >
          <Button
            variant="primary"
            className="w-full sm:w-fit px-8 md:px-10 h-12 uppercase text-sm font-medium transition-all hover:scale-105"
          >
            {dict.button}
          </Button>
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default Hero
