import type { CSSProperties } from 'react'
import styles from './extras.module.css'

// The product card from the platform's /shop grid (web_frontend
// src/app/shop/page.tsx + shop.module.css), rebuilt for the carousel. The
// media area and the seller avatar are left blank on purpose: no product
// photos or profile pictures from the site.

const CAT_COLOR: Record<string, string> = {
  beats: '#6657da',
  visual: '#ed9ed6',
  musicvid: '#ffd218',
  mixmas: '#7743db',
}

type Props = {
  title: string
  category: keyof typeof CAT_COLOR
  label: string
  seller: string
  price: string
  currency?: string
}

export default function ShopProductCard({ title, category, label, seller, price, currency = '€' }: Props) {
  return (
    <article className={styles.product} style={{ '--cat': CAT_COLOR[category] } as CSSProperties}>
      <div className={styles.productMedia}>
        <span className={styles.productPill}>{label}</span>
      </div>
      <div className={styles.productBody}>
        <h2 className={styles.productTitle}>{title}</h2>
        <div className={styles.productSeller}>
          <span className={styles.productAvatar} />
          <span>{seller}</span>
        </div>
        <div className={styles.productFoot}>
          <span className={styles.productPrice}>
            {price}
            <small> {currency}</small>
          </span>
          <span className={styles.productGo} aria-hidden="true">
            {/* tabler arrow-up-right, as TbArrowUpRight on the shop page */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 7l-10 10" />
              <path d="M8 7l9 0l0 9" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}
