"use client"

import Image from "next/image"
import { clx } from "@medusajs/ui"
import { useState } from "react"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

type EnhancedThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
  priority?: boolean
}

const EnhancedThumbnail: React.FC<EnhancedThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imageUrl = thumbnail || images?.[0]?.url

  // Get responsive height classes based on size
  const getHeightClasses = () => {
    switch (size) {
      case "small":
        return "h-48 small:h-56"
      case "medium":
        return "h-56 small:h-64"
      case "large":
        return "h-64 small:h-72"
      case "full":
        return "h-48 small:h-56 medium:h-64"
      case "square":
        return "aspect-square"
      default:
        return "h-48 small:h-56"
    }
  }

  // Get aspect ratio for featured products
  const getAspectRatio = () => {
    if (size === "square") return "aspect-square"
    if (isFeatured) return "aspect-[4/5]"
    return "aspect-[3/4]"
  }

  return (
    <div
      className={clx(
        "relative w-full overflow-hidden bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group",
        getHeightClasses(),
        getAspectRatio(),
        className
      )}
      data-testid={dataTestid}
    >
      {imageUrl && !hasError ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          )}
          <Image
            src={imageUrl}
            alt="Product image"
            className={clx(
              "object-cover object-center transition-transform duration-300 group-hover:scale-105",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            draggable={false}
            quality={75}
            priority={priority}
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 600px"
            fill
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
            }}
          />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <PlaceholderImage size={size === "small" ? 24 : 32} />
        </div>
      )}
    </div>
  )
}

export default EnhancedThumbnail
