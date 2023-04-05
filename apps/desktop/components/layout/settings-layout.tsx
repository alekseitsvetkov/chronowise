import Head from 'next/head';
import { settingsConfig } from "@/config/settings"
import { SettingsNav } from "@/components/nav"

interface SettingsLayoutProps {
  children?: React.ReactNode
}

export function SettingsLayout({
  children,
}: SettingsLayoutProps) {


  return (
    <div className="mx-auto flex flex-col space-y-6 pt-12 pb-4">
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SettingsNav items={settingsConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden text-white">
          {children}
        </main>
      </div>
    </div>
  )
}