import { getLocale } from "@lib/data/locale-actions"
import { listLocales } from "@lib/data/locales"
import { listRegions } from "@lib/data/regions"
import { getDictionary } from "@lib/dictionaries" // Импортируй созданную функцию
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import LocaleSwitcher from "@modules/layout/components/locale-switcher"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import { Suspense } from "react"

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

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  const dict = await getDictionary(currentLocale || "ru-RU")

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <div className="w-full bg-[#f3f3f3] text-center text-[10px] uppercase tracking-[0.15em] text-ui-fg-base border-b border-ui-border-base">
        {dict.nav.promo}
      </div>

      <header className="relative h-14 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container flex items-center justify-between w-full h-full text-[11px] uppercase tracking-wider">
          {/* Левая часть */}
          <div className="flex-1 basis-0 h-full flex items-center gap-x-5">
            <div className="small:hidden h-full flex items-center">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>

            <div className="hidden small:flex items-center gap-x-6 text-ui-fg-base font-medium">
              <LocalizedClientLink
                href="/store"
                className="hover:text-ui-fg-disabled transition-colors"
              >
                {dict.nav.catalog}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="hover:text-ui-fg-disabled transition-colors"
                prefetch={false}
              >
                {dict.nav.brands}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/about"
                className="hover:text-ui-fg-disabled transition-colors"
                prefetch={false}
              >
                {dict.nav.about}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="hover:text-ui-fg-disabled transition-colors"
                prefetch={false}
              >
                {dict.nav.customers}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="hover:text-ui-fg-disabled transition-colors"
                prefetch={false}
              >
                {dict.nav.contacts}
              </LocalizedClientLink>
            </div>
          </div>

          {/* Центр (Логотип) */}
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

          {/* Правая часть */}
          <div className="flex items-center gap-x-5 h-full flex-1 basis-0 justify-end font-medium">
            <div className="hidden small:block border-r pr-5 border-ui-border-base">
              <LocaleSwitcher locales={locales} currentLocale={currentLocale} />
            </div>

            <LocalizedClientLink
              href="/"
              className="hover:text-ui-fg-disabled transition-colors flex items-center"
              prefetch={false}
            >
              <HeartIcon />
            </LocalizedClientLink>

            <Suspense
              fallback={
                <span className="text-[11px] uppercase">
                  {dict.nav.cart} (0)
                </span>
              }
            >
              <div className="flex items-center h-full">
                {/* Внутри CartButton тоже можно будет использовать dict */}
                <CartButton />
              </div>
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
