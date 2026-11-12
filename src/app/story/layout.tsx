import { type ReactNode } from 'react'
import SocialFonts from '@/components/SocialFonts'

export default function SocialRouteLayout({ children }: { children: ReactNode }) {
  return <SocialFonts>{children}</SocialFonts>
}
