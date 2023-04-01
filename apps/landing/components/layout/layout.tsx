import Head from 'next/head'

import { Header } from '@/components'
import { siteConfig } from '@/config'
import { useTheme } from 'next-themes'

import pattern from '../../public/pattern.svg'
import patternDark from '../../public/patternDark.svg'

import '@chronowise/ui/style'
import { useEffect, useState } from 'react'

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
  const {theme} = useTheme()
  const url = process.env.NEXT_PUBLIC_APP_URL
  const ogUrl = new URL(`${url}/og.jpg`)

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  useEffect(() => {
    setBackgroundImage(`url(${theme === 'light' ? pattern.src : patternDark.src})`)
  }, [theme])

  return (
    <>
      <Head>
        <title>{`${siteConfig.name} - ${siteConfig.description}`}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={siteConfig.description} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:url" content={url?.toString()} />
        <meta property="og:image" content={ogUrl.toString()} />
      </Head>
      <div 
        className="flex min-h-screen flex-col w-full h-full bg-repeat bg-[length:100px_100px]"
        style={{
          ...backgroundImage ? { backgroundImage } : {},
        }}
      >
        <Header />
        <div className="container flex-1">{children}</div>
        {/* <Footer /> */}
      </div>
    </>
  )
}
