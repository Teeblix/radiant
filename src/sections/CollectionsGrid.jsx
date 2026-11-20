import { useState } from 'react'
import WipeImage from '../components/WipeImage'
import useInView from '../lib/useInView'
import btn from '../assets/icons/btn.svg'

const TABS = ['Necklaces', 'Bracelets', 'Rings', 'Earrings']

/* Figma "Vector 4" verbatim. In the comp it is placed at x:0, w:1515.5 on a
   1512 artboard — it already runs edge to edge, so it is drawn at 100vw and
   never extended. The cream gap is this same path stroked at 152 — one
   stroke, so the ribbon keeps a constant width and cannot form a corner at
   the screen edge. The path swings 136.5 vertically, so the ribbon has to be
   wider than that swing: anything thinner leaves the rows' own straight edges
   showing wherever the wave runs far from the gap. */
const WAVE =
  'M0.763949 0.645277C87.7639 103.645 420.264 195.645 749.264 88.1453C1086.14 -21.9273 1392.26 100.645 1516.26 137.145'

const STAR =
  'M30.9093 0L36.8548 14.2017L50.0124 6.20695L46.4748 21.191L61.8187 22.4569L50.1493 32.5L61.8187 42.5431L46.4748 43.809L50.0124 58.7931L36.8548 50.7983L30.9093 65L24.9638 50.7983L11.8063 58.7931L15.3438 43.809L0 42.5431L11.6693 32.5L0 22.4569L15.3438 21.191L11.8063 6.20695L24.9638 14.2017L30.9093 0Z'

export default function CollectionsGrid({ images }) {
  const [activeTab, setActiveTab] = useState(0)
  const [ref, inView] = useInView({ rootMargin: '-10% 0px' })

  const rise = (delay, className = '', style = {}) => ({
    className: [
      'transition-[opacity,transform] duration-[800ms] ease-out',
      inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
      className,
    ].join(' '),
    style: { ...style, transitionDelay: `${delay}ms` },
  })

  const set = images?.[TABS[activeTab]] ?? images?.[TABS[0]] ?? []

  const exploreAll = (
    <a
      href="#"
      {...rise(
        240,
        'btn-explore relative inline-flex h-[73px] w-[264px] items-center justify-center',
      )}
    >
      <img src={btn} alt="" className="absolute inset-0 h-full w-full" />
      <span
        aria-hidden
        className="btn-sheen absolute inset-0"
        style={{ maskImage: `url("${btn}")`, WebkitMaskImage: `url("${btn}")` }}
      />
      <span className="relative text-[20px] leading-[30px] text-white">Explore All</span>
    </a>
  )

  return (
    <section ref={ref} className="relative mt-[80px] overflow-x-clip md:mt-[110px] xl:mt-[140px]">
      <div className="shell">
        {/* Explore All sits beside the tabs as soon as there is room; on a
            phone that row would crowd them, so it moves under the grid and the
            tabs take the full width instead. One definition, two slots. */}
        <div className="flex items-center justify-between gap-[24px]">
          <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-[48px] xl:gap-[90px]">
            {TABS.map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                {...rise(
                  i * 60,
                  `tab-line cursor-pointer text-[14px] leading-none text-body md:text-[18px] xl:text-[25px]${i === activeTab ? ' is-active' : ''}`,
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="hidden shrink-0 md:block">{exploreAll}</div>
        </div>

        {/* The rows very nearly touch — the ribbon, not the gap, is what reads
            as the space between them, and it cuts both edges into waves. Gap
            and crop are in the wave's own units so they track it as the
            viewport changes. */}
        <div key={activeTab} className="relative mt-[40px] flex gap-x-[12px] md:mt-[64px] md:gap-x-[32px] xl:mt-[100px]">
          <div className="flex flex-1 flex-col gap-y-[0.5275vw]">
            <WipeImage src={set[0]} delay={120} className="aspect-square md:aspect-[650/488]" />
            <WipeImage src={set[2]} delay={340} className="aspect-square md:aspect-[650/488]" />
          </div>
          <div className="flex flex-1 flex-col gap-y-[0.5275vw]">
            <WipeImage src={set[1]} delay={200} className="aspect-square md:aspect-[650/488]" />
            <WipeImage src={set[3]} delay={400} className="aspect-square md:aspect-[650/488]" />
          </div>

          {/* Both rows are the same height, so the grid's centre is the gap's
              centre; the viewBox is centred on the path's own y-range (68.9)
              so the ribbon lands there. */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 w-[100vw] -translate-x-1/2 -translate-y-1/2">
            <svg
              viewBox="0 -80 1516.55 298"
              className={`w-full${inView ? ' wave-wipe' : ''}`}
              style={{ display: 'block', clipPath: 'inset(0 100% 0 0)' }}
            >
              <path
                d={WAVE}
                stroke="var(--color-cream)"
                strokeWidth="152"
                strokeLinecap="square"
                fill="none"
              />
              <path
                d={WAVE}
                stroke="#4C4C4C"
                strokeWidth="2"
                strokeLinecap="square"
                fill="none"
              />
              <path
                d={WAVE}
                stroke="white"
                strokeOpacity="0.35"
                strokeWidth="2"
                strokeLinecap="square"
                fill="none"
              />

              {/* The comp sits the star on the curve where its two halves meet. */}
              <g
                transform="translate(749.264 88.1453)"
                className={inView ? 'star-in' : ''}
                style={{ opacity: 0 }}
              >
                <g className="star-spin" style={{ transformOrigin: '0px 0px' }}>
                  <path
                    d={STAR}
                    fill="#1C1C1C"
                    transform="scale(0.5538) translate(-30.9093 -32.5)"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="mt-[34px] md:hidden">{exploreAll}</div>
      </div>
    </section>
  )
}
