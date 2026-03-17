import { useMemo, useState } from "react"
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
  const reducedItems = useMemo(() => items.slice(0, 3), [items])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <a
          href="/"
          className="flex items-center gap-2 rounded-xl px-2 py-2 transition-colors hover:bg-white/5"
          aria-label="Go to home"
        >
          <img
            src={logoSrc}
            alt="Logo"
            className="h-9 w-9 rounded-lg object-contain"
            draggable={false}
          />
        </a>

        <nav
          className={cn(
            "flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
            "max-[360px]:hidden",
          )}
          aria-label="Primary"
        >
          {reducedItems.map((item) => {
            const isActive = activeTab === item.name
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  "text-slate-200/80 hover:text-white",
                  isActive && "bg-white/10 text-white",
                )}
              >
                {item.name}
              </a>
            )
          })}
        </nav>

        <a
          href={ctaHref}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white",
            "shadow-[0_10px_25px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition",
            "hover:bg-black/90 hover:shadow-[0_14px_35px_rgba(0,0,0,0.45)]",
          )}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}
