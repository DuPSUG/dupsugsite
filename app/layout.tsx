import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { TextSizeProvider } from '../components/text-size-provider'
import { TextSizeManager } from '../components/text-size-manager'
import './globals.css'

export const metadata: Metadata = {
  title: 'DuPSUG - Dutch PowerShell User Group',
  description: 'Created with v0',
  icons: {
    icon: '/placeholder-logo.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TextSizeProvider>
          <TextSizeManager />
          {children}
        </TextSizeProvider>
        <Analytics />
      </body>
    </html>
  )
}
