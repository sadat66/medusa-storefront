"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import SearchIcon from "@modules/common/icons/search"

interface SearchBarProps {
  className?: string
  placeholder?: string
  showButton?: boolean
}

export default function SearchBar({ 
  className = "", 
  placeholder = "Search products...",
  showButton = true 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const params = new URLSearchParams()
    params.set("q", searchQuery.trim())
    
    // Always navigate to store page for search results
    router.push(`/store?${params.toString()}`)
  }, [searchQuery, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon size="20" color="#9CA3AF" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {showButton && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-r-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
