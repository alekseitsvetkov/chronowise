import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="overflow-hidden rounded-[10px]">
      <Head />
      <body className="bg-transparent">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}