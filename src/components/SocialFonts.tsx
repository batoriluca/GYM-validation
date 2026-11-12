import { type ReactNode } from 'react'

// The website uses one typeface (Geist, loaded in globals.css). The social
// render routes (/carousel, /story, /story-card) produce Instagram assets in
// the previous brand look, so they load its fonts here, scoped to themselves.
const SOCIAL_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&family=Playfair+Display:ital,wght@1,500;1,600;1,700&family=JetBrains+Mono:wght@600&display=swap'

export default function SocialFonts({ children }: { children: ReactNode }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href={SOCIAL_FONTS_URL} />
      <div style={{ fontFamily: '"Poppins", sans-serif' }}>{children}</div>
    </>
  )
}
