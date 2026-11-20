import { useState, useCallback } from 'react'
import 'lenis/dist/lenis.css'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import HeroStacked from './sections/HeroStacked'
import BrandStrip from './sections/BrandStrip'
import SummerCollection from './sections/SummerCollection'
import Worldwide from './sections/Worldwide'
import CollectionsGrid from './sections/CollectionsGrid'
import Testimonials from './sections/Testimonials'
import Footer from './sections/Footer'
import useSmoothScroll from './lib/useSmoothScroll'
import useMediaQuery from './lib/useMediaQuery'

/**
 * The clip Higgsfield returns is HEVC 10-bit, which only Safari reliably
 * decodes, so it is never served directly. These two are transcoded from it:
 * VP9 for browsers that take it, H.264 as the universal fallback.
 * An empty `sources` makes the stage fall back to the poster.
 */
const HERO_MEDIA = {
  hero: '/media/hero-poster.webp',
  sources: [
    { src: '/media/hero.webm', type: 'video/webm; codecs="vp9"' },
    { src: '/media/hero-h264.mp4', type: 'video/mp4; codecs="avc1.640028"' },
  ],
  ovals: [1, 2, 3, 4, 5, 6].map((n) => `/media/oval-${n}.webp`),
}

const THUMBS = [1, 2, 3, 4, 5].map((n) => `/media/thumb-${n}.webp`)

/** Campaign frames the loader cuts through inside the hourglass. */
const STILLS = [1, 2, 3, 4, 5, 6].map((n) => `/media/still-${n}.webp`)

/** Summer Collection product photography. */
const COLLECTION_IMAGES = {
  left: '/media/collection-left.webp',
  right: '/media/collection-right.webp',
}

/** Collections Grid — four images per tab category. */
const GRID_IMAGES = {
  Necklaces: [
    '/media/grid-neck-1.webp',
    '/media/grid-neck-2.webp',
    '/media/grid-neck-3.webp',
    '/media/grid-neck-4.webp',
  ],
  Bracelets: [
    '/media/grid-brace-1.webp',
    '/media/grid-brace-2.webp',
    '/media/grid-brace-3.webp',
    '/media/grid-brace-4.webp',
  ],
  Rings: [
    '/media/grid-ring-1.webp',
    '/media/grid-ring-2.webp',
    '/media/grid-ring-3.webp',
    '/media/grid-ring-4.webp',
  ],
  Earrings: [
    '/media/grid-ear-1.webp',
    '/media/grid-ear-2.webp',
    '/media/grid-ear-3.webp',
    '/media/grid-ear-4.webp',
  ],
}

/** Client reviews. The first is the comp's own; the arrows step through all three. */
const TESTIMONIALS = [
  {
    name: 'Emma Thompson',
    role: 'Fashion Stylist',
    image: '/media/client-1.webp',
    quote: [
      "I recently purchased the Stellar Luminescence Necklace from Radiant, and it's pure perfection! The delicate crescent moon pendant with sparkling diamonds is a showstopper. Elegant, versatile, and beautifully crafted\u2014this necklace is now my go-to for any occasion.",
      "Radiant's service was top-notch, and the 18K gold adds a touch of luxury. Highly recommend for those seeking timeless beauty in jewelry.",
    ],
  },
  {
    name: 'Amara Okafor',
    role: 'Creative Director',
    image: '/media/client-2.webp',
    quote: [
      'The sculptural hoops arrived in packaging so considered I almost kept the box on display. They have the weight of something made rather than manufactured, and they have not left my ears since.',
      'What I value most is the restraint. Nothing here is shouting, and that is exactly why it works with everything I own.',
    ],
  },
  {
    name: 'Mei Lin Chen',
    role: 'Art Curator',
    image: '/media/client-3.webp',
    quote: [
      'I came for a single stacking ring and left with three, which tells you something about how well they sit together. The finish is quiet and warm, and the proportions are genuinely considered.',
      'Months on, the gold has held beautifully. Radiant understands that the best pieces are the ones you stop noticing you are wearing.',
    ],
  },
]

/** "We provide the best products worldwide" photography. */
const WORLDWIDE_IMAGES = {
  pill: '/media/worldwide-pill.webp',
  setA: [1, 2, 3].map((n) => `/media/ww-a-${n}.webp`),
  setB: [1, 2, 3].map((n) => `/media/ww-b-${n}.webp`),
}

/** Panels behind the tablet/mobile menu, cropped to each layout's aspect. */
const MENU_IMAGES = {
  tablet: [1, 2, 3, 4, 5, 6].map((n) => `/media/menu-t-${n}.webp`),
  mobile: [1, 2, 3, 4, 5, 6].map((n) => `/media/menu-m-${n}.webp`),
}

export default function App() {
  useSmoothScroll()
  // Mount one hero, not both: each owns a video and a loader timeline, so
  // hiding one with CSS would still fetch its media and run its timers.
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const [revealed, setRevealed] = useState(false)
  const handleReady = useCallback(() => setRevealed(true), [])

  const heroProps = {
    onReady: handleReady,
    revealed,
    thumbs: THUMBS,
    stills: STILLS,
    wrist: HERO_MEDIA,
  }

  return (
    <>
      <Nav revealed={revealed} menuImages={MENU_IMAGES} />
      <main>
        {isDesktop ? <Hero {...heroProps} /> : <HeroStacked {...heroProps} />}
        <BrandStrip />
        <SummerCollection images={COLLECTION_IMAGES} />
        <Worldwide images={WORLDWIDE_IMAGES} />
        <CollectionsGrid images={GRID_IMAGES} />
        <Testimonials items={TESTIMONIALS} />
      </main>
      <Footer />
    </>
  )
}
