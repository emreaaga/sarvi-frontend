import { getLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/dictionaries"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import Image from "next/image"

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const dict = await getDictionary(locale || "ru-RU")

  return (
    <div className="w-full bg-white relative small:min-h-screen font-sans">
      <div className="h-20 bg-white border-b border-gray-100">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90 text-gray-400" size={16} />

            <span className="mt-px hidden small:block text-[10px] tracking-widest text-gray-500 hover:text-black transition-colors">
              {dict.nav.back_to_cart}
            </span>

            <span className="mt-px block small:hidden text-[10px] tracking-widest text-gray-500 hover:text-black transition-colors">
              {dict.nav.back}
            </span>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/"
            className="flex items-center justify-center"
            data-testid="store-link"
          >
            <Image
              src="/logo.svg"
              alt="SARVI Logo"
              width={120}
              height={40}
              priority
              className="h-auto w-auto"
            />
          </LocalizedClientLink>

          <div className="flex-1 basis-0" />
        </nav>
      </div>

      <div className="relative" data-testid="checkout-container">
        {children}
      </div>

      <div className="py-8 w-full flex flex-col items-center justify-center border-t border-gray-50 mt-12">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
          © {new Date().getFullYear()} sarvi cosmetics.{" "}
          {dict.nav.rights_reserved}
        </span>
      </div>
    </div>
  )
}
