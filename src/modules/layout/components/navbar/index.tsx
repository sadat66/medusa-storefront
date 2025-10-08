"use client"

import Logo from "./logo"
import NavLinks from "./nav-links"
import ClientCartButton from "../cart-button/client-cart-button"
import Sidebar from "../sidebar"

export default function Navbar() {
  return (
    <nav className="bg-blue-50 shadow-sm border-b border-blue-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Sidebar */}
          <div className="flex items-center">
            <Sidebar />
          </div>

          {/* Center - Logo */}
          <div className="flex items-center justify-center flex-1">
            <Logo />
          </div>

          {/* Right side - Desktop nav links and cart */}
          <div className="flex items-center space-x-6">
            <NavLinks />
            <ClientCartButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
