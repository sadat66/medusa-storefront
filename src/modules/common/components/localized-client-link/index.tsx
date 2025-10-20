"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: any
}) => {
  const { countryCode } = useParams()
  
  // Ensure countryCode is valid, fallback to 'us' if null/undefined
  const safeCountryCode = countryCode && typeof countryCode === 'string' ? countryCode : 'us'

  return (
    <Link href={`/${safeCountryCode}${href}`} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
