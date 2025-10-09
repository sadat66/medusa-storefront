"use client"

import { deleteLineItem } from "@lib/data/cart"
import { useCart } from "@lib/context/cart-context"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"
import toast from "react-hot-toast"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { refreshCart } = useCart()

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      await deleteLineItem(id)
      // Refresh cart state after successful deletion
      await refreshCart()
      
      // Show success toast
      toast.success("Item removed from cart", {
        duration: 3000,
        icon: '🗑️',
      })
    } catch (err) {
      console.error("Failed to delete item:", err)
      toast.error("Failed to remove item. Please try again.", {
        duration: 4000,
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
