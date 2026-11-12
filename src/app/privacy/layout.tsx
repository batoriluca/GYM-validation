import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy · GrowYourMusic',
  description: 'How GrowYourMusic handles the data you share when you sign up for early access.',
}

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children
}
