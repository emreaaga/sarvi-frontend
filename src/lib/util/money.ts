import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "ru-RU",
}: ConvertToLocaleParams) => {
  const isUZS = currency_code?.toLowerCase() === "uzs"

  const minDigits = isUZS ? 0 : minimumFractionDigits
  const maxDigits = isUZS ? 0 : maximumFractionDigits

  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency_code,
        minimumFractionDigits: minDigits,
        maximumFractionDigits: maxDigits,
      })
        .format(amount)
        .replace("UZS", "сум")
    : amount.toString()
}
