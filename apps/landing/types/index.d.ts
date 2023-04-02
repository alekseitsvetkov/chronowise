import {MainNavItem} from './nav';

import { Icons } from '@chronowise/ui';

interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

interface MainNavItem extends NavItem {}

interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github: string
    discord: string
  },
  mainNav: MainNavItem[]
}