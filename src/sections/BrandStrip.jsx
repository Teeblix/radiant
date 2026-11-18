import Marquee from '../components/Marquee'
import useInView from '../lib/useInView'
import useMediaQuery from '../lib/useMediaQuery'

/**
 * The crossed bands from Figma (node 3:232).
 *
 * Two full-bleed bands tilted against each other: a white one carrying the
 * category names in outlined display type, and the dark one in front carrying
 * the brands. They travel in opposite directions, which is what makes the
 * crossing read.
 *
 * Band geometry is the comp's: 152.9px tall, +4.56deg and -5deg. The bands are
 * over-wide so their corners stay off-screen once rotated.
 *
 * The brand names are set in the site's own display face rather than each
 * house's logotype — these are third-party marks, and reproducing their
 * lettering is not something to fabricate.
 */
const CATEGORIES = ['NECKLACES', 'BRACELETS', 'RINGS', 'EARRINGS']

const BRANDS = [
  'CARTIER',
  'BVLGARI',
  'PANDORA',
  'CHOPARD',
  'TIFFANY',
  'BOUCHERON',
  'MESSIKA',
  'MIKIMOTO',
]

export default function BrandStrip() {
  // Held until the page is actually scrolled, not merely until it fits.
  const [ref, inView] = useInView({ requireScroll: true })
  // Item spacing scales with the type, so the rhythm stays even rather than
  // leaving desktop-sized gaps between phone-sized words.
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const isTablet = useMediaQuery('(min-width: 768px)')
  const gapCat = isDesktop ? 90 : isTablet ? 64 : 44
  const gapBrand = isDesktop ? 110 : isTablet ? 76 : 52

  return (
    <section
      ref={ref}
      className={[
        'relative mt-[64px] h-[210px] overflow-hidden md:mt-[80px] md:h-[268px] xl:mt-[100px] xl:h-[326px]',
        'transition-[opacity,transform] duration-[900ms] ease-out',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      ].join(' ')}
      aria-label="Brands and categories"
    >
      {/* white band — categories, travelling right to left.
          The tilt steepens as the viewport narrows: a band's vertical sweep is
          its width x sin(angle), so at the comp's 5deg a phone-width band
          barely rises and the two bands end up lying on top of each other. */}
      <div className="absolute left-1/2 top-[52px] h-[78px] w-[150vw] -translate-x-1/2 rotate-[9deg] bg-white md:top-[66px] md:h-[112px] md:rotate-[6.5deg] xl:top-[86px] xl:h-[153px] xl:rotate-[4.56deg]">
        <Marquee
          items={CATEGORIES}
          speed={46}
          reverse
          gap={gapCat}
          className="h-full items-center"
          renderItem={(label) => (
            <span className="band-outline font-display text-[46px] leading-none whitespace-nowrap md:text-[72px] xl:text-[105px]">
              {label}
            </span>
          )}
        />
      </div>

      {/* dark band — brands, travelling left to right */}
      <div className="absolute left-1/2 top-[84px] h-[78px] w-[150vw] -translate-x-1/2 -rotate-[9.5deg] bg-ink md:top-[104px] md:h-[112px] md:-rotate-[7deg] xl:top-[106px] xl:h-[153px] xl:-rotate-5">
        <Marquee
          items={BRANDS}
          speed={52}
          gap={gapBrand}
          className="h-full items-center"
          renderItem={(label) => (
            <span className="font-display text-[24px] leading-none tracking-[0.06em] whitespace-nowrap text-white md:text-[36px] xl:text-[52px]">
              {label}
            </span>
          )}
        />
      </div>
    </section>
  )
}
