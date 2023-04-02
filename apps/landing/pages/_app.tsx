import type { AppProps } from 'next/app'

import { ThemeProvider } from '@chronowise/ui'


import '@chronowise/ui/style'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
