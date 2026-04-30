import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-24 h-6 bg-gray-100 animate-pulse" />
  }

  return (
    <div className="flex flex-col gap-y-1 font-sans mt-4 mb-6">
      <div className="flex items-center gap-x-3">
        <span
          className={clx("text-[20px] font-medium text-black tracking-wide", {
            "text-red-500": selectedPrice.price_type === "sale",
          })}
        >
          {!variant && (
            <span className="text-[14px] text-gray-500 mr-1 lowercase font-normal">
              от
            </span>
          )}
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>

        {selectedPrice.price_type === "sale" && (
          <div className="flex items-center gap-x-2">
            <span
              className="line-through text-gray-400 text-[14px]"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
            <span className="text-red-500 text-[10px] font-bold px-1.5 py-0.5 bg-red-50 rounded-sm">
              -{selectedPrice.percentage_diff}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
