import { useState, useRef, useEffect } from 'react'
import WipeImage from '../components/WipeImage'
import useInView from '../lib/useInView'
import { hourglassD } from '../lib/hourglass'
import star from '../assets/icons/star.svg'

/**
 * REVIEW FROM / CLIENTS (Figma node 4:263), desktop.
 *
 * The portrait takes the comp's pinched frame — the same silhouette the hero
 * stage uses. The quote, the attribution and the arrows share a column on the
 * right; the arrows step through the set rather than wrapping, which is why
 * the comp draws the back one greyed out on the first slide.
 *
 * Horizontal positions are percentages of the comp's 1332px content width, as
 * in the other sections, so the composition holds at the wider shell.
 */
const PCT = (px) => `${((px / 1332) * 100).toFixed(3)}%`

const PORTRAIT_W = 476
const PORTRAIT_H = 654

/* The comp's own arrow: tail starting at the circle's left edge. */
const ARROW =
  'M0 26.5L0 27.7045L31.3182 27.7045V26.5V25.2955L0 25.2955L0 26.5ZM32.1699 27.3517C32.6403 26.8813 32.6403 26.1187 32.1699 25.6483L24.5042 17.9826C24.0338 17.5122 23.2712 17.5122 22.8008 17.9826C22.3304 18.453 22.3304 19.2157 22.8008 19.6861L29.6147 26.5L22.8008 33.3139C22.3304 33.7843 22.3304 34.547 22.8008 35.0174C23.2712 35.4878 24.0338 35.4878 24.5042 35.0174L32.1699 27.3517Z'

function StepArrow({ back = false, onClick, disabled, label, small = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`block transition-opacity duration-300 ${
        disabled ? 'pointer-events-none opacity-20' : 'cursor-pointer opacity-100'
      }`}
    >
      <svg
        width={small ? 40 : 53}
        height={small ? 40 : 53}
        viewBox="0 0 53 53"
        fill="none"
        aria-hidden
        className={back ? 'rotate-180' : undefined}
      >
        <circle cx="26.5" cy="26.5" r="26.5" fill="#1C1C1C" />
        <path d={ARROW} fill="white" />
      </svg>
    </button>
  )
}

export default function Testimonials({ items = [] }) {
  const [index, setIndex] = useState(0)
  const [ref, inView] = useInView({ rootMargin: '-10% 0px' })
  const portraitRef = useRef(null)

  useEffect(() => {
    const el = portraitRef.current
    if (!el) return
    const apply = () => {
      const { offsetWidth: w, offsetHeight: h } = el
      if (w && h) el.style.clipPath = `path("${hourglassD(w, h)}")`
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const rise = (delay, className = '', style = {}) => ({
    className: [
      'transition-[opacity,transform] duration-[800ms] ease-out',
      inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
      className,
    ].join(' '),
    style: { ...style, transitionDelay: `${delay}ms` },
  })

  const item = items[index]
  if (!item) return null

  return (
    <section ref={ref} className="relative mt-[80px] md:mt-[110px] xl:mt-[140px]">
      <div className="shell relative hidden xl:block">
        {/* headline band — the two lines step right, star off to the side */}
        <div className="relative h-[289px]">
          <h2
            {...rise(
              0,
              'absolute left-0 top-0 whitespace-nowrap font-display text-[100px] leading-(--leading-display) text-ink',
            )}
          >
            REVIEW FROM
          </h2>
          <h2
            {...rise(
              110,
              'absolute whitespace-nowrap font-display text-[100px] leading-(--leading-display) text-ink',
              { left: PCT(666), top: 119 },
            )}
          >
            CLIENTS
          </h2>
          <div {...rise(240, 'absolute', { left: PCT(1203), top: 20 })}>
            <img src={star} width="62" height="65" alt="" className="star-spin" />
          </div>
        </div>

        {/* portrait on the left, overlapping the headline band; quote right */}
        <div className="relative mt-[-60px] h-[654px]">
          <div
            className="absolute left-0 top-0"
            style={{
              width: PORTRAIT_W,
              height: PORTRAIT_H,
              clipPath: `path("${hourglassD(PORTRAIT_W, PORTRAIT_H)}")`,
            }}
          >
            <WipeImage
              key={item.image}
              src={item.image}
              alt={item.name}
              delay={120}
              className="h-full w-full"
            />
          </div>

          <div className="absolute left-1/2 right-0 top-[155px] flex flex-col gap-[45px]">
            <div key={index} className="tm-in flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[30px]">
                <span aria-hidden className="block h-px w-full bg-body/90" />
                {/* held at the comp's seven lines so the rules and the
                    arrows below them don't jump between quotes */}
                <blockquote className="flex min-h-[210px] flex-col gap-[30px] text-[20px] leading-[30px] text-body">
                  {item.quote.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </blockquote>
                <span aria-hidden className="block h-px w-full bg-body/90" />
              </div>

              <div className="flex flex-col gap-[5px]">
                <p className="text-[30px] font-medium leading-[41px] text-body">
                  {item.name}
                </p>
                <p className="text-[20px] leading-[27px] text-body/80">{item.role}</p>
              </div>
            </div>

            <div {...rise(360, 'flex gap-[50px]')}>
              <StepArrow
                back
                label="Previous review"
                disabled={index === 0}
                onClick={() => setIndex((n) => Math.max(0, n - 1))}
              />
              <StepArrow
                label="Next review"
                disabled={index === items.length - 1}
                onClick={() => setIndex((n) => Math.min(items.length - 1, n + 1))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stacked below the desktop breakpoint: the heading reads as two lines
          rather than a stagger, and the portrait sits above the quote at the
          full column width. */}
      <div className="shell xl:hidden">
        <div className="relative">
          <h2
            {...rise(
              0,
              'font-display text-[44px] leading-[1.15] text-ink md:text-[68px]',
            )}
          >
            REVIEW FROM
            <br />
            CLIENTS
          </h2>
          <div {...rise(200, 'absolute right-0 top-0')}>
            <img
              src={star}
              alt=""
              className="star-spin h-[34px] w-[32px] md:h-[48px] md:w-[46px]"
            />
          </div>
        </div>

        <div
          className="mx-auto mt-[20px] h-[28svh] max-h-[240px] md:mx-0 md:mt-[48px] md:h-auto md:max-h-none md:max-w-[420px] md:w-full"
          style={{ aspectRatio: `${PORTRAIT_W} / ${PORTRAIT_H}` }}
        >
          <div ref={portraitRef} className="h-full w-full">
            <WipeImage
              key={item.image}
              src={item.image}
              alt={item.name}
              delay={120}
              className="h-full w-full"
            />
          </div>
        </div>

        <div key={index} className="tm-in mt-[20px] flex flex-col gap-[14px] md:mt-[48px] md:gap-[18px]">
          <div className="flex flex-col gap-[14px] md:gap-[20px]">
            <span aria-hidden className="block h-px w-full bg-body/90" />
            <blockquote className="flex flex-col gap-[14px] text-[14px] leading-[20px] text-body md:gap-[20px] md:text-[20px] md:leading-[30px]">
              {item.quote.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </blockquote>
            <span aria-hidden className="block h-px w-full bg-body/90" />
          </div>

          <div className="flex flex-col gap-[3px]">
            <p className="text-[20px] font-medium leading-[26px] text-body md:text-[26px] md:leading-[30px]">
              {item.name}
            </p>
            <p className="text-[14px] leading-[20px] text-body/80 md:text-[20px] md:leading-[24px]">
              {item.role}
            </p>
          </div>
        </div>

        <div className="mt-[18px] flex gap-[28px] md:mt-[40px] md:gap-[50px]">
          <StepArrow
            back
            small
            label="Previous review"
            disabled={index === 0}
            onClick={() => setIndex((n) => Math.max(0, n - 1))}
          />
          <StepArrow
            small
            label="Next review"
            disabled={index === items.length - 1}
            onClick={() => setIndex((n) => Math.min(items.length - 1, n + 1))}
          />
        </div>
      </div>
    </section>
  )
}
