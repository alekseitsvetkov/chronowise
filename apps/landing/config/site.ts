import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Chronowise",
  // TODO: change this to a better description
  description:
    "is a better way to improve your workflow",
  url: "https://chronowise.vercel.app",
  ogImage: "https://chronowise.vercel.app/og.jpg",
  links: {
    github: "https://github.com/alekseytsvetkov/chronowise",
    discord: "https://discord.gg/thRBmKzCgM",
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