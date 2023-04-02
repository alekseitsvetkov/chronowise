import Link from "next/link"

import { buttonVariants, Icons } from '@chronowise/ui';
import { siteConfig } from "@/config";
import { MainNav, ModeToggle } from "@/components";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-transparent bg-white/80 border-gray-550 backdrop-blur dark:bg-gray-850/80">
      <div className="container flex h-14 items-center border-b border-b-gray-150 dark:border-b-gray-550">
        <MainNav items={siteConfig.mainNav} />
        {/* <MobileNav /> */}
      </div>
    </header>
  )
}