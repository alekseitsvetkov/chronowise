import { Header, ThemeProvider } from '@/components'
import '@chronowise/ui/style'

export const metadata = {
  title: 'Chronowise — A focus timer from the future.',
  // TODO: change this to a better description
  description: 'Chronowise is a better way to improve your workflow. Meet the new way to increase productivity and reduce stress.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div 
      className="flex min-h-screen flex-col"
      >
        <Header />
        <div className="container flex-1">{children}</div>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  )
}
