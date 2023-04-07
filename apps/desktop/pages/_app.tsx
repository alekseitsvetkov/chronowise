"use client";

import type { AppProps } from 'next/app'

import '@chronowise/ui/style'
import { WindowTitlebar, ErrorFallback } from '@/components'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Suspense>
      <ErrorBoundary fallbackRender={ErrorFallback}>
      <WindowTitlebar />
      <Component {...pageProps} />
      </ErrorBoundary>
    </Suspense>
}
