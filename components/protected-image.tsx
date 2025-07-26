"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ProtectedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  loading?: "lazy" | "eager"
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
}

export function ProtectedImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  loading = "lazy",
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  ...props
}: ProtectedImageProps) {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const imageContainer = imageRef.current
    if (!imageContainer) return

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent drag start
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Add event listeners
    imageContainer.addEventListener('contextmenu', handleContextMenu)
    imageContainer.addEventListener('dragstart', handleDragStart)
    imageContainer.addEventListener('selectstart', handleSelectStart)

    // Cleanup
    return () => {
      imageContainer.removeEventListener('contextmenu', handleContextMenu)
      imageContainer.removeEventListener('dragstart', handleDragStart)
      imageContainer.removeEventListener('selectstart', handleSelectStart)
    }
  }, [])

  return (
    <div
      ref={imageRef}
      className={cn("relative select-none", className)}
      style={{
        ...style,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        KhtmlUserSelect: 'none',
      } as React.CSSProperties}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Transparent overlay to block interactions */}
      <div
        className="absolute inset-0 z-10"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        priority={priority}
        fill={fill}
        sizes={sizes}
        quality={quality}
        className="block"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          KhtmlUserSelect: 'none',
        } as React.CSSProperties}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
        {...props}
      />
    </div>
  )
}
