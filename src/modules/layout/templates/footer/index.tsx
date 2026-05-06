import { getLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/dictionaries"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default async function Footer() {
  const locale = await getLocale()
  const dict = await getDictionary(locale || "ru-RU")

  return (
    <footer className="border-t border-ui-border-base w-full bg-white font-sans">
      <div className="content-container flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 items-start border-b border-ui-border-base">
          <div className="md:col-span-4 flex flex-col gap-y-6">
            <LocalizedClientLink href="/">
              <Image
                src="/logo.svg"
                alt="SARVI"
                width={50}
                height={50}
                className="w-auto h-auto"
              />
            </LocalizedClientLink>

            <Text className="text-ui-fg-subtle txt-small max-w-[280px]">
              {dict.footer.description}
            </Text>

            <div className="flex flex-col gap-y-3 pt-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-ui-fg-base">
                {dict.footer.payment_methods}
              </span>
              <div className="flex flex-wrap gap-3 opacity-90 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src="/images/footer/payme.png"
                  alt="Payme"
                  width={50}
                  height={16}
                />
                <Image
                  src="/images/footer/click.png"
                  alt="Click"
                  width={50}
                  height={16}
                />
                <Image
                  src="/images/footer/uzum.png"
                  alt="Uzum"
                  width={50}
                  height={16}
                />
                <Image
                  src="/images/footer/humo.png"
                  alt="Humo"
                  width={50}
                  height={16}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 text-[10px] text-ui-fg-subtle space-y-8 uppercase tracking-[0.15em] leading-relaxed">
            <div>
              <p className="text-ui-fg-base font-bold mb-3">
                {dict.footer.address_1_title}
              </p>
              <div className="space-y-1">
                <p>{dict.footer.address_1_body}</p>
                <p className="pt-2 text-ui-fg-muted">
                  {dict.footer.address_1_metro}
                </p>
              </div>
            </div>
            <div>
              <p className="text-ui-fg-base font-bold mb-3">
                {dict.footer.address_2_title}
              </p>
              <div className="space-y-1">
                <p>{dict.footer.address_2_body}</p>
                <p className="pt-2 text-ui-fg-muted">
                  {dict.footer.address_2_metro}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right gap-y-6">
            <div className="space-y-1">
              <p className="text-[14px] font-bold tracking-tight text-ui-fg-base text-nowrap">
                998 94 874 21 12
              </p>
              <p className="text-[10px] text-ui-fg-muted uppercase tracking-widest">
                info@sarvi.uz
              </p>
            </div>

            <div className="flex flex-col gap-y-2 text-[10px] uppercase tracking-[0.2em] font-bold">
              <a
                href="#"
                className="hover:text-ui-fg-base transition-colors border-b border-transparent hover:border-black pb-0.5"
              >
                Telegram
              </a>
              <a
                href="#"
                className="hover:text-ui-fg-base transition-colors border-b border-transparent hover:border-black pb-0.5"
              >
                Whatsapp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-6 pb-12 pt-8 text-ui-fg-muted">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[9px] leading-[1.6] tracking-normal uppercase">
            <div className="flex flex-col gap-y-2">
              <p>{dict.footer.rights}</p>
              <p>{dict.footer.copy_warning}</p>
            </div>
            <div className="flex flex-col gap-y-2 md:text-right">
              <div className="flex md:justify-end gap-x-4">
                <LocalizedClientLink
                  href="/"
                  className="hover:text-ui-fg-base transition-colors underline-offset-4 underline"
                >
                  {dict.footer.privacy}
                </LocalizedClientLink>
                <span>{dict.footer.dev}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
