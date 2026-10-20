'use client'

import Image from 'next/image'
import Ground, { Glyph } from './Ground'
import styles from './card.module.css'

// One shop product card (web_frontend src/app/shop/page.tsx ProductCard) in
// the story's frosted-glass language, filled with mock data: media with
// category pill, title, seller, price and the arrow button.

const PRODUCT = {
  title: 'L$D: copertă de album, ilustrație originală',
  category: 'Visual/Artwork',
  seller: 'Kosmo Visuals',
  initials: 'KV',
  price: '350',
  image: '/story-card/mock-cover.jpg',
}

export default function ShopCard() {
  const p = PRODUCT
  return (
    <Ground>
      <article className={`${styles.card} ${styles.productCard}`}>
        <div className={styles.media}>
          <Image src={p.image} alt="" fill sizes="460px" priority className={styles.mediaImg} />
          <span className={styles.pill}>
            <b />
            {p.category}
          </span>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{p.title}</h2>

          <div className={styles.person}>
            <span className={styles.avatar}>{p.initials}</span>
            <span className={styles.sellerName}>{p.seller}</span>
          </div>

          <div className={styles.foot}>
            <span className={styles.price}>
              {p.price}
              <small>RON</small>
            </span>
            <span className={styles.go}>
              <Glyph strokeWidth={9}>
                <path d="M32 68 L68 32 M40 32 H68 V60" />
              </Glyph>
            </span>
          </div>
        </div>
      </article>
    </Ground>
  )
}
