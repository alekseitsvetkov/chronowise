import type { AppProps } from 'next/app'

import '@chronowise/ui/style'
import { WindowTitlebar } from '@/components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WindowTitlebar />
      <Component {...pageProps} />
    </>
  )
}
