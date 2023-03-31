"use client"

import { RootLayout } from '@/components'
import Head from 'next/head'

export const metadata = {
  title: 'Chronowise',
  description: 'Chronowise is a better way to improve your workflow. Meet the new way to increase productivity and reduce stress.',
}

export default function Home() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RootLayout>
        <div className="flex w-full flex-col items-center px-4">
          <h1 className="fade-in-heading z-30 px-2 text-center text-4xl font-black leading-tight text-black dark:text-white">
            Chronowise is a better way<br />to improve your workflow
          </h1>
          <p className="mt-3 text-center text-lg">
            Meet the new way to increase productivity and<br />reduce stress.
          </p>
        </div>
      </RootLayout>
    </>
  );
}
