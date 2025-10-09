"use client"

import { Fragment, useEffect, useRef } from "react"
import { Transition } from "@headlessui/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchBar from "@modules/common/components/search-bar"

interface SidebarMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  { name: "Account", href: "/account" },
  { name: "Cart", href: "/cart" },
]

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle escape key to close
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" />
      </Transition>

      {/* Sidebar */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 -translate-x-full"
      >
        <div 
          ref={sidebarRef}
          className="fixed top-1/2 left-0 z-50 w-full max-w-xs bg-blue-50 shadow-xl transform -translate-y-1/2 rounded-r-lg"
        >
          <div className="flex flex-col h-[40rem] max-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-blue-200">
              <h2 className="text-lg font-semibold text-blue-900">Menu</h2>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-blue-200">
              <SearchBar 
                className="w-full" 
                placeholder="Search products..."
                showButton={true}
              />
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-6 py-6">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <LocalizedClientLink
                      href={item.href}
                      className="block px-4 py-3 text-lg font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      onClick={onClose}
                      data-testid={`${item.name.toLowerCase()}-link`}
                    >
                      {item.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-blue-200">
              <p className="text-sm text-blue-600 text-center">
                © {new Date().getFullYear()} TechStore. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}