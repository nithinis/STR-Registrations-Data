import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'STR Registrations Data | Toronto Open Data',
  description: 'A website providing is a searchable interface for the STR Registrations data published by Toronto Open Data',
  viewport:"initial-scale=1, width=device-width" 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <React.Fragment>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </React.Fragment>
  )
}
