import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/dictionaries"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  const locale = await getLocale()
  const dict = await getDictionary(locale || "ru-RU")

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <PaymentWrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} dict={dict} />
      </PaymentWrapper>

      <CheckoutSummary cart={cart} dict={dict} />
    </div>
  )
}
