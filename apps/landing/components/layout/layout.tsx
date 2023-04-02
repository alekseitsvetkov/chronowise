import Head from 'next/head'

import { Header, Footer } from '@/components'
import { siteConfig } from '@/config'

import '@chronowise/ui/style'
import { absoluteUrl } from '@/lib'

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Focus Timer",
    "Pomodoro Timer",
    "Pomodoro",
    "Time tracker",
    "Time management",
    "Productivity",
    "Workflow",
    "Reduce stress",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Tauri",
  ],
  authors: [
    {
      name: "alekseytsvetkov",
      url: "https://github.com/alekseytsvetkov",
    },
  ],
  creator: "alekseytsvetkov",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/og.jpg"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const url = process.env.NEXT_PUBLIC_APP_URL
  const ogUrl = new URL(`${url}/og.jpg`)

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
        className="flex min-h-screen flex-col"
      >
        <Header />
        <div className="flex-1 min-w-screen">{children}</div>
        <Footer />
      </div>
    </>
  )
}
