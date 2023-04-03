import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { NavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { ModeToggle } from "@/components"
import {
  Button,
  buttonVariants,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons
} from "@chronowise/ui"
// import AppIcon from '/public/app-icon.png'

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex flex-1 justify-between">
      <Link href="/" className="hidden items-center space-x-2 md:flex min-w-[160px]">
        <Icons.logo className="h-7 w-9" />
        {/* <Image
          priority
          src={AppIcon}
          className="mr-2"
          alt="app logo"
          width="32"
          height="32"
        /> */}
        <span className="hidden text-xl font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center font-medium tracking-wide text-gray-500 hover:text-black dark:text-slate-100 lg:text-base md:text-md",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
          >
            <Icons.logo className="mr-2 h-6 w-6" />
            <span className="font-bold">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={24}
          className="w-[300px] overflow-scroll"
        >
          <DropdownMenuLabel>
            <Link href="/" className="flex items-center">
              <Icons.logo className="mr-2 h-4 w-4" /> {siteConfig.name}
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items?.map(
            (item, index) =>
              item.href && (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center space-x-2 sm:space-x-4 md:justify-end min-w-[160px] justify-end">
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
  )
}