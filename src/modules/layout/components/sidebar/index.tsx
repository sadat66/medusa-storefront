"use client"

import { useState } from "react"
import SidebarTrigger from "./sidebar-trigger"
import SidebarMenu from "./sidebar-menu"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const openSidebar = () => setIsOpen(true)
  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      <SidebarTrigger onClick={openSidebar} />
      <SidebarMenu isOpen={isOpen} onClose={closeSidebar} />
    </>
  )
}
