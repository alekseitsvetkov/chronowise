import { settingsConfig } from "@/config/settings"
import { SettingsNav } from "@/components/nav"

interface SettingsLayoutProps {
  children?: React.ReactNode
}

export function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  return (
    <div className="flex flex-row h-screen overflow-hidden text-gray-900 select-none dark:text-white pt-[30px]">
      <aside className="flex flex-col flex-grow-0 flex-shrink-0 w-48 min-h-full px-2.5 overflow-x-hidden overflow-y-scroll border-r border-gray-900 no-scrollbar bg-gray-800 dark:bg-gray-850 dark:border-gray-600 py-4">
        <SettingsNav items={settingsConfig.sidebarNav} />
      </aside>
      <main className="flex flex-col w-full min-h-full text-white p-4">
        {children}
      </main>
    </div>
  )
}