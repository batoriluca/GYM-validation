'use client'

import { useEffect, useState, FormEvent } from 'react'
import styles from './PreregisterForm.module.css'
import ValidationQuiz from './ValidationQuiz'
import { useLanguage } from '@/i18n/LanguageContext'
import { ROLE_VALUES } from '@/i18n/translations'
import { IconMail, IconUser, IconPin } from '@/components/Icons'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'loading' | 'error'
type Stage = 'form' | 'quiz' | 'done'

function getSource(): string {
  if (typeof window === 'undefined') return 'direct'
  const params = new URLSearchParams(window.location.search)
  return params.get('utm_source') || 'direct'
}

export default function PreregisterForm({ id }: { id?: string }) {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [city, setCity] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [stage, setStage] = useState<Stage>('form')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; role?: string }>({})
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (status !== 'loading') return

    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + (90 - p) * 0.1))
    }, 150)

    return () => clearInterval(interval)
  }, [status])

  const validate = () => {
    const errors: { email?: string; role?: string } = {}
    if (!email.trim()) {
      errors.email = t.form.errorEmailRequired
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = t.form.errorEmailInvalid
    }
    if (!role) {
      errors.role = t.form.errorRoleRequired
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const webhookUrl = process.env.NEXT_PUBLIC_PREREGISTER_WEBHOOK_URL

    if (!webhookUrl) {
      setStatus('error')
      return
    }

    setStatus('loading')

    const payload = {
      email: email.trim(),
      role,
      city: city.trim(),
      timestamp: new Date().toISOString(),
      source: getSource(),
    }

    try {
      // Aceeași convenție ca la preregistrare: text/plain evită preflight-ul
      // OPTIONS pe care Google Apps Script nu îl gestionează corect.
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => null)

      if (response.ok && data && data.success !== false) {
        setProgress(100)
        await new Promise((resolve) => setTimeout(resolve, 250))
        setStatus('idle')
        setStage('quiz')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  const handleRetry = () => {
    setStatus('idle')
  }

  if (stage === 'quiz') {
    return (
      <ValidationQuiz
        id={id}
        email={email.trim()}
        webhookUrl={process.env.NEXT_PUBLIC_PREREGISTER_WEBHOOK_URL || ''}
        onDone={() => setStage('done')}
      />
    )
  }

  if (stage === 'done') {
    return (
      <div id={id} className={styles.card}>
        <div className={styles.successBadge}>{t.form.successBadge}</div>
        <h3 className={styles.successTitle}>{t.form.successTitle}</h3>
        <p className={styles.successText}>{t.form.successText1}</p>
        <p className={styles.successText}>{t.form.successText2}</p>
      </div>
    )
  }

  return (
    <form id={id} className={styles.card} onSubmit={handleSubmit} noValidate>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="pg-email">
          {t.form.emailLabel}
        </label>
        <div className={styles.inputWrap}>
          <IconMail className={styles.inputIcon} />
          <input
            id="pg-email"
            type="email"
            className={styles.input}
            placeholder={t.form.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
        </div>
        {fieldErrors.email ? <p className={styles.fieldError}>{fieldErrors.email}</p> : null}
      </div>

      <div className={styles.row}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="pg-role">
            {t.form.roleLabel}
          </label>
          <div className={styles.inputWrap}>
            <IconUser className={styles.inputIcon} />
            <select
              id="pg-role"
              className={styles.input}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={status === 'loading'}
            >
              <option value="">{t.form.rolePlaceholder}</option>
              {ROLE_VALUES.map((r) => (
                <option key={r} value={r}>
                  {t.form.roleLabels[r]}
                </option>
              ))}
            </select>
          </div>
          {fieldErrors.role ? <p className={styles.fieldError}>{fieldErrors.role}</p> : null}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="pg-city">
            {t.form.cityLabel}
          </label>
          <div className={styles.inputWrap}>
            <IconPin className={styles.inputIcon} />
            <input
              id="pg-city"
              type="text"
              className={styles.input}
              placeholder={t.form.cityPlaceholder}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={status === 'loading'}
            />
          </div>
        </div>
      </div>

      {status === 'error' ? (
        <div className={styles.errorBox}>
          <p>{t.form.errorSubmitFailed}</p>
          <button type="button" className={styles.retryButton} onClick={handleRetry}>
            {t.form.retryButton}
          </button>
        </div>
      ) : null}

      <button type="submit" className={styles.submitButton} disabled={status === 'loading'}>
        {status === 'loading' ? t.form.submitButtonLoading : t.form.submitButton}
      </button>

      {status === 'loading' ? (
        <div
          className={styles.progressBar}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.form.submitButtonLoading}
        >
          <span className={styles.progressBarFill} style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      ) : null}
    </form>
  )
}
