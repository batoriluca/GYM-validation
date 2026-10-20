'use client'

import { type ReactNode } from 'react'
import styles from './SocialCards.module.css'
import { useLanguage } from '@/i18n/LanguageContext'

// Full cards lifted from the "Social media" Instagram-carousel decks —
// same section header, same copy, same numbers, just scaled down from a
// 1080×1080 post. Each card sizes to its own natural content height rather
// than being stretched or cropped to a grid cell.

function PCard({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <div className={styles.pcard}>
      <div className={styles.pcardInner}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{number}</span>
          <h3 className={styles.sectionTitle}>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  )
}

// wallet/02-wallet.html — section "01", "Your balance, always visible"
export function WalletBalanceCard() {
  const { t } = useLanguage()
  const c = t.socialCards.wallet
  return (
    <PCard number="01" title={c.title}>
      <div className={styles.walletRow}>
        <div>
          <p className={styles.balanceLabel}>{c.total}</p>
          <p className={styles.balanceValue}>{c.totalValue}</p>
          <div className={styles.lockedBox}>
            <p className={styles.lockedLabel}>{c.locked}</p>
            <p className={styles.lockedValue}>{c.lockedValue}</p>
          </div>
        </div>
        <div className={styles.walletActions}>
          <span className={styles.walletBtn}>{c.withdraw}</span>
          <span className={styles.walletBtn}>{c.deposit}</span>
        </div>
      </div>
    </PCard>
  )
}

// leaderboard/04-podium.html — section "03", "Rankings update live"
const PODIUM_ROWS = [
  { rank: 1, name: 'GYM_user12' },
  { rank: 2, name: 'GYM_user236' },
  { rank: 3, name: 'GYM_user31' },
  { rank: 4, name: 'GYM_user453' },
  { rank: 5, name: 'GYM_user89' },
]

export function LeaderboardPodiumCard() {
  const { t } = useLanguage()
  const c = t.socialCards.podium
  return (
    <PCard number="03" title={c.title}>
      <div className={styles.lbList}>
        {PODIUM_ROWS.map((row) => (
          <div key={row.rank} className={`${styles.lbRow} ${row.rank === 1 ? styles.lbTop : ''}`}>
            <div className={styles.lbLeft}>
              <span className={styles.lbRank}>#{row.rank}</span>
              <span className={styles.lbAvatar} />
              <span className={styles.lbName}>{row.name}</span>
            </div>
            <span className={styles.lbPts}>{c.points[row.rank - 1]} {c.unit}</span>
          </div>
        ))}
      </div>
    </PCard>
  )
}

// vault/02-collection.html — section "01", "One collection for everything you make"
// Original card — no matching deck slide for this one. The marketplace
// deck's own product-detail slide (04) already surfaces a single rating
// value; this extends that same numbered sequence (sell=01, detail=02,
// feature=03) with the review list that number never got in the source.
const REVIEWS = [
  { name: 'GYM_user7', stars: 5, text: 'Fast delivery, exactly what I needed for the hook.' },
  { name: 'GYM_user22', stars: 5, text: 'Clean mix, worth every credit.' },
  { name: 'GYM_user15', stars: 4, text: 'Great quality, quick to respond too.' },
]

export function MarketplaceReviewsCard() {
  return (
    <PCard number="04" title="What buyers are saying">
      <div className={styles.reviewList}>
        {REVIEWS.map((review) => (
          <div key={review.name} className={styles.reviewRow}>
            <span className={styles.reviewAvatar} />
            <div className={styles.reviewBody}>
              <div className={styles.reviewTop}>
                <span className={styles.reviewName}>{review.name}</span>
                <span className={styles.reviewStars}>
                  {'★'.repeat(review.stars)}
                  {'☆'.repeat(5 - review.stars)}
                </span>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </PCard>
  )
}

// vault/05-lyrics.html — section "04", "Your lyrics, written by you"
export function VaultLyricsCard() {
  return (
    <PCard number="04" title="Your lyrics, written by you">
      <div className={styles.lyricsCard}>
        <p className={styles.lyricsLine}>Verse 1</p>
        <p className={`${styles.lyricsLine} ${styles.muted}`}>City lights blur through the window pane,</p>
        <p className={`${styles.lyricsLine} ${styles.muted}`}>Same old streets but nothing feels the same...</p>
        <p className={styles.lyricsHeading}>Chorus</p>
        <p className={`${styles.lyricsLine} ${styles.muted}`}>We&apos;re running on a neon high tonight...</p>
      </div>
      <span className={styles.editBadge}>Edit lyrics</span>
    </PCard>
  )
}

// marketplace/02-shop.html — the full "Shop" slide: title, subtitle,
// category chips, and both product cards (no numbered section header —
// this slide never had one in the source deck).
const SHOP_PRODUCTS = [
  { variant: 'beat' as const, cover: 'Beat', seller: 'GYM_user1' },
  { variant: 'mix' as const, cover: 'Mix & Master', seller: 'GYM_user4' },
]

export function MarketplaceShopCard() {
  const { t } = useLanguage()
  const c = t.socialCards.shop
  const products = SHOP_PRODUCTS.map((item, i) => ({ ...item, ...c.products[i] }))
  return (
    <div className={styles.shopWrap}>
      <div className={styles.shopHeader}>
        <p className={styles.shopTitle}>{c.title}</p>
        <p className={styles.shopSub}>{c.subtitle}</p>
      </div>
      <div className={styles.chipRow}>
        {c.chips.map((chip, i) => (
          <span key={chip} className={`${styles.chip} ${i === 0 ? styles.chipActive : ''}`}>
            {chip}
          </span>
        ))}
      </div>
      {products.map((item) => (
        <div key={item.title} className={styles.prodCard}>
          <div className={`${styles.prodCover} ${item.variant === 'beat' ? styles.coverBeat : styles.coverMix}`}>
            <span className={styles.prodCoverLabel}>{item.cover}</span>
          </div>
          <div className={styles.prodDetails}>
            <div className={styles.prodTop}>
              <p className={styles.prodTitle}>{item.title}</p>
              <span className={styles.priceTag}>{item.price}</span>
            </div>
            <div className={styles.prodBottom}>
              <div className={styles.prodProfile}>
                <span className={styles.avatarCircle} />
                <span className={styles.prodUsername}>{item.seller}</span>
              </div>
              <span className={styles.viewBtn}>{c.view}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// marketplace/03-sell.html — section "01", "List your own service"
export function MarketplaceSellCard() {
  const { t } = useLanguage()
  const c = t.socialCards.sell
  return (
    <PCard number="01" title={c.title}>
      <div className={styles.formCol}>
        <div className={styles.field}>
          <p className={styles.fieldLabel}>{c.productLabel}</p>
          <p className={styles.fieldValue}>{c.productValue}</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldLabel}>{c.categoryLabel}</p>
          <div className={styles.catRow}>
            {c.categories.map((cat, i) => (
              <span key={cat} className={`${styles.catPill} ${i === 0 ? styles.catPillActive : ''}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldLabel}>{c.priceLabel}</p>
          <p className={styles.fieldValue}>{c.priceValue}</p>
        </div>
        <div className={styles.field}>
          <p className={styles.fieldLabel}>{c.descriptionLabel}</p>
          <p className={styles.fieldValuePlaceholder}>
            {c.descriptionValue}
          </p>
        </div>
        <span className={styles.submitBtn}>{c.submit}</span>
      </div>
    </PCard>
  )
}

// marketplace/05-feature.html — section "03", "Book a feature"
export function MarketplaceFeatureCard() {
  return (
    <PCard number="03" title="Book a feature">
      <div className={styles.featureCard}>
        <div className={styles.featureProfile}>
          <span className={styles.featureAvatar} />
          <div>
            <p className={styles.featureName}>GYM_user234</p>
            <p className={styles.featureRole}>Artist</p>
          </div>
        </div>
        <span className={styles.featurePriceTag}>$50</span>
      </div>
    </PCard>
  )
}

// vault/06-vocals.html — section "05", "Every take, labeled and ready"
const VOCAL_TAKES = [
  { variant: 'raw' as const, name: 'verse1_take3.wav' },
  { variant: 'raw' as const, name: 'hook_doubletrack.wav' },
  { variant: 'mix' as const, name: 'neon_city_final.wav' },
]

export function VaultVocalsCard() {
  const { t } = useLanguage()
  const c = t.socialCards.vocals
  return (
    <PCard number="05" title={c.title}>
      <div className={styles.vocalFilterRow}>
        <span className={`${styles.vocalChip} ${styles.vocalChipActive}`}>{c.all}</span>
        <span className={styles.vocalChip}>{c.raw}</span>
        <span className={styles.vocalChip}>{c.mixMastered}</span>
      </div>
      {VOCAL_TAKES.map((take) => (
        <div key={take.name} className={styles.vocalRow}>
          <span className={`${styles.vocalBadge} ${take.variant === 'raw' ? styles.vocalBadgeRaw : styles.vocalBadgeMix}`}>
            {take.variant === 'raw' ? c.raw : c.mixMastered}
          </span>
          <span className={styles.vocalName}>{take.name}</span>
          <span className={styles.vocalDownload}>{c.download}</span>
        </div>
      ))}
    </PCard>
  )
}

// vault/07-beat.html — section "06", "The instrumental, right next to the song"
export function VaultBeatCard() {
  return (
    <PCard number="06" title="The instrumental, right next to the song">
      <div className={styles.beatCard}>
        <div className={styles.beatArt} />
        <div className={styles.playerBar}>
          <span className={styles.playBtn}>▶</span>
          <span className={styles.trackLine} />
          <span className={styles.beatMeta}>1:42 / 3:05</span>
        </div>
        <span className={styles.uploadChip}>Change the beat</span>
      </div>
    </PCard>
  )
}

// vault/08-collab.html — section "07", "Bring collaborators onto any track or album"
const COLLAB_ROWS = [
  { name: 'GYM_producer', status: 'Accepted' as const },
  { name: 'GYM_featartist', status: 'Pending' as const },
]

export function VaultCollabCard() {
  const { t } = useLanguage()
  const c = t.socialCards.collab
  return (
    <PCard number="07" title={c.title}>
      <div className={styles.collabList}>
        {COLLAB_ROWS.map((row) => (
          <div key={row.name} className={styles.collabRow}>
            <span className={styles.collabAvatar} />
            <span className={styles.collabName}>{row.name}</span>
            <span className={`${styles.collabStatus} ${row.status === 'Accepted' ? styles.statusAccepted : styles.statusPending}`}>
              {row.status === 'Accepted' ? c.accepted : c.pending}
            </span>
          </div>
        ))}
        <span className={styles.inviteBtn}>{c.invite}</span>
      </div>
    </PCard>
  )
}

// leaderboard/02-artist.html — section "01", "The artist leaderboard"
export function LeaderboardArtistCard() {
  return (
    <PCard number="01" title="The artist leaderboard">
      <div className={styles.outWrap}>
        <p className={styles.outStart}>Artist A requests a feature from Artist B</p>
        <p className={styles.outArrowV}>↓</p>
        <div className={styles.outBranches}>
          <div className={styles.outBranch}>
            <p className={styles.outBranchLabel}>Artist A · sends the request</p>
            <p className={styles.outBranchText}>The deal closes</p>
            <p className={styles.outBranchPts}>+2 points</p>
          </div>
          <div className={styles.outBranch}>
            <p className={styles.outBranchLabel}>Artist B · accepts the request</p>
            <p className={styles.outBranchText}>Gets the feature done</p>
            <p className={styles.outBranchPts}>+4 points & the payout</p>
          </div>
        </div>
      </div>
    </PCard>
  )
}
