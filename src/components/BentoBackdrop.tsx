'use client'

import { StudioMapMockup, MessagingMockup } from '@/components/PlatformMockups'
import {
  MarketplaceShopCard,
  MarketplaceSellCard,
  MarketplaceFeatureCard,
  MarketplaceReviewsCard,
  WalletBalanceCard,
  LeaderboardPodiumCard,
  LeaderboardArtistCard,
  VaultVocalsCard,
  VaultBeatCard,
  VaultCollabCard,
  VaultLyricsCard,
} from '@/components/SocialCards'
import styles from './BentoBackdrop.module.css'

// The product's own real sections, laid out as a natural masonry flow —
// each card keeps its own real height instead of being stretched or
// cropped to fit a grid cell. Every one of these (bar studios/messaging)
// is a full card lifted straight from the "Social media" Instagram decks,
// same section header and copy as the source slide (see SocialCards.tsx).
// Studios and messaging have no matching deck slide, so they keep the
// original PlatformMockups components used elsewhere on the page — those
// are the only two that need a fixed-height cell (`fixed: true`), since
// their shared MockupFrame is built to fill a sized parent.
const BENTO_CARDS = [
  { key: 'marketplace', Card: MarketplaceShopCard, fixed: false },
  { key: 'marketplace-sell', Card: MarketplaceSellCard, fixed: false },
  { key: 'studios', Card: StudioMapMockup, fixed: true },
  { key: 'marketplace-feature', Card: MarketplaceFeatureCard, fixed: false },
  { key: 'charts', Card: LeaderboardPodiumCard, fixed: false },
  { key: 'charts-artist', Card: LeaderboardArtistCard, fixed: false },
  { key: 'wallet', Card: WalletBalanceCard, fixed: false },
  { key: 'marketplace-reviews', Card: MarketplaceReviewsCard, fixed: false },
  { key: 'vault-vocals', Card: VaultVocalsCard, fixed: false },
  { key: 'vault-beat', Card: VaultBeatCard, fixed: false },
  { key: 'vault-collab', Card: VaultCollabCard, fixed: false },
  { key: 'lyrics', Card: VaultLyricsCard, fixed: false },
  { key: 'messaging', Card: MessagingMockup, fixed: true },
] as const

// Doubled — the plane this renders into is taller than the banner it sits
// behind (see .joinBannerBackdrop in page.module.css), and a masonry
// `columns` layout only ever grows as tall as its own content: one pass
// of cards fills the top of that taller area and leaves the rest — the
// bottom bleed specifically — empty. Two passes give it enough real
// height to actually reach both edges instead of just the top one.
const BACKDROP_CARDS = [...BENTO_CARDS, ...BENTO_CARDS]

// Ambient background texture for the join banner (see JoinBannerStage):
// the bento grid rendered at an angle, as if the visitor is standing to
// its left looking across it toward the right, low-opacity and masked
// off before the join banner's own solid card ever needs to cover it.
export default function BentoBackdrop() {
  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.plane}>
        <div className={styles.grid}>
          {BACKDROP_CARDS.map(({ key, Card, fixed }, index) => (
            <div key={`${key}-${index}`} className={`${styles.cell} ${fixed ? styles.cellFixed : ''}`}>
              <Card />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
