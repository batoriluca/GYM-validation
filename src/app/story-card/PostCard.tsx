'use client'

import Image from 'next/image'
import Ground, { Glyph } from './Ground'
import styles from './card.module.css'

// One feed post (web_frontend src/components/post.js) in the story's
// frosted-glass language, filled with mock data: author row with the
// "Promovat" badge, image, caption, like button and date.

const POST = {
  author: 'Ilinca Mara',
  initials: 'IM',
  promoted: true,
  image: '/story-card/mock-studio.jpg',
  text: 'Prima zi în studio pentru noul EP 🎙️ Caut un producător pentru o piesă R&B. Scrieți-mi!',
  likes: 248,
  when: '14 oct. · 21:30',
}

export default function PostCard() {
  const p = POST
  return (
    <Ground>
      <article className={`${styles.card} ${styles.postCard}`}>
        <div className={styles.authorRow}>
          <div className={styles.person}>
            <span className={styles.avatar}>{p.initials}</span>
            <span className={styles.authorName}>{p.author}</span>
          </div>
          {p.promoted && (
            <span className={styles.promoted}>
              <Glyph strokeWidth={7}>
                <path d="M50 12 L58 38 L84 46 L58 54 L50 80 L42 54 L16 46 L42 38 Z" fill="currentColor" />
              </Glyph>
              Promovat
            </span>
          )}
        </div>

        <div className={`${styles.media} ${styles.postMedia}`}>
          <Image src={p.image} alt="" fill sizes="500px" priority className={styles.mediaImg} />
        </div>

        <p className={styles.caption}>{p.text}</p>

        <div className={styles.actions}>
          <span className={styles.like}>
            <Glyph strokeWidth={7}>
              <path
                d="M50 84 C30 70 12 56 12 36 A19 19 0 0 1 50 26 A19 19 0 0 1 88 36 C88 56 70 70 50 84 Z"
                fill="currentColor"
              />
            </Glyph>
            {p.likes}
          </span>
          <span className={styles.meta}>{p.when}</span>
        </div>
      </article>
    </Ground>
  )
}
