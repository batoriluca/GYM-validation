import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import StorySlide from './StorySlide'

// Internal render target for the Instagram story export
// (Social media/story/scripts/export.mjs). Dev-only, like /carousel.
export const metadata: Metadata = {
  title: 'Story render',
  robots: { index: false, follow: false },
}

export default function StoryPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <StorySlide />
}
