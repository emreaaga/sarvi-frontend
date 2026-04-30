"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Button from "@modules/common/components/button" // Твоя черная кнопка
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50 font-sans"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full outline-none">
          <LocalizedClientLink
            className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center h-full"
            href="/cart"
            data-testid="nav-cart-link"
          >
            {`корзина (${totalItems})`}
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-gray-100 w-[340px] shadow-sm text-black"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 flex items-center justify-center border-b border-gray-50">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold">
                корзина
              </h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-auto max-h-[320px] px-4 py-4 flex flex-col gap-y-6 no-scrollbar custom-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="flex gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-16 h-20 shrink-0"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1 text-[11px]">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-x-2">
                              <div className="flex flex-col truncate">
                                <h3 className="font-bold uppercase tracking-wider truncate text-black hover:text-gray-600 transition-colors">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                />
                                <span
                                  className="text-gray-400 mt-1"
                                  data-testid="cart-item-quantity"
                                >
                                  кол-во: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end font-medium text-black">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-2 text-gray-400 hover:text-red-500 transition-colors text-[10px] uppercase tracking-wider w-fit"
                            data-testid="cart-item-remove-button"
                          >
                            удалить
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 border-t border-gray-50">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-500 uppercase tracking-widest font-bold">
                      итого{" "}
                      <span className="font-normal lowercase text-[9px]">
                        (без доставки)
                      </span>
                    </span>
                    <span
                      className="text-[14px] font-bold text-black"
                      data-testid="cart-subtotal"
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full h-10"
                      data-testid="go-to-cart-button"
                    >
                      в корзину
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-12 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-gray-100 text-[10px] font-bold flex items-center justify-center w-8 h-8 rounded-full text-black">
                    <span>0</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    ваша корзина пуста
                  </span>
                  <div>
                    <LocalizedClientLink href="/store">
                      <>
                        <span className="sr-only">
                          Перейти к списку товаров
                        </span>
                        <Button onClick={close} className="h-10 px-6">
                          в каталог
                        </Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
