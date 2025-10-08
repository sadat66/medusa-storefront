import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface LogoProps {
  className?: string
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <LocalizedClientLink
      href="/"
      className={`text-xl font-semibold text-blue-900 hover:text-blue-700 transition-colors duration-200 ${className}`}
      data-testid="nav-store-link"
    >
      TechStore
    </LocalizedClientLink>
  )
}
