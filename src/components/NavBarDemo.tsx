import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: "Home", url: "/" },
    { name: "About Me", url: "#about" },
    { name: "Projects", url: "#projects" },
  ]

  return <NavBar items={navItems} logoSrc="images/icon.png" ctaLabel="Contact" ctaHref="#contact" />
}
