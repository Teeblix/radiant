import { useState } from 'react'
import MenuOverlay, { MenuGlyph } from '../components/MenuOverlay'
import search from '../assets/icons/search.svg'
import bag from '../assets/icons/bag.svg'
import user from '../assets/icons/user.svg'

const LINKS = [
  { label: 'Home', active: true },
  { label: 'About' },
  { label: 'Collections' },
  { label: 'Testimonials' },
]

/** Thin vertical rule between the utility icons (Line 2 in Figma, 22px tall). */
function Divider() {
  return <span aria-hidden className="h-[22px] w-px bg-body/40" />
}

/**
 * Desktop keeps the inline links. Below 1280 the comp collapses to a wordmark,
 * a search icon and a Menu toggle, with the links moving into a full-screen
 * panel (Figma 15:1878 / 15:1970).
 *
 * Gutters follow the comp: 24px on tablet and mobile, 90px on desktop via the
 * shared shell.
 */
export default function Nav({ revealed, menuImages }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header
        className={[
          'pt-[30px] transition-[opacity,transform] duration-700 ease-out',
          revealed ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
        ].join(' ')}
      >
        <div className="shell">
          <div className="flex flex-col items-end gap-[17px]">
            <div className="flex h-[51px] w-full items-center justify-between text-body">
              <div className="flex items-center xl:gap-[100px]">
                <a href="#" className="font-display text-[30px] leading-none">
                  RADIANT
                </a>

                {/* desktop links */}
                <nav className="hidden xl:block">
                  <ul className="flex items-center gap-[40px] text-[18px]">
                    {LINKS.map(({ label, active }) => (
                      <li key={label}>
                        {/* Every label is regular weight; the rule under it is
                            what marks the current page, and it grows on hover. */}
                        <a href="#" className="group inline-block font-normal">
                          {label}
                          <span
                            className={[
                              // same slack correction, scaled to 18px type
                              '-mt-[4px] block h-px w-[30%] origin-left bg-body',
                              'transition-transform duration-400 ease-out',
                              active ? 'scale-x-100' : 'scale-x-0',
                              'group-hover:scale-x-100',
                            ].join(' ')}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* desktop utilities */}
              <div className="hidden items-center gap-[15px] xl:flex">
                <button type="button" aria-label="Search" className="cursor-pointer">
                  <img src={search} width="19" height="19" alt="" />
                </button>
                <Divider />
                <button type="button" aria-label="Cart" className="cursor-pointer">
                  <img src={bag} width="19" height="21" alt="" />
                </button>
                <Divider />
                <a href="#" className="flex items-center gap-[6px] text-[18px]">
                  <img src={user} width="18" height="19" alt="" />
                  Sign Up
                </a>
              </div>

              {/* tablet + mobile: search and the Menu toggle */}
              <div className="flex items-center gap-[13px] xl:hidden">
                <button type="button" aria-label="Search" className="cursor-pointer">
                  <img src={search} width="14" height="14" alt="" />
                </button>
                <Divider />
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-expanded={open}
                  aria-controls="site-menu"
                  className="flex cursor-pointer items-center gap-[8px] text-[18px]"
                >
                  Menu
                  <MenuGlyph open={false} />
                </button>
              </div>
            </div>

            <span aria-hidden className="h-px w-full bg-body/30" />
          </div>
        </div>
      </header>

      <MenuOverlay
        open={open}
        onClose={() => setOpen(false)}
        tabletImages={menuImages?.tablet ?? []}
        mobileImages={menuImages?.mobile ?? []}
      />
    </>
  )
}
