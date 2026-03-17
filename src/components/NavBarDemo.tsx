import { Home, User, Briefcase } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: "Home", url: "#home", icon: Home },
    { name: "About Me", url: "#about", icon: User },
    { name: "Projects", url: "#projects", icon: Briefcase },
  ]

  return <NavBar items={navItems} />
}
