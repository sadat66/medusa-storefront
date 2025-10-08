import Image from "next/image"
import { clx } from "@medusajs/ui"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

type OrderItemImageProps = {
  thumbnail?: string | null
  images?: any[] | null
  className?: string
  "data-testid"?: string
}

const OrderItemImage: React.FC<OrderItemImageProps> = ({
  thumbnail,
  images,
  className,
  "data-testid": dataTestid,
}) => {
  const imageUrl = thumbnail || images?.[0]?.url

  return (
    <div
      className={clx(
        "relative w-full h-full bg-gray-50 rounded-lg overflow-hidden",
        className
      )}
      data-testid={dataTestid}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Product image"
          className="object-cover object-center"
          draggable={false}
          quality={75}
          fill
          sizes="(max-width: 576px) 80px, (max-width: 768px) 100px, 120px"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <PlaceholderImage size={16} />
        </div>
      )}
    </div>
  )
}

export default OrderItemImage
