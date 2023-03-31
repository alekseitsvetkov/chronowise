import { Html, Head, Main, NextScript } from 'next/document'
import { cn } from "@chronowise/ui"

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body className={cn("min-h-screen bg-white font-sans text-black antialiased dark:bg-black dark:text-white")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}