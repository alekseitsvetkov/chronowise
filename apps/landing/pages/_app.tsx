import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import localFont from 'next/font/local'

import '@chronowise/ui/style'

const SF_PRO_DISPLAY = localFont({
  src: [
    {
      path: '../../../packages/assets/fonts/SFPRODISPLAYREGULAR.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../packages/assets/fonts/SFPRODISPLAYMEDIUM.woff',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../../packages/assets/fonts/SFPRODISPLAYBOLD.woff',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-sf-pro-display',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={`${SF_PRO_DISPLAY.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
