"use client"

import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

export default function ProductSlider({
  products,
  region,
  title,
  dict,
  handle,
}: {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  title: string
  dict: any
  handle: string
}) {
  const sliderRef = useRef<HTMLUListElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current
      const scrollAmount = clientWidth * 0.8
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount

      sliderRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-8 md:mb-10">
        <Text className="text-[12px] md:text-lg uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] truncate mr-2">
          {title}
        </Text>

        <div className="flex items-center shrink-0">
          <div className="flex items-center gap-x-1 md:gap-x-2">
            <button
              onClick={() => scroll("left")}
              className="p-1 hover:text-gray-500 transition-colors active:scale-90"
              aria-label="Previous"
            >
              <ChevronLeft
                size={18}
                className="md:w-5 md:h-5"
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1 hover:text-gray-500 transition-colors active:scale-90"
              aria-label="Next"
            >
              <ChevronRight
                size={18}
                className="md:w-5 md:h-5"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-x-3 md:gap-x-4 pb-4 no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {products.map((product) => (
          <li
            key={product.id}
            className="min-w-[60%] md:min-w-[28%] lg:min-w-[19%] snap-start"
          >
            <ProductPreview product={product} region={region} dict={dict} />
          </li>
        ))}
      </ul>
    </div>
  )
}
