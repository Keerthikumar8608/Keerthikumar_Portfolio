"use client"

import { useEffect } from 'react'

export function ImageProtection() {
  useEffect(() => {
    // Disable right-click on all images
    const handleImageContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault()
        return false
      }
    }

    // Disable drag on all images
    const handleImageDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault()
        return false
      }
    }

    // Disable selection on images
    const handleImageSelectStart = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault()
        return false
      }
    }

    // Disable F12, Ctrl+Shift+I, Ctrl+U, etc. (developer tools shortcuts)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }
      
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault()
        return false
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        return false
      }
      
      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        return false
      }
    }

    // Add global event listeners
    document.addEventListener('contextmenu', handleImageContextMenu)
    document.addEventListener('dragstart', handleImageDragStart)
    document.addEventListener('selectstart', handleImageSelectStart)
    document.addEventListener('keydown', handleKeyDown)

    // Set all existing images to be non-draggable and protected
    const protectExistingImages = () => {
      const images = document.querySelectorAll('img')
      images.forEach((img) => {
        img.draggable = false
        img.style.userSelect = 'none'
        img.style.webkitUserSelect = 'none'
        img.setAttribute('style', img.getAttribute('style') + '; -moz-user-select: none; -ms-user-select: none; -webkit-touch-callout: none; -webkit-user-drag: none; -khtml-user-select: none;')
        
        // Add specific event listeners to each image
        img.addEventListener('contextmenu', (e) => e.preventDefault())
        img.addEventListener('dragstart', (e) => e.preventDefault())
        img.addEventListener('selectstart', (e) => e.preventDefault())
      })
    }

    // Protect images on load and when DOM changes
    protectExistingImages()
    
    // Observer for dynamically added images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const images = element.tagName === 'IMG' ? [element] : element.querySelectorAll('img')
            images.forEach((img) => {
              const imgElement = img as HTMLImageElement
              imgElement.draggable = false
              imgElement.style.userSelect = 'none'
              imgElement.style.webkitUserSelect = 'none'
              imgElement.setAttribute('style', imgElement.getAttribute('style') + '; -moz-user-select: none; -ms-user-select: none; -webkit-touch-callout: none; -webkit-user-drag: none; -khtml-user-select: none;')
              
              imgElement.addEventListener('contextmenu', (e) => e.preventDefault())
              imgElement.addEventListener('dragstart', (e) => e.preventDefault())
              imgElement.addEventListener('selectstart', (e) => e.preventDefault())
            })
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleImageContextMenu)
      document.removeEventListener('dragstart', handleImageDragStart)
      document.removeEventListener('selectstart', handleImageSelectStart)
      document.removeEventListener('keydown', handleKeyDown)
      observer.disconnect()
    }
  }, [])

  return null // This component doesn't render anything
}
