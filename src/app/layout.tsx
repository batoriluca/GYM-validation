import './globals.css'
import type { Metadata } from 'next'
import { LanguageProvider } from '@/i18n/LanguageContext'

export const metadata: Metadata = {
  title: 'GrowYourMusic Preregistration',
  description: 'Be the first to get access to GrowYourMusic, the platform for artists, producers, beatmakers, audio engineers, visual creators, studios, and managers.',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            pointerEvents: 'none',
            opacity: 0.025,
            backgroundImage: 'url(/img/grain.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '100px 100px',
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
