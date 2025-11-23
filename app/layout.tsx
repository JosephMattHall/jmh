import './globals.css'
import React from 'react'
import type { ReactNode } from 'react'
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Joseph Matthew Hall',
  description: 'A work in progress',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
