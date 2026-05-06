import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import Button from "@modules/common/components/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default function ProductPreview({
  product,
  region,
  dict,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  dict: any
}) {
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <div className="flex flex-col group w-full h-full bg-white">
      <div className="relative w-full aspect-[4/5] bg-[#F9F9F9] overflow-hidden mb-3">
        <LocalizedClientLink href={`/products/${product.handle}`}>
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </LocalizedClientLink>
        <button className="absolute top-2 right-2 text-black/50 hover:text-red-500 transition-colors z-10 p-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col flex-grow px-1">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="mb-1"
        >
          <h3 className="text-[10px] md:text-[11px] leading-tight uppercase font-bold text-[#1a1a1a] line-clamp-2 min-h-[2.4em]">
            {product.title}
          </h3>
        </LocalizedClientLink>

        <p className="text-[9px] md:text-[10px] text-gray-500 line-clamp-1 mb-2 italic">
          {product.subtitle || product.description}
        </p>

        <p className="text-[12px] md:text-[13px] font-bold text-black mb-3">
          {cheapestPrice ? (
            cheapestPrice.calculated_price
          ) : (
            <span className="text-gray-400 italic font-normal text-[10px] uppercase">
              {dict.price_on_request}
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-1 mt-auto pb-1 px-1">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="flex-1"
        >
          <Button
            variant="secondary"
            className="w-full h-6 md:h-7 text-[7px] md:text-[8px] px-0 tracking-tighter uppercase border-[#E5E5E5]"
          >
            {dict.details}
          </Button>
        </LocalizedClientLink>

        <Button
          variant="primary"
          className="flex-1 h-6 md:h-7 text-[7px] md:text-[8px] px-0 tracking-tighter uppercase"
        >
          {dict.buy}
        </Button>
      </div>
    </div>
  )
}
