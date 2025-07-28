"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface NavigationBarProps {
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeSection, onSectionClick }) => {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const sections = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "certificates", label: "Certificates" },
    { id: "blogs", label: "Blogs" },
  ]

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      // If not on main page, navigate to main page with section
      window.location.href = `/#${sectionId}`
      return
    }

    if (onSectionClick) {
      onSectionClick(sectionId)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const getActiveSection = () => {
    // If on blog page, highlight blogs section
    if (pathname?.startsWith("/blog")) {
      return "blogs"
    }
    return activeSection || "hero"
  }

  if (!mounted) return null

  return (
    <nav className="fixed right-2 top-4 md:right-4 md:top-1/2 md:transform md:-translate-y-1/2 z-50">
      <div className="nav-container flex flex-row md:flex-col space-x-1 md:space-x-0 md:space-y-1 rounded-xl p-2 shadow-md border bg-background/95 backdrop-blur-sm min-w-[90px]">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`nav-button text-xs font-medium transition-all duration-200 px-2 py-1.5 rounded-lg hover:bg-muted hover:text-foreground ${
              getActiveSection() === section.id 
                ? 'active bg-muted text-foreground' 
                : 'text-muted-foreground'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default NavigationBar
