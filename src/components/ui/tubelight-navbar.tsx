import { useState } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon?: unknown
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  logoSrc?: string
  ctaLabel?: string
  ctaHref?: string
}

export function NavBar({
  items,
  className,
  logoSrc = "images/icon.png",
  ctaLabel = "Contact",
  ctaHref = "#contact",
}: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "")

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 pt-14",
        className,
      )}
    >
      <div className="relative mx-auto flex w-full items-center justify-between px-10 sm:px-20">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <a
            href="/"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="Go to home"
          >
            <img
              src={logoSrc}
              alt="Logo"
              className="h-10 w-auto object-contain"
              draggable={false}
            />
          </a>
        </div>

        {/* Center: Navigation Links - Absolute Centering */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 md:flex"
          aria-label="Primary"
        >
          {items.map((item) => {
            const isActive = activeTab === item.name
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative px-4 py-2 text-[15px] font-medium tracking-wide transition-all duration-300",
                  "text-slate-300 hover:text-white",
                  isActive && "rounded-lg bg-white/5 text-white border border-white/5",
                )}
              >
                {item.name}
              </a>
            )
          })}
        </nav>

        {/* Right: CTA Button */}
        <div className="flex-shrink-0">
          <a
            href={ctaHref}
            className={cn(
              "group inline-flex items-center gap-2 rounded-xl bg-black px-7 py-3 text-[14px] font-bold text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300",
              "ring-1 ring-white/10 hover:bg-[#0a0a0a] hover:scale-[1.02] active:scale-95",
            )}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
