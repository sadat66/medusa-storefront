"use client"

interface SidebarTriggerProps {
  onClick: () => void
  className?: string
}

export default function SidebarTrigger({ onClick, className = "" }: SidebarTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 ${className}`}
      data-testid="sidebar-trigger"
    >
      Menu
    </button>
  )
}
