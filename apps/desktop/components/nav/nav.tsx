"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn, Icons } from "@chronowise/ui"

interface SettingsNavProps {
  items: SidebarNavItem[]
}

export function SettingsNav({ items }: SettingsNavProps) {
  const path = usePathname()
  const router = useRouter()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      <div className="flex hover:cursor-pointer items-center mb-4" onClick={() => router.push("../")}>
        <Icons.arrowLeft className="w-5 h-5 text-white mr-2" />
        <span className="text-white text-base">Settings</span>
      </div>
      {items.map((item, index) => {
        // const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text- font-medium text-white hover:bg-white hover:text-black",
                  path === item.href ? "bg-white text-black" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {/* <Icon className="mr-2 h-4 w-4" /> */}
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}