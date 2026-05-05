"use client"

import { updateLocale } from "@lib/data/locale-actions"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = async (newLocale: string) => {
    if (newLocale === currentLocale) return

    startTransition(async () => {
      await updateLocale(newLocale)

      const segments = pathname.split("/")
      segments[2] = newLocale

      const newPathname = segments.join("/")

      router.push(newPathname)
    })
  }

  const getBtnClass = (locale: string) => `
    transition-all duration-200 uppercase
    ${
      currentLocale === locale
        ? "text-black font-bold cursor-default"
        : "text-ui-fg-subtle hover:text-black cursor-pointer"
    }
    ${isPending ? "opacity-50 pointer-events-none" : ""}
  `

  return (
    <div className="flex items-center gap-x-2 text-[11px] font-medium tracking-tighter">
      <button
        onClick={() => handleLocaleChange("ru-RU")}
        className={getBtnClass("ru-RU")}
      >
        RU
      </button>

      <span className="text-ui-border-strong select-none">|</span>

      <button
        onClick={() => handleLocaleChange("uz-UZ")}
        className={getBtnClass("uz-UZ")}
      >
        UZ
      </button>
    </div>
  )
}
