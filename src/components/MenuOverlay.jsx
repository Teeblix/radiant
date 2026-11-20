import { useEffect, useRef } from 'react'
import useMediaQuery from '../lib/useMediaQuery'
import Crossfade from './Crossfade'
import bag from '../assets/icons/bag.svg'
import user from '../assets/icons/user.svg'

/**
 * The full-screen menu for tablet and mobile (Figma nodes 15:1928 / 15:2456).
 *
 * The header repeats Nav's bar exactly — same shell gutters, top padding, bar
 * height, wordmark size and gap above the rule — so nothing moves when the
 * panel opens over it. Those values live in both files and must change
 * together.
 *
 * Tablet carries three image panels, mobile one. Each panel runs its own
 * crossfade on a different interval and starts on a different frame, so they
 * drift apart instead of changing in lockstep.
 */
const LINKS = [
  { label: 'Home', href: '/#' },
  { label: 'About', href: '/about' },
  { label: 'Collections', href: '/#collections' },
  { label: 'Testimonials', href: '/#testimonials' },
]

/** Different intervals and offsets per panel — never in sync. */
const PANELS = [
  { interval: 2600, startIndex: 0 },
  { interval: 3400, startIndex: 3 },
  { interval: 4100, startIndex: 5 },
]

export default function MenuOverlay({ open, onClose, tabletImages = [], mobileImages = [] }) {
  const panelRef = useRef(null)
  // Mount one set: `hidden` still downloads, and the tablet layout holds
  // three panels' worth of frames.
  const isTablet = useMediaQuery('(min-width: 768px)')

  // Lock the page behind the panel, and let Escape close it.
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      ref={panelRef}
      id="site-menu"
      aria-hidden={!open}
      className={[
        'fixed inset-0 z-[100] bg-ink text-white xl:hidden',
        'transition-[opacity,visibility] duration-500 ease-out',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      ].join(' ')}
    >
      <div className="flex h-full flex-col pt-[18px] md:pt-[30px]">
        {/* The Nav sits above the overlay (z-110 > z-100) and handles the
            toggle, so this header only provides vertical spacing. */}
        <div className="shell shrink-0" aria-hidden>
          <div className="h-[40px] md:h-[51px]" />
          <div className="mt-[12px] h-px md:mt-[17px]" />
        </div>

        {/* body */}
        <div className="shell flex min-h-0 flex-1 flex-col pt-[44px] md:flex-row md:justify-between md:pt-[64px]">
          <nav className="flex flex-col md:h-full md:pb-[24px]">
            <ul>
              {LINKS.map(({ label, href }, i) => (
                <li
                  key={label}
                  className={[
                    'transition-[opacity,transform] duration-500 ease-out',
                    open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                  ].join(' ')}
                  style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
                >
                  <a
                    href={href}
                    onClick={onClose}
                    className="group inline-block py-[20px] text-[40px] leading-none"
                  >
                    {label}
                    <span
                      className={[
                        // The line box already carries ~4.5px of descender
                        // slack below the ink, so the margin goes negative to
                        // land a true ~3px gap under the lettering.
                        '-mt-[3px] block h-px w-[30%] origin-left bg-white',
                        'transition-transform duration-500 ease-out',
                        i === 0 ? 'scale-x-100' : 'scale-x-0',
                        'group-hover:scale-x-100',
                      ].join(' ')}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* account row */}
            <div
              className={[
                'mt-[48px] flex items-center gap-[15px] md:mt-auto',
                'transition-[opacity,transform] duration-500 ease-out',
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
              ].join(' ')}
              style={{ transitionDelay: open ? '420ms' : '0ms' }}
            >
              <img src={bag} width="18" height="20" alt="" className="invert" />
              <span aria-hidden className="h-[22px] w-px bg-white/35" />
              <a href="#" className="flex items-center gap-[6px] text-[18px]">
                <img src={user} width="18" height="19" alt="" className="invert" />
                Sign Up
              </a>
            </div>
          </nav>

          {/* image panels — three on tablet, one on mobile */}
          {/* explicit width on tablet: with flex-none and w-full children there is
                no intrinsic width to resolve, and the column collapses to 0 */}
          <div className="mt-[32px] min-h-0 flex-1 pb-[24px] md:mt-0 md:w-[314px] md:flex-none">
            {/* mobile: a single panel */}
            {!isTablet && (
            <div
              className={[
                'h-full transition-[opacity,transform] duration-[700ms] ease-out',
                open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
              ].join(' ')}
              style={{ transitionDelay: open ? '320ms' : '0ms' }}
            >
              <Crossfade
                images={mobileImages}
                interval={2600}
                fade={900}
                start={open}
                className="h-full w-full"
              />
            </div>
            )}

            {/* tablet: three panels sliding down one after the other */}
            {isTablet && (
            <div className="flex h-full flex-col gap-[4px]">
              {PANELS.map(({ interval, startIndex }, i) => (
                <div
                  key={i}
                  className={[
                    'min-h-0 flex-1 transition-[opacity,transform] duration-[700ms] ease-out',
                    open ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0',
                  ].join(' ')}
                  style={{ transitionDelay: open ? `${260 + i * 130}ms` : '0ms' }}
                >
                  <Crossfade
                    images={tabletImages}
                    interval={interval}
                    fade={900}
                    start={open}
                    startIndex={startIndex}
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Three rules that fold into a cross. The middle bar fades while the outer two
 * travel to the centre and rotate, so it reads as one object changing state
 * rather than two icons swapping.
 */
export function MenuGlyph({ open }) {
  const bar = 'absolute left-0 block h-px w-[16px] bg-current transition-all duration-400 ease-out'
  return (
    <span aria-hidden className="relative block h-[13px] w-[16px]">
      <span className={`${bar} ${open ? 'top-[6px] rotate-45' : 'top-[2px] rotate-0'}`} />
      <span className={`${bar} top-[6px] ${open ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`${bar} ${open ? 'top-[6px] -rotate-45' : 'top-[11px] rotate-0'}`} />
    </span>
  )
}
