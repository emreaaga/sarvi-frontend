"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white font-sans">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-[20px] uppercase tracking-[0.2em] font-bold text-black gap-x-2 items-center"
        >
          адрес доставки
          {!isOpen && <CheckCircleSolid className="text-black" />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              data-testid="edit-address-button"
            >
              изменить
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-[20px] uppercase tracking-[0.2em] font-bold text-black gap-x-4 pb-6 pt-8"
                >
                  платежный адрес
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6" data-testid="submit-address-button">
              перейти к доставке
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-[12px]">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-4 w-full">
                  {/* Сводка: Адрес доставки */}
                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2 font-bold">
                      адрес доставки
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2 font-bold">
                      контакты
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.email}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <Text className="text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2 font-bold">
                      платежный адрес
                    </Text>

                    {sameAsBilling ? (
                      <Text className="text-gray-600 leading-relaxed">
                        совпадает с адресом доставки.
                      </Text>
                    ) : (
                      <>
                        <Text className="text-gray-600 leading-relaxed">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </Text>
                        <Text className="text-gray-600 leading-relaxed">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </Text>
                        <Text className="text-gray-600 leading-relaxed">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </Text>
                        <Text className="text-gray-600 leading-relaxed">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8 border-gray-100" />
    </div>
  )
}

export default Addresses
