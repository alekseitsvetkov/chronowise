"use client"

import { RootLayout } from '@/components'
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <RootLayout>
        <div className="flex w-full flex-col items-center px-4">
          <p className="mt-3 text-center text-lg">
            about
          </p>
        </div>
      </RootLayout>
    </>
  );
}
