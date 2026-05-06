"use client"

import { updateLocale } from "@lib/data/locale-actions"
import { HttpTypes } from "@medusajs/types"
import { useTransition } from "react"

const LocaleSwitcher = ({
  locales,
  currentLocale,
}: {
  locales: HttpTypes.StoreLocale[] | null
  currentLocale: string | null
}) => {
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (code: string) => {
    startTransition(async () => {
      await updateLocale(code)
    })
  }

  if (!locales || locales.length < 2) return null

  return (
    <div
      className={`flex gap-x-2 items-center ${
        isPending ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {locales.map((locale) => (
        <button
          key={locale.code}
          onClick={() => handleLocaleChange(locale.code!)}
          className={`uppercase text-[11px] transition-colors ${
            currentLocale === locale.code
              ? "font-bold text-ui-fg-base"
              : "text-ui-fg-subtle hover:text-ui-fg-base"
          }`}
        >
          {locale.code?.split("-")[0]}
        </button>
      ))}
    </div>
  )
}

export default LocaleSwitcher
