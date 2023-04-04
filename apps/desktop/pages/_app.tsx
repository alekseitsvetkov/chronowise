import type { AppProps } from 'next/app'
import { WindowTitlebar } from '@/components'

import '@chronowise/ui/style'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="overflow-auto">
      <WindowTitlebar />
      <Component {...pageProps} />
    </div>
  )
}
