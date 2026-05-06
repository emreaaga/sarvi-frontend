"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import { mapKeys } from "lodash"
import React, { useEffect, useMemo, useState } from "react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
  dict,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
  dict: any
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "",
        "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }))

    email &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        email: email,
      }))
  }

  useEffect(() => {
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, cart?.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5 font-sans">
          <p className="text-[12px] text-gray-600">
            {dict.saved_address_greeting.replace("{name}", customer.first_name)}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}
      <div className="grid grid-cols-2 gap-4 font-sans">
        <Input
          label={dict.first_name}
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData["shipping_address.first_name"]}
          onChange={handleChange}
          required
        />
        <Input
          label={dict.last_name}
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData["shipping_address.last_name"]}
          onChange={handleChange}
          required
        />
        <Input
          label={dict.address_placeholder}
          name="shipping_address.address_1"
          autoComplete="address-line1"
          value={formData["shipping_address.address_1"]}
          onChange={handleChange}
          required
        />
        <Input
          label={dict.company_optional}
          name="shipping_address.company"
          value={formData["shipping_address.company"]}
          onChange={handleChange}
          autoComplete="organization"
        />
        <Input
          label={dict.postal_code}
          name="shipping_address.postal_code"
          autoComplete="postal-code"
          value={formData["shipping_address.postal_code"]}
          onChange={handleChange}
          required
        />
        <Input
          label={dict.city}
          name="shipping_address.city"
          autoComplete="address-level2"
          value={formData["shipping_address.city"]}
          onChange={handleChange}
          required
        />
        <CountrySelect
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["shipping_address.country_code"]}
          onChange={handleChange}
          required
          placeholder={dict.country}
        />
        <Input
          label={dict.province}
          name="shipping_address.province"
          autoComplete="address-level1"
          value={formData["shipping_address.province"]}
          onChange={handleChange}
        />
      </div>

      {/* Скрытый инпут для автоматической синхронизации Billing адреса */}
      <input type="hidden" name="same_as_billing" value="on" />

      <div className="grid grid-cols-2 gap-4 mt-8 mb-4 font-sans">
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label={dict.phone}
          name="shipping_address.phone"
          autoComplete="tel"
          value={formData["shipping_address.phone"]}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default ShippingAddress
