import { Heading } from "@medusajs/ui"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart, dict }: { cart: any; dict: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 font-sans">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 small:hidden" />

        <Heading
          level="h2"
          className="text-[20px] uppercase tracking-[0.2em] font-bold text-black"
        >
          {dict.cart_page.title}
        </Heading>

        <Divider className="my-6 border-gray-100" />

        <CartTotals totals={cart} dict={dict.cart_page} />

        <div className="mt-8">
          <ItemsPreviewTemplate cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
