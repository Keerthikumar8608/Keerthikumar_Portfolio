"use client"

import { useState } from "react"
import { ProtectedImage } from "@/components/protected-image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: string[]
  width: number
  height: number
  altPrefix: string
  className?: string
}

export function ImageCarousel({ images, width, height, altPrefix, className }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  if (!images || images.length === 0) {
    return null // Or a placeholder if no images are provided
  }

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", className)}>
      <ProtectedImage
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`${altPrefix} image ${currentIndex + 1}`}
        width={width}
        height={height}
        className="w-full object-cover transition-opacity duration-500 ease-in-out"
        style={{ opacity: 1 }} // Ensure image is always visible
        loading="lazy"
      />

      {images.length > 1 && (
        <>
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/70 text-foreground rounded-full p-2 transition-colors duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/70 text-foreground rounded-full p-2 transition-colors duration-300"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  "block h-1 w-6 rounded-full cursor-pointer transition-all duration-300 border-0 p-0",
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/50 hover:bg-muted-foreground",
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
