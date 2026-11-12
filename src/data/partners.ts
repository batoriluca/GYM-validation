// Real studios, artists and producers already using or committed to
// GrowYourMusic. The "Already building with us" strip on the landing page
// renders only when this list has entries, so nothing placeholder ever ships.
//
// Example:
//   { name: 'Real Studio Name', kind: 'Recording studio · Bucharest', logo: '/partners/real-studio.svg' },
// `logo` is optional; without it the name is set as a typographic wordmark.

export type Partner = {
  name: string
  kind: string
  logo?: string
}

export const PARTNERS: Partner[] = []
