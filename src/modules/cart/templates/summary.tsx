"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4 font-sans">
      <Heading
        level="h2"
        className="text-[20px] uppercase tracking-[0.2em] font-bold text-black"
      >
        итог
      </Heading>

      {/*<DiscountCode cart={cart} />*/}

      <Divider />

      <CartTotals totals={cart} />

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="w-full block mt-4"
      >
        <Button className="h-12 text-[11px] tracking-[0.2em]">
          оформить заказ
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
