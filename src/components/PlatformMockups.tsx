import styles from './PlatformMockups.module.css'
import { useLanguage } from '@/i18n/LanguageContext'

export function StudioBookingCard() {
  const { t } = useLanguage()
  const m = t.mockups.studio
  return (
    <div className={styles.bookingCard}>
      <p className={styles.bookingName}>{m.name}</p>
      <p className={styles.bookingMeta}>{m.location}</p>
      <div className={styles.bookingRow}>
        <span className={styles.bookingPrice}>{m.price}</span>
        <span className={styles.bookingButton}>{m.button}</span>
      </div>
    </div>
  )
}

export function ManagementMockup() {
  const { t } = useLanguage()
  const m = t.mockups.management
  const active = 12
  const eventDays = [2, 5, 7, 9, 11, 14, 16, 19, 21, 23, 25, 27, 29]
  return (
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
        <span className={styles.calendarEventTime}>14:00</span>
        <span>{m.event}</span>
      </div>
    </div>
  )
}

export function LibraryMockup() {
  const { t } = useLanguage()
  const tracks = t.mockups.library.tracks
  return (
    <div className={styles.libraryMockup}>
      {tracks.map((name) => (
        <div key={name} className={styles.trackTile}>
          <div className={styles.trackArt} />
          <div className={styles.trackInfo}>
            <p className={styles.trackName}>{name}</p>
            <div className={styles.waveform}>
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className={styles.waveformBar} style={{ height: `${20 + ((i * 37) % 60)}%` }} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const LEADERBOARD_RANK_STYLES = [styles.leaderboardRankGold, styles.leaderboardRankSilver, styles.leaderboardRankBronze]

export function ChartsMockup() {
  const leaderboard = [
    { rank: 1, name: 'GYM_user1', points: 1280 },
    { rank: 2, name: 'GYM_user3', points: 1140 },
    { rank: 3, name: 'GYM_user2', points: 980 },
    { rank: 4, name: 'GYM_user5', points: 820 },
    { rank: 5, name: 'GYM_user4', points: 760 },
  ]
  return (
    <div className={styles.leaderboardMockup}>
      {leaderboard.map((u) => (
        <div
          key={u.rank}
          className={`${styles.leaderboardRow} ${u.rank <= 3 ? styles.leaderboardRowTop : ''}`}
        >
          <span className={`${styles.leaderboardRank} ${LEADERBOARD_RANK_STYLES[u.rank - 1] ?? ''}`}>
            {u.rank}
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
  )
}

export function PostCreationMockup() {
  const { t } = useLanguage()
  const m = t.mockups.post
  return (
    <div className={styles.postMockup}>
      <p className={styles.postMockupTitle}>{m.title}</p>
      <div className={styles.postOptions}>
        {m.options.map((label) => (
          <div key={label} className={styles.postOption}>
            <span className={styles.postOptionThumb} />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className={styles.postMockupButton}>{m.button}</div>
    </div>
  )
}

export function WalletMockup() {
  const { t } = useLanguage()
  const m = t.mockups.wallet
  return (
    <div className={styles.walletMockup}>
      <p className={styles.walletLabel}>{m.label}</p>
      <p className={styles.walletAmount}>{m.amount}</p>
      <div className={styles.walletActions}>
        <span className={styles.walletButton}>{m.deposit}</span>
        <span className={styles.walletButtonGhost}>{m.withdraw}</span>
      </div>
      <div className={styles.walletHistory}>
        {m.history.map((row) => (
          <div key={row.label} className={styles.walletHistoryRow}>
            <span>{row.label}</span>
            <span className={row.amount.startsWith('+') ? styles.walletPositive : styles.walletNegative}>
              {row.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ContractMockup() {
  const { t } = useLanguage()
  const m = t.mockups.contract
  return (
    <div className={styles.contractMockup}>
      {m.rows.map((row) => (
        <div key={row.names}>
          <div className={styles.contractRow}>
            <p className={styles.contractTitle}>{m.title}</p>
            <span className={row.status === 'signed' ? styles.contractStatusSigned : styles.contractStatusPending}>
              {row.status === 'signed' ? m.signed : m.pending}
            </span>
          </div>
          <p className={styles.contractMeta}>{row.names}</p>
          <p className={styles.contractMeta}>
            {m.fee}: {row.fee}
          </p>
        </div>
      ))}
    </div>
  )
}

export function LyricsMockup() {
  const { t } = useLanguage()
  const m = t.mockups.lyrics
  return (
    <div className={styles.lyricsMockup}>
      <div className={styles.lyricsLines}>
        {m.lines.map((line, i) => (
          <p key={i} className={line === '' ? styles.lyricsSpacer : styles.lyricsLine}>
            {line}
          </p>
        ))}
      </div>
      <div className={styles.aiSuggestion}>
        <span className={styles.aiTag}>{m.aiTag}</span>
        <span>{m.aiSuggestion}</span>
      </div>
    </div>
  )
}

export function MarketplaceMockup() {
  const { t } = useLanguage()
  const items = t.mockups.marketplace.items
  return (
    <div className={styles.marketplaceMockup}>
      {items.map((item) => (
        <div key={item.name} className={styles.productTile}>
          <div className={styles.productThumb} />
          <div className={styles.productInfo}>
            <p className={styles.productName}>{item.name}</p>
            <span className={styles.productPrice}>{item.price}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function MessagingMockup() {
  const { t } = useLanguage()
  const m = t.mockups.messaging
  return (
    <div className={styles.messagingMockup}>
      <div className={styles.messagingHeader}>
        <span className={styles.messagingAvatar} />
        <span className={styles.messagingContact}>{m.contact}</span>
      </div>
      <div className={styles.messagingThread}>
        <div className={`${styles.bubble} ${styles.bubbleIncoming}`}>{m.incoming}</div>
        <div className={`${styles.bubble} ${styles.bubbleOutgoing}`}>{m.outgoing}</div>
      </div>
    </div>
  )
}
