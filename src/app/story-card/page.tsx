import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ShopCard from './ShopCard'
import PostCard from './PostCard'

// Internal render target for the card exports
// (Social media/story/scripts/export-shop-card.mjs). Dev-only, like /story.
// ?card=product (default) or ?card=post.
export const metadata: Metadata = {
  title: 'Card render',
  robots: { index: false, follow: false },
}

export default function StoryCardPage({ searchParams }: { searchParams: { card?: string } }) {
  if (process.env.NODE_ENV === 'production') notFound()
  return searchParams.card === 'post' ? <PostCard /> : <ShopCard />
}
