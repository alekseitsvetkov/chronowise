import { MainNavItem } from "@/types"

interface SiteConfig {
  name: string
  description: string
  links: {
    github: string
    discord: string
  },
  mainNav: MainNavItem[]
}

export const siteConfig: SiteConfig = {
  name: "Chronowise",
  // TODO: change this to a better description
  description:
    "is a better way to improve your workflow",
  links: {
    github: "https://github.com/alekseytsvetkov/chronowoise",
    discord: "https://discord.com/invite/chronowoise",
  },
  mainNav: [
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Changelog",
      href: "/changelog",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
}