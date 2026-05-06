import { retrieveCart } from "@lib/data/cart"
import { getLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/dictionaries"
import CartDropdown from "../cart-dropdown"

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)

  const locale = await getLocale()
  const dict = await getDictionary(locale || "ru-RU")

  return <CartDropdown cart={cart} dict={dict.cart_dropdown} />
}
