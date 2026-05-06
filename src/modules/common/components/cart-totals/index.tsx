"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
  dict: any
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals, dict }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="font-sans">
      <div className="flex flex-col gap-y-3 text-[12px] text-[#666]">
        <div className="flex items-center justify-between">
          <span className="lowercase">{dict.subtotal}</span>
          <span className="text-black font-medium">
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="lowercase">{dict.shipping}</span>
          <span className="text-black font-medium">
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>

        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span className="lowercase">{dict.discount}</span>
            <span className="text-red-500 font-medium">
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="lowercase">{dict.taxes}</span>
          <span className="text-black font-medium">
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>

      <div className="h-px w-full border-b border-gray-100 my-6" />

      <div className="flex items-center justify-between text-black mb-2">
        <span className="uppercase text-[12px] tracking-[0.2em] font-bold">
          {dict.total}
        </span>
        <span className="text-[18px] font-bold">
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>

      <div className="h-px w-full border-b border-gray-100 mt-6" />
    </div>
  )
}

export default CartTotals
