import type { AppProps } from 'next/app'

import '@chronowise/ui/style'
import { WindowTitlebar } from '@/components'
import { Suspense } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Suspense>
      <WindowTitlebar />
      <Component {...pageProps} />
    </Suspense>
  )
}
