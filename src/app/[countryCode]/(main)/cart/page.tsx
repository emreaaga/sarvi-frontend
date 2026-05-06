import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/dictionaries"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Корзина",
  description: "Ваша корзина покупок",
}

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    console.error(error)
    return notFound()
  })

  const customer = await retrieveCustomer()
  const locale = await getLocale()
  const dict = await getDictionary(locale || "ru-RU")

  return <CartTemplate cart={cart} customer={customer} dict={dict} />
}
