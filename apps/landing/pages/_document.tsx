import { siteConfig } from '@/config'
import { Html, Head, Main, NextScript } from 'next/document'
import { cn } from "@chronowise/ui"

export default function Document() {
  const url = process.env.NEXT_PUBLIC_APP_URL
  const ogUrl = new URL(`${url}/og.jpg`)
  
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
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
      <body className={cn("min-h-screen bg-white font-sans text-black antialiased dark:bg-black dark:text-white")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}