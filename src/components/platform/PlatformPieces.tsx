'use client'

// One real component per feature card, ported from the GrowYourMusic app
// (web_frontend - copie). Markup and class names follow the app's JSX; the
// styles (the *.module.css files next to this one) are restyled to the
// landing's design system so the pieces match the rest of the page. They are pictures
// of the product here: the wrapper is inert and hidden from assistive tech,
// and the card's heading and text carry the meaning.

import Image from 'next/image'
import { useEffect, useRef, type ReactNode } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import base from './platform.module.css'
import shop from './shop.module.css'
import chat from './chat.module.css'
import studio from './studio.module.css'
import management from './management.module.css'
import calendar from './calendar.module.css'
import leaderboard from './leaderboard.module.css'
import post from './post.module.css'
import track from './track.module.css'
import lyrics from './lyrics.module.css'
import dialog from './dialog.module.css'
import wallet from './wallet.module.css'
import contract from './contract.module.css'
import library from './library.module.css'
import FeatureGlyph from '../FeatureGlyphs'
import {
  TbArrowUp,
  TbArrowUpRight,
  TbCalendarEvent,
  TbCheck,
  TbChevronLeft,
  TbChevronRight,
  TbCircleDot,
  TbCrown,
  TbGift,
  TbEdit,
  TbLock,
  TbMessageCircle2,
  TbReceipt,
  TbVolume2,
} from './icons'

// ---------- frame ----------

function Piece({ kind, children }: { kind: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.setAttribute('inert', '')
  }, [])
  return (
    <div ref={ref} className={`${base.scope} ${base.piece}`} data-kind={kind} aria-hidden="true">
      {children}
    </div>
  )
}

// ---------- 1. Marketplace: shop product card (app/shop/page.tsx ProductCard) ----------

export function ProductPiece() {
  const { t } = useLanguage()
  const p = t.pieces
  return (
    <Piece kind="product">
      <article className={shop.card} data-cat="beats">
        <div className={shop.media}>
          <Image src="/img/IMGcover-violet.jpg" alt="" fill sizes="280px" className={shop.img_main} />
        </div>
        <div className={shop.body}>
          <h2 className={shop.title}>
            <span className={shop.title_link}>{p.product}</span>
          </h2>
          <div className={shop.foot}>
            <span className={shop.price}>
              150<small> EUR</small>
            </span>
            <span className={shop.go}>
              <TbArrowUpRight />
            </span>
          </div>
        </div>
      </article>
    </Piece>
  )
}

// ---------- 2. Messages: a conversation with a contract card (app/chat/[username]) ----------

export function ChatPiece() {
  const { t } = useLanguage()
  const p = t.pieces
  return (
    <Piece kind="chat">
      <section className={chat.panel}>
        <div className={chat.log_wrap}>
          <div className={chat.log}>
            <div className={chat.day}>
              <span>{p.today}</span>
            </div>
            <div className={chat.group} data-mine="false">
              <div className={chat.bubble} data-mine="false" data-last="true">
                {p.chat[0]}
              </div>
              <div className={chat.meta}>
                <time>18:11</time>
              </div>
            </div>
            <div className={chat.group} data-mine="true">
              <div className={chat.bubble} data-mine="true" data-last="false">
                {p.chat[1]}
              </div>
              <div className={chat.bubble} data-mine="true" data-last="false">
                {p.chat[2]}
              </div>
              <div className={chat.contract} data-mine="true">
                <span className={chat.contract_icon}>
                  <FeatureGlyph index={9} size="xl" />
                </span>
                <span className={chat.contract_text}>
                  <strong>{p.contractTitle}</strong>
                  <small>{p.contractText}</small>
                </span>
                <span className={chat.contract_btn}>{p.contractButton}</span>
              </div>
              <div className={chat.meta}>
                <time>18:20</time>
              </div>
            </div>
            <div className={`${chat.group} ${chat.tail}`} data-mine="false">
              <div className={chat.bubble} data-mine="false" data-last="true">
                {p.chat[3]}
              </div>
              <div className={chat.meta}>
                <time>18:42</time>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Piece>
  )
}

// ---------- 3. Studio: the booking panel on a studio page (app/studios/[studioId]) ----------

function StudioPiece() {
  const { t } = useLanguage()
  const p = t.pieces
  return (
    <Piece kind="studio">
      <div className={studio.panel}>
        <div className={studio.priceBlock}>
          <p className={studio.priceMain}>
            <strong>40</strong>
            <span>EUR / {p.hour}</span>
          </p>
          <p className={studio.priceSub}>{p.session}</p>
        </div>
        <div className={studio.panel_actions}>
          <span className={studio.cta}>
            <TbCalendarEvent /> {p.book}
          </span>
          <span className={studio.ghost}>
            <TbMessageCircle2 /> <span>{p.messageOwner}</span>
          </span>
        </div>
      </div>
    </Piece>
  )
}

// ---------- 4. Management: the month calendar (components/ManagementCalendar.js) ----------

// November 2026 starts on a Sunday; Monday-first grid like the app.
const LEAD_DAYS = [26, 27, 28, 29, 30, 31]
// Landing palette: brand ink for sessions, white for paid work, green for releases.
const EVENT_DOTS: Record<number, string[]> = {
  10: ['var(--brand-ink)'],
  14: ['#ffffff', 'var(--brand-ink)'],
  19: ['var(--ok)'],
  25: ['var(--brand-ink)'],
}
const SELECTED_DAY = 12

function CalendarPiece() {
  const { t } = useLanguage()
  const p = t.pieces
  const cells: { key: string; day: number; other: boolean }[] = [
    ...LEAD_DAYS.map((d) => ({ key: `p${d}`, day: d, other: true })),
    ...Array.from({ length: 30 }, (_, i) => ({ key: `d${i + 1}`, day: i + 1, other: false })),
    ...Array.from({ length: 6 }, (_, i) => ({ key: `n${i + 1}`, day: i + 1, other: true })),
  ]
  return (
    <Piece kind="calendar">
      <div className={management.panel}>
        <div className={calendar.wrap}>
          <div className={calendar.nav}>
            <span className={calendar.navButton}>
              <TbChevronLeft />
            </span>
            <div className={calendar.navJump}>
              <select value="11" onChange={() => undefined} tabIndex={-1}>
                <option value="11">{p.month}</option>
              </select>
              <select value="2026" onChange={() => undefined} tabIndex={-1}>
                <option value="2026">2026</option>
              </select>
            </div>
            <span className={calendar.navButton}>
              <TbChevronRight />
            </span>
          </div>
          <div className={calendar.weekdays}>
            {p.weekdays.map((label) => (
              <div className={calendar.weekday} key={label}>
                {label}
              </div>
            ))}
          </div>
          <div className={calendar.grid}>
            {cells.map((cell) =>
              cell.other ? (
                <div className={`${calendar.dayCell} ${calendar.otherMonth}`} key={cell.key}>
                  <span className={calendar.dayNumber}>{cell.day}</span>
                </div>
              ) : (
                <span
                  key={cell.key}
                  className={`${calendar.dayCell} ${cell.day === SELECTED_DAY ? calendar.selected : ''}`}
                >
                  <span className={calendar.dayNumber}>{cell.day}</span>
                  {EVENT_DOTS[cell.day] && (
                    <span className={calendar.dots}>
                      {EVENT_DOTS[cell.day].map((hue) => (
                        <span key={hue} className={calendar.dot} style={{ background: hue }} />
                      ))}
                    </span>
                  )}
                </span>
              ),
            )}
          </div>
          <div className={calendar.foot}>
            <p className={calendar.summary}>
              <TbCircleDot /> {p.monthSummary}
            </p>
          </div>
        </div>
      </div>
    </Piece>
  )
}

// ---------- 5. Library: a single, an EP and an album, each with its progress ----------

// Shelf rule from the platform: a single is one flat cover; an EP or album is
// the cover with sleeves stacked behind it (one for an EP, two for an album).
const RELEASES = [
  { sleeves: 0, progress: 100, done: true },
  { sleeves: 1, progress: 70, done: false },
  { sleeves: 2, progress: 40, done: false },
] as const

function LibraryPiece() {
  const { t } = useLanguage()
  const p = t.pieces
  return (
    <Piece kind="library">
      <section className={library.shelf}>
        <div className={library.head}>
          <h2>{p.projects}</h2>
          <span className={library.count}>3</span>
        </div>
        <ul className={library.grid}>
          {RELEASES.map((r, i) => (
            <li key={i} className={library.item}>
              <span className={library.stack} data-sleeves={r.sleeves}>
                {r.sleeves >= 2 && <span className={library.sleeve} data-depth="2" />}
                {r.sleeves >= 1 && <span className={library.sleeve} data-depth="1" />}
                <span className={library.cover}>
                  <Image src="/img/IMGcover-violet.jpg" alt="" fill sizes="180px" style={{ objectFit: 'cover' }} />
                </span>
              </span>
              <span className={library.kind}>{p.kinds[i]}</span>
              <span className={library.title}>{p.tracks[i]}</span>
              <span className={library.meta}>{p.trackCounts[i]}</span>
              <span className={library.status} data-done={r.done ? 'true' : 'false'}>
                <span className={library.bar}>
                  <span style={{ width: `${r.progress}%` }} />
                </span>
                <small>
                  {r.done && <TbCheck />} {p.stages[i]}
                </small>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Piece>
  )
}

// ---------- 6. Leaderboard: separate rankings, a glass podium and your own climb ----------

type Step = { place: number; points: number; note: string; up?: boolean }

function LeaderboardPiece() {
  const { t, lang } = useLanguage()
  const p = t.pieces
  const fmt = new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang === 'ro' ? 'ro-RO' : 'it-IT')
  const steps: Step[] = [
    { place: 2, points: 1120, note: p.gapTo1, up: true },
    { place: 1, points: 1240, note: p.lead },
    { place: 3, points: 980, note: p.gapTo2, up: true },
  ]
  return (
    <Piece kind="leaderboard">
      <section className={leaderboard.hero}>
        <div className={leaderboard.head}>
          <span className={leaderboard.seg}>
            <span data-active="true">{p.rankArtists}</span>
            <span>{p.rankProducers}</span>
          </span>
          <span className={leaderboard.prize}>
            <TbGift /> {p.prize}
          </span>
        </div>

        <ol className={leaderboard.podium}>
          {steps.map((s) => (
            <li key={s.place} className={leaderboard.step} data-place={s.place}>
              <span className={leaderboard.score}>
                <b>{fmt.format(s.points)}</b> {p.points}
              </span>
              <span className={leaderboard.note} data-up={s.up ? 'true' : undefined}>
                {s.up && <TbArrowUp />} {s.note}
              </span>
              <span className={leaderboard.block}>
                {s.place === 1 && (
                  <span className={leaderboard.crown}>
                    <TbCrown />
                  </span>
                )}
                <span className={leaderboard.num}>{s.place}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className={leaderboard.me}>
          <span className={leaderboard.me_rank}>#7</span>
          <span className={leaderboard.me_text}>
            <strong>{p.yourRank}</strong>
            <small>
              <TbArrowUp /> {p.climbed}
            </small>
          </span>
          <span className={leaderboard.me_progress}>
            <span className={leaderboard.bar}>
              <span style={{ width: '72%' }} />
            </span>
            <small>{p.toNext}</small>
          </span>
        </div>
      </section>
    </Piece>
  )
}

// ---------- 7. Feed: a post (components/post.js) ----------

function PostPiece() {
  const { t } = useLanguage()
  const p = t.pieces
  return (
    <Piece kind="post">
      <article className={post.post}>
        <div className={post.media}>
          {/* eslint-disable-next-line @next/next/no-img-element -- the app renders post media with a plain img */}
          <img src="/platform/post-studio.jpg" alt="" />
        </div>
        <p className={post.text}>{p.postText}</p>
        <div className={post.actions}>
          <span className={post.likeBtn} data-liked="true">
            <TbVolume2 />
            24
          </span>
        </div>
      </article>
    </Piece>
  )
}

// ---------- 8. Lyrics: the lyrics panel on a track page (app/track/[trackId] + LyricsEditor.js) ----------

function LyricsPiece() {
  const { t } = useLanguage()
  const p = t.pieces
  return (
    <Piece kind="lyrics">
      <section className={track.panel}>
        <div className={track.panel_head}>
          <div className={track.panel_title}>
            <h2>{p.lyrics}</h2>
            <span className={track.count}>{p.lyricsCount}</span>
          </div>
          <div className={track.panel_actions}>
            <span className={dialog.ghost}>
              <TbEdit /> {p.edit}
            </span>
          </div>
        </div>
        <div className={lyrics.viewer}>
          {p.strophes.map((strophe) => (
            <p key={strophe}>{strophe}</p>
          ))}
        </div>
      </section>
    </Piece>
  )
}

// ---------- 9. Wallet: the deposit summary (app/deposit/page.tsx) ----------

export function WalletPiece() {
  const { t } = useLanguage()
  const p = t.pieces
  return (
    <Piece kind="wallet">
      <aside className={wallet.panel}>
        <h2 className={wallet.summary_title}>{p.summary}</h2>
        <dl className={wallet.ledger}>
          <div className={wallet.ledger_row}>
            <dt>{p.youPay}</dt>
            <dd>50 EUR</dd>
          </div>
          <div className={wallet.ledger_row} data-tone="minus">
            <dt>{p.fee}</dt>
            <dd>− 3 EUR</dd>
          </div>
          <div className={wallet.ledger_row}>
            <dt>{p.balance}</dt>
            <dd>256 EUR</dd>
          </div>
        </dl>
        <div className={wallet.result}>
          <span className={wallet.result_label}>{p.after}</span>
          <span className={wallet.result_value}>
            303<span className={wallet.result_unit}>EUR</span>
          </span>
        </div>
        <ul className={wallet.notes}>
          <li>
            <TbLock /> {p.noteStripe}
          </li>
          <li>
            <TbReceipt /> {p.noteWallet}
          </li>
        </ul>
      </aside>
    </Piece>
  )
}

// ---------- 10. Contract: the progress track and the price (app/contract/[contractId]) ----------

const STEP_STATES = ['done', 'current', 'todo', 'todo'] as const

function ContractPiece() {
  const { t } = useLanguage()
  const p = t.pieces
  return (
    <Piece kind="contract">
      <div className={base.stack}>
        <ol className={contract.track} data-stopped="false">
          {p.steps.map((label, i) => (
            <li key={label} className={contract.step} data-state={STEP_STATES[i]}>
              <span className={contract.step_dot}>{STEP_STATES[i] === 'done' ? <TbCheck /> : null}</span>
              <span className={contract.step_label}>{label}</span>
            </li>
          ))}
        </ol>
        <aside className={contract.panel}>
          <dl className={contract.ledger}>
            <div className={contract.ledger_row}>
              <dt>{p.productLabel}</dt>
              <dd>{p.product}</dd>
            </div>
            <div className={contract.ledger_row}>
              <dt>{p.deliveryLabel}</dt>
              <dd>{p.deliveryValue}</dd>
            </div>
          </dl>
          <div className={contract.total}>
            <span>{p.price}</span>
            <strong>
              150<small>EUR</small>
            </strong>
          </div>
        </aside>
      </div>
    </Piece>
  )
}

// Order matches t.landing.items.
export const PLATFORM_PIECES = [
  ProductPiece,
  ChatPiece,
  StudioPiece,
  CalendarPiece,
  LibraryPiece,
  LeaderboardPiece,
  PostPiece,
  LyricsPiece,
  WalletPiece,
  ContractPiece,
]


