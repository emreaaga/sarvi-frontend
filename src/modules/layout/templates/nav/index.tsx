import { listLocales } from "@lib/data/locales"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import LanguageSwitcher from "@modules/layout/components/language-switcher"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import { Suspense } from "react"

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

const HeartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M19 14c1.5-1.5 2-4.5.5-6-1.5-1.5-4.5-.5-5.5.5-1-1-4-2-5.5-.5-1.5 1.5-1 4.5.5 6l5 5 5-5Z" />
  </svg>
)

export default async function Nav({
  params,
}: {
  params: { locale: string; countryCode: string }
}) {
  const { locale, countryCode } = params

  const [regions, locales] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
  ])

  const dict = await getDictionary(locale)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <div className="w-full bg-[#f3f3f3] text-center text-[10px] uppercase tracking-[0.15em] text-ui-fg-base border-b border-ui-border-base">
        {dict.nav?.promo}
      </div>

      <header className="relative h-14 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container flex items-center justify-between w-full h-full text-[11px] uppercase tracking-wider">
          <div className="flex-1 basis-0 h-full flex items-center gap-x-5">
            <div className="small:hidden h-full flex items-center">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={locale}
              />
            </div>

            <div className="hidden small:flex items-center gap-x-6 text-ui-fg-base font-medium">
              <LocalizedClientLink
                href="/store"
                className="hover:text-ui-fg-disabled transition-colors"
              >
                {dict.nav?.catalog}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="hover:text-ui-fg-disabled transition-colors"
              >
                {dict.nav?.brands || "бренды"}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/about"
                className="hover:text-ui-fg-disabled transition-colors"
              >
                {dict.nav?.about}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="hover:text-ui-fg-disabled transition-colors"
              >
                {dict.nav?.customers}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="hover:text-ui-fg-disabled transition-colors"
              >
                {dict.nav?.contacts}
              </LocalizedClientLink>
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex flex-col items-center"
            >
              <Image
                src="/logo.svg"
                alt="Sarvi Logo"
                width={80}
                height={28}
                className="h-7 w-auto"
              />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-5 h-full flex-1 basis-0 justify-end font-medium">
            <LanguageSwitcher currentLocale={locale} />

            <LocalizedClientLink
              href="/wishlist"
              className="hover:text-ui-fg-disabled transition-colors flex items-center"
            >
              <HeartIcon />
            </LocalizedClientLink>

            <Suspense
              fallback={
                <span className="text-[11px]">{dict.nav?.cart} (0)</span>
              }
            >
              <div className="flex items-center h-full">
                <CartButton />
              </div>
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
