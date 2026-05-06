import { getLocale } from "@lib/data/locale-actions"
import { retrieveOrder } from "@lib/data/orders"
import { getDictionary } from "@lib/dictionaries"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}
export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  const locale = await getLocale()
  const dict = await getDictionary(locale || "ru-RU")

  return <OrderCompletedTemplate order={order} dict={dict} />
}
