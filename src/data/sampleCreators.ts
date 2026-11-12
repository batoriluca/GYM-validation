// The made-up creators used in the social render routes (/carousel, /story,
// /story-card). The landing feature cards show no people at all: no names,
// handles or profile pictures.
//
// They are invented on purpose: no real person's name, face or brand. Each
// name was web-checked (Nov 2026) for known artists, studios or brands with
// the same name before use.
//
// Rules for adding one: invent a stage name or studio name and search it
// first. Never use a real person's name, photo or likeness here, and never
// present these as real users or reviews.

export type SampleCreator = {
  name: string
  handle: string
}

export const CREATORS = {
  nyx: { name: 'Nyx Aurel', handle: 'nyxaurel' },
  tavi: { name: 'Tavi Lumen', handle: 'tavilumen' },
  sora: { name: 'Sora Vey', handle: 'soravey' },
  dorin: { name: 'Dorin Kale', handle: 'dorinkale' },
  cellar: { name: 'Cellar Nine Studio', handle: 'cellarnine' },
  opal: { name: 'Opal Frame Visuals', handle: 'opalframe' },
  ilva: { name: 'Ilva Moreno', handle: 'ilvamoreno' },
} satisfies Record<string, SampleCreator>

export type CreatorKey = keyof typeof CREATORS

// A studio (a place, not a person) used in the booking/wallet mockups.
export const SAMPLE_STUDIO = 'Studio Ferro'
