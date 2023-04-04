"use client"

import { RootLayout } from '@/components'

export default function Home() {
  return (
    <RootLayout>
      <div className="flex w-full flex-col items-center px-4">
        <p className="mt-3 text-center text-lg">
          about
        </p>
      </div>
    </RootLayout>
  );
}
