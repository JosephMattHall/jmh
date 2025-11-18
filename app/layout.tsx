import './globals.css'
import React from 'react'
import type { ReactNode } from 'react'
import Navbar from '@/components/NavBar';

export const metadata = {
  title: 'Under Construction - Joseph Hall',
  description: 'Under construction site for Joseph Hall',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black flex  items-center justify-center p-6">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
