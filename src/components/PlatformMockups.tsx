import { type ReactNode } from 'react'
import Image from 'next/image'
import styles from './PlatformMockups.module.css'
import { useLanguage } from '@/i18n/LanguageContext'

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

const IconCart = () => <Icon><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2.5 3h2l2.2 12.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L21 7H6" /></Icon>
const IconChat = () => <Icon><path d="M4 4.5h16v11H9.5L5 19v-3.5H4z" /></Icon>
const IconPin = () => <Icon><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.4" /></Icon>
const IconCalendar = () => <Icon><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></Icon>
const IconStack = () => <Icon><path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" /><path d="M3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" /></Icon>
const IconTrophy = () => <Icon><path d="M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M7 5.5H4a3 3 0 0 0 3 4M17 5.5h3a3 3 0 0 1-3 4" /><path d="M12 14v3M9 20.5h6M10 17.5h4v3h-4z" /></Icon>
const IconImage = () => <Icon><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><circle cx="9" cy="10" r="1.6" /><path d="M4 17.5l5-5 3.5 3.5L17 11l3 3.5" /></Icon>
const IconVideo = () => <Icon><rect x="3.5" y="6" width="12" height="12" rx="2" /><path d="M15.5 10.5l5-2.7v8.4l-5-2.7" /></Icon>
const IconText = () => <Icon><path d="M5 5.5h14M5 10.5h14M5 15.5h9" /></Icon>
const IconSparkle = () => <Icon><path d="M12 3l1.6 4.9L18.5 9l-4.9 1.6L12 15.5l-1.6-4.9L5.5 9l4.9-1.6L12 3z" /><path d="M18.5 15l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8.8-2.3z" /></Icon>
const IconWallet = () => <Icon><rect x="3" y="6.5" width="18" height="12.5" rx="2.5" /><path d="M3 10.5h18" /><circle cx="16.5" cy="14.5" r="1.2" /></Icon>
const IconArrowDown = () => <Icon><path d="M12 4.5v13.5M6.5 13l5.5 5.5L17.5 13" /></Icon>
const IconArrowUp = () => <Icon><path d="M12 19.5V6M6.5 11l5.5-5.5L17.5 11" /></Icon>
const IconDoc = () => <Icon><path d="M6.5 3.5h8l4 4v12.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-15.5a1 1 0 0 1 1-1z" /><path d="M14 3.5V8h4.5M9 12.5h6M9 15.8h6" /></Icon>
const IconStar = () => <Icon><path d="M12 3.5l2.7 5.6 6.1.8-4.5 4.3 1.1 6-5.4-2.9-5.4 2.9 1.1-6-4.5-4.3 6.1-.8L12 3.5z" /></Icon>
const IconWaveform = () => <Icon><path d="M3 12h1.5M7 8v8M10.5 5v14M14 9v6M17.5 6.5v11M21 12h-1.5" /></Icon>

export const FEATURE_ICONS = [
  <IconCart key="cart" />,
  <IconChat key="chat" />,
  <IconPin key="pin" />,
  <IconCalendar key="calendar" />,
  <IconStack key="stack" />,
  <IconTrophy key="trophy" />,
  <IconImage key="image" />,
  <IconSparkle key="sparkle" />,
  <IconWallet key="wallet" />,
  <IconDoc key="doc" />,
]

function MockupFrame({ title, tint, children }: { title: string; tint?: 'purple' | 'gold'; children: ReactNode }) {
  return (
    <div className={styles.frame}>
      <div className={styles.frameBar}>
        <span className={styles.frameDots}>
          <i /><i /><i />
        </span>
        <span className={styles.frameTitle}>{title}</span>
      </div>
      <div className={`${styles.frameBody} ${tint === 'gold' ? styles.frameBodyGold : ''}`}>{children}</div>
    </div>
  )
}

export function StudioBookingCard() {
  const { t } = useLanguage()
  const m = t.mockups.studio
  return (
    <div className={styles.bookingCard}>
      <div className={styles.bookingTop}>
        <p className={styles.bookingName}>{m.name}</p>
        <span className={styles.bookingRating}>
          <IconStar /> 4.9
        </span>
      </div>
      <p className={styles.bookingMeta}>
        <IconPin /> {m.location}
      </p>
      <div className={styles.bookingRow}>
        <span className={styles.bookingPrice}>{m.price}</span>
        <span className={styles.bookingButton}>{m.button}</span>
      </div>
    </div>
  )
}

export function StudioMapMockup() {
  return (
    <MockupFrame title="Studios">
      <div className={styles.studioMapBody}>
        <Image
          src="/screenshots/studios_final.png"
          alt="GrowYourMusic studio map"
          fill
          sizes="(max-width: 980px) 100vw, 50vw"
          loading="eager"
        />
        <StudioBookingCard />
      </div>
    </MockupFrame>
  )
}

export function ManagementMockup() {
  const { t } = useLanguage()
  const m = t.mockups.management
  const active = 12
  const eventDays = [2, 5, 7, 9, 11, 14, 16, 19, 21, 23, 25, 27, 29]
  return (
    <MockupFrame title="Calendar">
      <div className={styles.calendarMockup}>
        <div className={styles.calendarHeader}>
          {m.days.map((d, i) => (
            <span key={i} className={styles.calendarDayLabel}>
              {d}
            </span>
          ))}
        </div>
        <div className={styles.calendarGrid}>
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className={`${styles.calendarCell} ${i + 1 === active ? styles.calendarCellActive : ''}`}
            >
              {i + 1}
              {eventDays.includes(i + 1) ? <span className={styles.calendarDot} /> : null}
            </span>
          ))}
        </div>
        <div className={styles.calendarEvent}>
          <span className={styles.calendarEventIcon}><IconCalendar /></span>
          <span className={styles.calendarEventTime}>14:00</span>
          <span>{m.event}</span>
        </div>
      </div>
    </MockupFrame>
  )
}

export function LibraryMockup() {
  const { t } = useLanguage()
  const tracks = t.mockups.library.tracks
  const progressValues = [72, 45, 90]
  return (
    <MockupFrame title="Library">
      <div className={styles.libraryMockup}>
        {tracks.map((name, i) => (
          <div key={name} className={styles.trackTile}>
            <div className={styles.trackArt}><IconStack /></div>
            <div className={styles.trackInfo}>
              <p className={styles.trackName}>{name}</p>
              <div className={styles.trackProgressTrack}>
                <span className={styles.trackProgressFill} style={{ width: `${progressValues[i % 3]}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  )
}

const LEADERBOARD_RANK_STYLES = [styles.leaderboardRankGold, styles.leaderboardRankSilver, styles.leaderboardRankBronze]

export function ChartsMockup() {
  const leaderboard = [
    { rank: 1, name: 'GYM_user1', points: 1280 },
    { rank: 2, name: 'GYM_user3', points: 1140 },
    { rank: 3, name: 'GYM_user2', points: 980 },
    { rank: 4, name: 'GYM_user5', points: 820 },
  ]
  return (
    <MockupFrame title="Leaderboard" tint="gold">
      <div className={styles.leaderboardMockup}>
        {leaderboard.map((u) => (
          <div
            key={u.rank}
            className={`${styles.leaderboardRow} ${u.rank <= 3 ? styles.leaderboardRowTop : ''}`}
          >
            <span className={`${styles.leaderboardRank} ${LEADERBOARD_RANK_STYLES[u.rank - 1] ?? ''}`}>
              {u.rank <= 3 ? <IconTrophy /> : u.rank}
            </span>
            <span className={styles.leaderboardAvatar} />
            <span className={styles.leaderboardName}>{u.name}</span>
            <span className={styles.leaderboardPoints}>
              {u.points}
              <span className={styles.leaderboardPointsUnit}>pts</span>
            </span>
          </div>
        ))}
      </div>
    </MockupFrame>
  )
}

export function PostCreationMockup() {
  const { t } = useLanguage()
  const m = t.mockups.post
  const icons = [<IconImage key="i" />, <IconVideo key="v" />, <IconText key="t" />]
  return (
    <MockupFrame title="New post">
      <div className={styles.postMockup}>
        <p className={styles.postMockupTitle}>{m.title}</p>
        <div className={styles.postOptions}>
          {m.options.map((label, i) => (
            <div key={label} className={styles.postOption}>
              <span className={styles.postOptionIcon}>{icons[i % 3]}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className={styles.postMockupButton}>{m.button}</div>
      </div>
    </MockupFrame>
  )
}

export function WalletMockup() {
  const { t } = useLanguage()
  const m = t.mockups.wallet
  return (
    <MockupFrame title="Wallet" tint="gold">
      <div className={styles.walletMockup}>
        <div className={styles.walletTop}>
          <span className={styles.walletIcon}><IconWallet /></span>
          <div>
            <p className={styles.walletLabel}>{m.label}</p>
            <p className={styles.walletAmount}>{m.amount}</p>
          </div>
        </div>
        <div className={styles.walletActions}>
          <span className={styles.walletButton}><IconArrowDown /> {m.deposit}</span>
          <span className={styles.walletButtonGhost}><IconArrowUp /> {m.withdraw}</span>
        </div>
        <div className={styles.walletHistory}>
          {m.history.map((row) => (
            <div key={row.label} className={styles.walletHistoryRow}>
              <span className={styles.walletHistoryIcon}>
                {row.amount.startsWith('+') ? <IconArrowDown /> : <IconArrowUp />}
              </span>
              <span className={styles.walletHistoryLabel}>{row.label}</span>
              <span className={row.amount.startsWith('+') ? styles.walletPositive : styles.walletNegative}>
                {row.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  )
}

export function ContractMockup() {
  const { t } = useLanguage()
  const m = t.mockups.contract
  return (
    <MockupFrame title="Contracts">
      <div className={styles.contractMockup}>
        {m.rows.map((row) => (
          <div key={row.names} className={styles.contractRowWrap}>
            <div className={styles.contractRow}>
              <span className={styles.contractIcon}><IconDoc /></span>
              <div className={styles.contractInfo}>
                <p className={styles.contractTitle}>{m.title}</p>
                <p className={styles.contractMeta}>{row.names}</p>
              </div>
              <span className={row.status === 'signed' ? styles.contractStatusSigned : styles.contractStatusPending}>
                {row.status === 'signed' ? m.signed : m.pending}
              </span>
            </div>
            <p className={styles.contractFee}>
              {m.fee}: <strong>{row.fee}</strong>
            </p>
          </div>
        ))}
      </div>
    </MockupFrame>
  )
}

export function LyricsMockup() {
  const { t } = useLanguage()
  const m = t.mockups.lyrics
  return (
    <MockupFrame title="Lyrics">
      <div className={styles.lyricsMockup}>
        <div className={styles.lyricsLines}>
          {m.lines.map((line, i) => (
            <p key={i} className={line === '' ? styles.lyricsSpacer : styles.lyricsLine}>
              {line}
            </p>
          ))}
        </div>
        <div className={styles.aiSuggestion}>
          <span className={styles.aiTag}>
            <IconSparkle /> {m.aiTag}
          </span>
          <span>{m.aiSuggestion}</span>
        </div>
      </div>
    </MockupFrame>
  )
}

export function MarketplaceMockup() {
  const { t } = useLanguage()
  const items = t.mockups.marketplace.items
  return (
    <MockupFrame title="Marketplace">
      <div className={styles.marketplaceMockup}>
        {items.map((item) => (
          <div key={item.name} className={styles.productTile}>
            <div className={styles.productThumb}><IconWaveform /></div>
            <div className={styles.productInfo}>
              <p className={styles.productName}>{item.name}</p>
              <span className={styles.productPrice}>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  )
}

export function MessagingMockup() {
  const { t } = useLanguage()
  const m = t.mockups.messaging
  return (
    <MockupFrame title="Messages">
      <div className={styles.messagingMockup}>
        <div className={styles.messagingHeader}>
          <span className={styles.messagingAvatar} />
          <span className={styles.messagingContact}>{m.contact}</span>
          <span className={styles.messagingOnline} />
        </div>
        <div className={styles.messagingThread}>
          <div className={`${styles.bubble} ${styles.bubbleIncoming}`}>{m.incoming}</div>
          <div className={`${styles.bubble} ${styles.bubbleOutgoing}`}>{m.outgoing}</div>
        </div>
      </div>
    </MockupFrame>
  )
}
