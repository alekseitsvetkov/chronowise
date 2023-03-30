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
    "A time tracking app for developers. Track your time and get insights into your productivity.",
  links: {
    github: "https://github.com/alekseytsvetkov/chronowoise",
    discord: "https://discord.com/invite/chronowoise"
  },
}