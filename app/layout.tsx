import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { TextSizeProvider } from '../components/text-size-provider'
import { TextSizeManager } from '../components/text-size-manager'
import './globals.css'

export const metadata: Metadata = {
  title: 'DuPSUG - Dutch PowerShell User Group',
  description: 'Created for the Dutch PowerShell User Group (DuPSUG) - a community for PowerShell enthusiasts in the Netherlands.',
  icons: {
    icon: '/icon.png'
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
      </body>
    </html>
  )
}
