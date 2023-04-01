"use client"

import * as React from "react"
import localFont from 'next/font/local'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

export const SF_PRO_DISPLAY = localFont({
  src: [
    {
      path: '../../../../assets/fonts/SFPRODISPLAYREGULAR.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../assets/fonts/SFPRODISPLAYMEDIUM.woff',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../../../assets/fonts/SFPRODISPLAYBOLD.woff',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-sf-pro-display',
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div className={`${SF_PRO_DISPLAY.variable} font-sans tracking-wide`}>
        {children}
      </div>
    </NextThemesProvider>
  )
}