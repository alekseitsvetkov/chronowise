import { links } from "../../config"
import { buttonVariants, Icons } from '@chronowise/ui';
import { ModeToggle } from "../mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-black">
      <div className="container flex h-16 items-center">
        {/* <MainNav /> */}
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <nav className="flex items-center space-x-1">
            {/* <ModeToggle /> */}
            <a
              href={links.github}
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
            </a>
            <a
              href={links.discord}
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
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}