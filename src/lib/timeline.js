/**
 * One shared clock for the hero reveal, so every element is positioned
 * relative to the others instead of carrying a hand-tuned delay.
 *
 * t = 0 is the moment the loader's stills hand over to the video.
 *
 *   0ms     rings fade in around the hourglass (hidden until now)
 *   100ms   R A D I A N T, one letter at a time
 *   700ms   the body copy, one line at a time
 *   1050ms  Explore Now, and with it the thumbs, the oval and the socials
 *
 * Each stage is derived from the one before it, so retiming a step shifts
 * everything after it instead of opening a hole in the sequence.
 *
 * Durations are per stage, not global. A reveal reads as "late" for two
 * separate reasons — when it starts, and how long it takes to become legible —
 * and the body copy needs to be quick on both counts to follow the wordmark
 * cleanly.
 */
export const DUR = {
  rings: 700,
  letter: 450,
  copy: 450,
  group: 480,
}

const LETTER_BASE = 100
const LETTER_STEP = 70
const LETTER_COUNT = 7

/** R A D I A N T share one run, so IANT continues RAD's count. */
export const LETTERS_IN_RAD = 3

const LAST_LETTER = LETTER_BASE + (LETTER_COUNT - 1) * LETTER_STEP

/**
 * The copy opens while the final letter is still settling. Waiting for that
 * letter's transition to finish reads as a pause, because on an ease-out curve
 * the glyph looks placed well before it technically completes.
 */
const COPY_BASE = LAST_LETTER + Math.round(DUR.letter * 0.4)
const COPY_STEP = 70
const COPY_COUNT = 5

/**
 * The button and the three supporting clusters all start together, one beat
 * after the final line of copy begins.
 */
const GROUP = COPY_BASE + (COPY_COUNT - 1) * COPY_STEP + COPY_STEP
const GROUP_STEP = 50

export const T = {
  rings: 0,
  star: 250,

  letter: (i) => LETTER_BASE + i * LETTER_STEP,
  copy: (i) => COPY_BASE + i * COPY_STEP,

  button: GROUP,
  thumb: (i) => GROUP + i * GROUP_STEP,
  oval: GROUP,
  social: (i) => GROUP + i * GROUP_STEP,
}

/**
 * The body copy's line breaks as the Figma sets them at 353px. Hard-coded
 * because the stagger is per line, and the column is a fixed width.
 */
export const COPY_LINES = [
  'Discover the allure of timeless beauty',
  'with Radiant, your gateway to exquisite',
  'jewelry that captures the essence of',
  'sophistication. Our curated collection',
  'showcases the perfect blend of allure.',
]

/**
 * The same copy as one flowing string. Tablet and mobile let it wrap naturally
 * to fill their column, so the desktop's fixed line breaks do not apply there.
 */
export const COPY_TEXT = COPY_LINES.join(' ')
