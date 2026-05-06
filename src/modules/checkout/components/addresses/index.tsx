"use client"

import { setAddresses } from "@lib/data/cart"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
  dict,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  dict: any
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

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
          {dict.shipping_address}
          {!isOpen && <CheckCircleSolid className="text-black" />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              data-testid="edit-address-button"
            >
              {dict.edit}
            </button>
          </Text>
        )}
      </div>

      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={true}
              onChange={() => {}}
              cart={cart}
              dict={dict}
            />

            <SubmitButton className="mt-6" data-testid="submit-address-button">
              {dict.go_to_shipping}
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
                  <div
                    className="flex flex-col w-1/2"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2 font-bold">
                      {dict.shipping_address}
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.shipping_address.address_1}
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-1/2"
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2 font-bold">
                      {dict.contacts}
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      {cart.email}
                    </Text>
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
