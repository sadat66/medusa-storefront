import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import EnhancedThumbnail from "../enhanced-thumbnail"
import PreviewPrice from "./price"

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper" className="flex flex-col gap-3 relative">
        <div className="relative">
          <EnhancedThumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            priority={isFeatured}
            data-testid="product-thumbnail"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Text className="text-sm font-medium text-gray-900 truncate" data-testid="product-title">
            {product.title}
          </Text>
          <div className="flex items-center justify-between">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
