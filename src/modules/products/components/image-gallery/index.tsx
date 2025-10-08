"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 rounded-lg">
        {images[selectedImage]?.url && (
          <Image
            src={images[selectedImage].url}
            priority={selectedImage <= 2}
            className="object-cover object-center"
            alt={`Product image ${selectedImage + 1}`}
            fill
            quality={85}
            sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, 40vw"
          />
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`
                relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200
                ${selectedImage === index 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  quality={60}
                  sizes="64px"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
