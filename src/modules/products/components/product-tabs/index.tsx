"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import { HttpTypes } from "@medusajs/types"
import Accordion from "./accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "характеристики",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "доставка и возврат",
      component: <ShippingInfoTab />,
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

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-[11px] py-6 leading-relaxed text-[#666]">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              Материал
            </span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              Страна
            </span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              Вес
            </span>
            <p>{product.weight ? `${product.weight} г` : "-"}</p>
          </div>
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              Размеры
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

const ShippingInfoTab = () => {
  return (
    <div className="text-[11px] py-6 leading-relaxed text-[#666]">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-x-3">
          <FastDelivery size={16} />
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              Быстрая доставка
            </span>
            <p>3-5 рабочих дней до двери или в пункт выдачи.</p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Refresh size={16} />
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              Простой обмен
            </span>
            <p>Не подошел товар? Обменяем на новый без лишних хлопот.</p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Back size={16} />
          <div>
            <span className="font-bold text-black uppercase block mb-1">
              Легкий возврат
            </span>
            <p>Вернем деньги, если средство вам не подошло.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
