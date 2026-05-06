"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import { HttpTypes } from "@medusajs/types"
import Accordion from "./accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
  dict: any
}

const ProductTabs = ({ product, dict }: ProductTabsProps) => {
  const tabs = [
    {
      label: dict.specs_tab,
      component: <ProductInfoTab product={product} dict={dict} />,
    },
    {
      label: dict.shipping_tab,
      component: <ShippingInfoTab dict={dict} />,
    },
  ]

  return (
    <div className="w-full font-sans">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
            className="uppercase text-[10px] tracking-widest"
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product, dict }: ProductTabsProps) => {
  return (
    <div className="text-[11px] py-6 leading-relaxed text-[#666]">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              {dict.material}
            </span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              {dict.country}
            </span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              {dict.weight}
            </span>
            <p>{product.weight ? `${product.weight} г` : "-"}</p>
          </div>
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              {dict.dimensions}
            </span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}x${product.width}x${product.height} см`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = ({ dict }: { dict: any }) => {
  return (
    <div className="text-[11px] py-6 leading-relaxed text-[#666]">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-x-3">
          <FastDelivery size={16} />
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              {dict.fast_delivery}
            </span>
            <p>{dict.fast_delivery_desc}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Refresh size={16} />
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              {dict.easy_exchange}
            </span>
            <p>{dict.easy_exchange_desc}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Back size={16} />
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              {dict.easy_return}
            </span>
            <p>{dict.easy_return_desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
