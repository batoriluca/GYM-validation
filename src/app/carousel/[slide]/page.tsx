import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CarouselSlide from '../CarouselSlide'

const SLIDE_COUNT = 8

// Internal render target for the Instagram carousel export
// (Social media/marketing/carousel-functii/scripts/export.mjs). Dev-only:
// it 404s in production builds, is linked from nowhere and is never indexed.
export const metadata: Metadata = {
  title: 'Carousel render',
  robots: { index: false, follow: false },
}

export default function CarouselSlidePage({ params }: { params: { slide: string } }) {
  if (process.env.NODE_ENV === 'production') notFound()
  const n = Number(params.slide)
  if (!Number.isInteger(n) || n < 1 || n > SLIDE_COUNT) notFound()
  return <CarouselSlide n={n} />
}
