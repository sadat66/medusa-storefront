import OrderConfirmation from "@modules/order/components/order-confirmation"

type OrderConfirmationPageProps = {
  params: {
    orderId: string
  }
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderId } = await params;
  return <OrderConfirmation orderId={orderId} />
}
