"use client"

import Logo from "./logo"
import NavLinks from "./nav-links"
import ClientCartButton from "../cart-button/client-cart-button"
import Sidebar from "../sidebar"
import SearchBar from "@modules/common/components/search-bar"

export default function Navbar() {
  return (
    <nav className="bg-blue-50 shadow-sm border-b border-blue-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center h-16">
          {/* Left side - Sidebar */}
          <div className="flex items-center">
            <Sidebar />
          </div>

          {/* Center - Logo (absolute positioning for true centering) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Logo />
          </div>

          {/* Right side - Search, Desktop nav links and cart */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="hidden md:block">
              <SearchBar 
                className="w-64" 
                placeholder="Search products..."
                showButton={false}
              />
            </div>
            <NavLinks />
            <ClientCartButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
