interface SiteConfig {
  name: string
  description: string
  links: {
    github: string
    discord: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Chronowise",
  // TODO: change this to a better description
  description:
    "is a better way to improve your workflow",
  links: {
    github: "https://github.com/alekseytsvetkov/chronowoise",
    discord: "https://discord.com/invite/chronowoise"
  },
}