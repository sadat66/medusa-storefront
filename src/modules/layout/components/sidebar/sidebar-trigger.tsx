"use client"

interface SidebarTriggerProps {
  onClick: () => void
  className?: string
}

export default function SidebarTrigger({ onClick, className = "" }: SidebarTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-md transition-colors duration-200 ${className}`}
      data-testid="sidebar-trigger"
    >
      Menu
    </button>
  )
}
