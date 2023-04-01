import { Icons } from '@chronowise/ui'

export function Footer() {
  return (
    <footer className="container flex items-center align-middle flex-col text-gray-400 py-8 border-t border-t-gray-150 dark:border-t-gray-550">
      <Icons.heart className="w-4 h-4 fill-current mb-2" />
      <div className="mb-2">Designed with love for productivity lovers</div>
      <div>2023</div>
    </footer>
  )
}