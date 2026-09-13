'use client'

import { useEffect, useMemo, useState } from 'react'
import formStyles from './PreregisterForm.module.css'
import styles from './ValidationQuiz.module.css'
import { useLanguage } from '@/i18n/LanguageContext'
import { FEATURE_VALUES, FREQUENCY_VALUES, PRICE_VALUES } from '@/i18n/translations'
import { supabase } from '@/lib/supabaseClient'

type StepId =
  | 'current_process'
  | 'biggest_pain'
  | 'has_paid'
  | 'paid_amount'
  | 'frequency'
  | 'top_features'
  | 'would_pay'
  | 'price_range'
  | 'concerns'

const ALL_STEPS: StepId[] = [
  'current_process',
  'biggest_pain',
  'has_paid',
  'paid_amount',
  'frequency',
  'top_features',
  'would_pay',
  'price_range',
  'concerns',
]

type Answers = {
  current_process: string
  biggest_pain: string
  has_paid: '' | 'Da' | 'Nu'
  paid_amount: string
  frequency: '' | (typeof FREQUENCY_VALUES)[number]
  top_features: string[]
  would_pay: '' | 'Da' | 'Nu' | 'Depinde'
  price_range: '' | (typeof PRICE_VALUES)[number]
  concerns: string
}

const INITIAL_ANSWERS: Answers = {
  current_process: '',
  biggest_pain: '',
  has_paid: '',
  paid_amount: '',
  frequency: '',
  top_features: [],
  would_pay: '',
  price_range: '',
  concerns: '',
}

function isStepValid(id: StepId, answers: Answers): boolean {
  switch (id) {
    case 'has_paid':
      return answers.has_paid !== ''
    case 'paid_amount':
      return answers.paid_amount.trim() !== ''
    case 'frequency':
      return answers.frequency !== ''
    case 'top_features':
      return answers.top_features.length > 0
    case 'would_pay':
      return answers.would_pay !== ''
    case 'price_range':
      return answers.price_range !== ''
    default:
      return true
  }
}

export default function ValidationQuiz({
  id,
  email,
  onDone,
}: {
  id?: string
  email: string
  onDone: () => void
}) {
  const { t } = useLanguage()
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS)
  const [stepIndex, setStepIndex] = useState(0)
  const [sending, setSending] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!sending) return

    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + (90 - p) * 0.1))
    }, 150)

    return () => clearInterval(interval)
  }, [sending])

  const visibleSteps = useMemo(() => {
    return ALL_STEPS.filter((stepId) => {
      if (stepId === 'paid_amount') return answers.has_paid === 'Da'
      if (stepId === 'price_range') return answers.would_pay !== '' && answers.would_pay !== 'Nu'
      return true
    })
  }, [answers.has_paid, answers.would_pay])

  const currentStepId = visibleSteps[stepIndex]
  const isLastStep = stepIndex === visibleSteps.length - 1
  const canContinue = isStepValid(currentStepId, answers)

  const updateAnswer = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFeature = (feature: string) => {
    setAnswers((prev) => {
      const isSelected = prev.top_features.includes(feature)
      return {
        ...prev,
        top_features: isSelected
          ? prev.top_features.filter((f) => f !== feature)
          : [...prev.top_features, feature],
      }
    })
  }

  const submit = async () => {
    setSending(true)

    const payload = {
      email,
      current_process: answers.current_process.trim() || null,
      biggest_pain: answers.biggest_pain.trim() || null,
      has_paid: answers.has_paid || null,
      paid_amount: answers.has_paid === 'Da' ? answers.paid_amount.trim() || null : null,
      frequency: answers.frequency || null,
      top_features: answers.top_features,
      would_pay: answers.would_pay || null,
      price_range: answers.would_pay !== 'Nu' ? answers.price_range || null : null,
      concerns: answers.concerns.trim() || null,
    }

    try {
      // Chestionarul e opțional, nu blocăm confirmarea finală dacă trimiterea eșuează.
      await supabase.from('quiz_responses').insert(payload)
    } catch (err) {
      // ignorat intenționat
    }

    setProgress(100)
    await new Promise((resolve) => setTimeout(resolve, 250))
    setSending(false)
    onDone()
  }

  const handleNext = () => {
    if (!canContinue) return
    if (isLastStep) {
      submit()
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  const handleBack = () => {
    setStepIndex((i) => Math.max(0, i - 1))
  }

  const handleSkip = () => {
    if (isLastStep) {
      submit()
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  return (
    <div id={id} className={formStyles.card}>
      <div className={styles.header}>
        <div className={styles.progressWrap}>
          <span className={styles.progressLabel}>
            {t.quiz.stepLabel(stepIndex + 1, visibleSteps.length)}
          </span>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ transform: `scaleX(${(stepIndex + 1) / visibleSteps.length})` }}
            />
          </div>
        </div>
      </div>

      {currentStepId === 'current_process' ? (
        <div className={formStyles.fieldGroup}>
          <p className={styles.question}>{t.quiz.questions.current_process}</p>
          <input
            type="text"
            className={formStyles.input}
            placeholder={t.quiz.optionalPlaceholder}
            value={answers.current_process}
            onChange={(e) => updateAnswer('current_process', e.target.value)}
          />
        </div>
      ) : null}

      {currentStepId === 'biggest_pain' ? (
        <div className={formStyles.fieldGroup}>
          <p className={styles.question}>{t.quiz.questions.biggest_pain}</p>
          <input
            type="text"
            className={formStyles.input}
            placeholder={t.quiz.optionalPlaceholder}
            value={answers.biggest_pain}
            onChange={(e) => updateAnswer('biggest_pain', e.target.value)}
          />
        </div>
      ) : null}

      {currentStepId === 'has_paid' ? (
        <div className={formStyles.fieldGroup}>
          <p className={styles.question}>{t.quiz.questions.has_paid}</p>
          <div className={styles.optionsGroup}>
            {(['Da', 'Nu'] as const).map((option) => (
              <label
                key={option}
                className={`${styles.optionRow} ${answers.has_paid === option ? styles.optionRowSelected : ''}`}
              >
                <input
                  type="radio"
                  className={styles.optionInput}
                  name="has_paid"
                  checked={answers.has_paid === option}
                  onChange={() => updateAnswer('has_paid', option)}
                />
                {t.quiz.yesNoLabels[option]}
              </label>
            ))}
          </div>
        </div>
      ) : null}

      {currentStepId === 'paid_amount' ? (
        <div className={formStyles.fieldGroup}>
          <p className={styles.question}>{t.quiz.questions.paid_amount}</p>
          <input
            type="text"
            className={formStyles.input}
            placeholder={t.quiz.paidAmountPlaceholder}
            value={answers.paid_amount}
            onChange={(e) => updateAnswer('paid_amount', e.target.value)}
          />
        </div>
      ) : null}

      {currentStepId === 'frequency' ? (
        <div className={formStyles.fieldGroup}>
          <p className={styles.question}>{t.quiz.questions.frequency}</p>
          <div className={styles.optionsGroup}>
            {FREQUENCY_VALUES.map((option) => (
              <label
                key={option}
                className={`${styles.optionRow} ${answers.frequency === option ? styles.optionRowSelected : ''}`}
              >
                <input
                  type="radio"
                  className={styles.optionInput}
                  name="frequency"
                  checked={answers.frequency === option}
                  onChange={() => updateAnswer('frequency', option)}
                />
                {t.quiz.frequencyLabels[option]}
              </label>
            ))}
          </div>
        </div>
      ) : null}

      {currentStepId === 'top_features' ? (
        <div className={formStyles.fieldGroup}>
          <p className={styles.question}>{t.quiz.questions.top_features}</p>
          <div className={styles.optionsGroup}>
            {FEATURE_VALUES.map((option) => (
              <label
                key={option}
                className={`${styles.optionRow} ${
                  answers.top_features.includes(option) ? styles.optionRowSelected : ''
                }`}
              >
                <input
                  type="checkbox"
                  className={styles.optionInput}
                  checked={answers.top_features.includes(option)}
                  onChange={() => toggleFeature(option)}
                />
                {t.quiz.featureLabels[option]}
              </label>
            ))}
          </div>
        </div>
      ) : null}

      {currentStepId === 'would_pay' ? (
        <div className={formStyles.fieldGroup}>
          <p className={styles.question}>{t.quiz.questions.would_pay}</p>
          <div className={styles.optionsGroup}>
            {(['Da', 'Nu', 'Depinde'] as const).map((option) => (
              <label
                key={option}
                className={`${styles.optionRow} ${answers.would_pay === option ? styles.optionRowSelected : ''}`}
              >
                <input
                  type="radio"
                  className={styles.optionInput}
                  name="would_pay"
                  checked={answers.would_pay === option}
                  onChange={() => updateAnswer('would_pay', option)}
                />
                {t.quiz.yesNoMaybeLabels[option]}
              </label>
            ))}
          </div>
        </div>
      ) : null}

      {currentStepId === 'price_range' ? (
        <div className={formStyles.fieldGroup}>
          <p className={styles.question}>{t.quiz.questions.price_range}</p>
          <div className={styles.optionsGroup}>
            {PRICE_VALUES.map((option) => (
              <label
                key={option}
                className={`${styles.optionRow} ${answers.price_range === option ? styles.optionRowSelected : ''}`}
              >
                <input
                  type="radio"
                  className={styles.optionInput}
                  name="price_range"
                  checked={answers.price_range === option}
                  onChange={() => updateAnswer('price_range', option)}
                />
                {t.quiz.priceLabels[option]}
              </label>
            ))}
          </div>
        </div>
      ) : null}

      {currentStepId === 'concerns' ? (
        <div className={formStyles.fieldGroup}>
          <p className={styles.question}>{t.quiz.questions.concerns}</p>
          <input
            type="text"
            className={formStyles.input}
            placeholder={t.quiz.optionalPlaceholder}
            value={answers.concerns}
            onChange={(e) => updateAnswer('concerns', e.target.value)}
          />
        </div>
      ) : null}

      <div className={styles.navRow}>
        {stepIndex > 0 ? (
          <button type="button" className={styles.backButton} onClick={handleBack} disabled={sending}>
            {t.quiz.backButton}
          </button>
        ) : (
          <span className={styles.spacer} />
        )}
        <div className={styles.navRight}>
          <button type="button" className={styles.skipButton} onClick={handleSkip} disabled={sending}>
            {t.quiz.skipButton}
          </button>
          <button
            type="button"
            className={formStyles.submitButton}
            onClick={handleNext}
            disabled={!canContinue || sending}
          >
            {sending ? t.quiz.sendingButton : isLastStep ? t.quiz.submitButton : t.quiz.continueButton}
          </button>
        </div>
      </div>

      {sending ? (
        <div
          className={formStyles.progressBar}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.quiz.sendingButton}
        >
          <span className={formStyles.progressBarFill} style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      ) : null}
    </div>
  )
}
