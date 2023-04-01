import Link from "next/link"

import { buttonVariants, Icons } from '@chronowise/ui';
import { siteConfig } from "@/config";
import { MainNav, ModeToggle } from "@/components";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-transparent bg-transparent border-gray-550 bg-white-900/10 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav items={siteConfig.mainNav} />
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <nav className="flex items-center space-x-1">
            <ModeToggle />
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-black dark:text-white",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-black dark:text-white",
                })}
              >
                <Icons.discord className="h-5 w-5 fill-current" />
                <span className="sr-only">Discord</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}