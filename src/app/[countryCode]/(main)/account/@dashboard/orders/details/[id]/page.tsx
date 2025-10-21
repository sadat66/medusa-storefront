import { retrieveOrder } from "@lib/data/orders"
import OrderDetailsTemplate from "@modules/order/templates/order-details-template"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  
  // Check authentication first
  const customer = await retrieveCustomer().catch(() => null)
  if (!customer) {
    return {
      title: "Order Details",
      description: "View your order",
    }
  }
  
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return {
      title: "Order Details",
      description: "View your order",
    }
  }

  return {
    title: `Order #${order.display_id}`,
    description: `View your order`,
  }
}

export default async function OrderDetailPage(props: Props) {
  const params = await props.params
  
  // Check authentication first
  const customer = await retrieveCustomer().catch(() => null)
  if (!customer) {
    redirect("/es/account")
  }
  
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    redirect("/es/account")
  }

  return <OrderDetailsTemplate order={order} />
}
