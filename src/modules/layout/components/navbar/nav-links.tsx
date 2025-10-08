import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface NavLinksProps {
  className?: string
}

export default function NavLinks({ className = "" }: NavLinksProps) {
  return (
    <div className={`hidden md:flex items-center space-x-8 ${className}`}>
      <LocalizedClientLink
        className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors duration-200"
        href="/store"
        data-testid="nav-store-link"
      >
        Store
      </LocalizedClientLink>
      <LocalizedClientLink
        className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors duration-200"
        href="/account"
        data-testid="nav-account-link"
      >
        Account
      </LocalizedClientLink>
    </div>
  )
}
