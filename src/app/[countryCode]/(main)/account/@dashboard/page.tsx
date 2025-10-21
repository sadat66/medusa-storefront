import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { redirect } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate() {
  const customer = await retrieveCustomer().catch(() => null)
  
  if (!customer) {
    redirect("/es/account")
  }
  
  const ordersResult = await listOrders().catch(() => null)
  const orders = ordersResult?.orders || null

  return <Overview customer={customer} orders={orders} />
}
