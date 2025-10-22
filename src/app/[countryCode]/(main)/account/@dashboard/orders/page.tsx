import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound, redirect } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import { retrieveCustomer } from "@lib/data/customer"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"
import { Pagination } from "@modules/store/components/pagination"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

const ORDERS_PER_PAGE = 5

export default async function Orders({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  // Check if user is authenticated
  const customer = await retrieveCustomer().catch(() => null)
  
  if (!customer) {
    // Redirect to login if not authenticated
    redirect("/es/account")
  }

  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || "1")
  const offset = (page - 1) * ORDERS_PER_PAGE

  const { orders, count } = await listOrders(ORDERS_PER_PAGE, offset)

  if (!orders) {
    notFound()
  }

  const totalPages = Math.ceil(count / ORDERS_PER_PAGE)

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Orders</h1>
        <p className="text-base-regular">
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        {totalPages > 1 && (
          <Pagination
            data-testid="orders-pagination"
            page={page}
            totalPages={totalPages}
          />
        )}
        <Divider className="my-16" />
        <TransferRequestForm />
      </div>
    </div>
  )
}
