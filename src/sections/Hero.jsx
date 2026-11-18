import { useRef, useState, useCallback } from 'react'
import HeroStage from '../components/HeroStage'
import RingStack from '../components/RingStack'
import Crossfade from '../components/Crossfade'
import { T, DUR, LETTERS_IN_RAD, COPY_LINES } from '../lib/timeline'

import star from '../assets/icons/star.svg'
import chevron from '../assets/icons/chevron.svg'
import btn from '../assets/icons/btn.svg'
import socialFb from '../assets/icons/social-fb.svg'
import socialIg from '../assets/icons/social-ig.svg'
import socialPin from '../assets/icons/social-pin.svg'
import socialX from '../assets/icons/social-x.svg'

const SOCIALS = [
  { src: socialFb, label: 'Facebook' },
  { src: socialIg, label: 'Instagram' },
  { src: socialPin, label: 'Pinterest' },
  { src: socialX, label: 'X' },
]

/**
 * Geometry is driven off the Figma frame (node 3:25). The shell's content box
 * starts at the hero group's y=148, so every offset below is "Figma y minus
 * 148" and the columns reproduce the comp's vertical rhythm exactly:
 *
 *   thumbs 170 · RAD 227 (h340) · rule+copy 567 (h184) · button 794
 *   media  180 (500x687)  ·  star 148  ·  rings 408/450/491
 *   oval   173 (h72)  ·  IANT 475 (h340)  ·  socials 834
 */

/** Fades and lifts one element in at its slot on the shared timeline. */
function Reveal({ show, delay = 0, duration = DUR.group, as: Tag = 'div', className = '', style, children }) {
  return (
    <Tag
      className={[
        'transition-[opacity,transform] ease-out',
        show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      ].join(' ')}
      style={{ ...style, transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/**
 * Splits a word so each letter lands on its own beat. `offset` continues the
 * count from a previous word, which is how RAD and IANT read as one run of
 * seven letters rather than two separate animations.
 *
 * Letters are inline-block, which suppresses kerning between them — the
 * rendered width is asserted against the Figma box in the layout check.
 */
function Letters({ text, show, offset = 0 }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span
          key={i}
          className={[
            'inline-block transition-[opacity,transform] ease-out',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          ].join(' ')}
          style={{
            transitionDuration: `${DUR.letter}ms`,
            transitionDelay: `${T.letter(offset + i)}ms`,
          }}
        >
          {ch}
        </span>
      ))}
    </>
  )
}

export default function Hero({ onReady, revealed, thumbs = [], stills = [], wrist }) {
  const slotRef = useRef(null)
  const [ready, setReady] = useState(false)

  const handleReady = useCallback(() => {
    setReady(true)
    onReady?.()
  }, [onReady])

  const show = ready || revealed

  return (
    // 80px, not the Figma's 49: the client wants the hero to sit lower so the
    // gap under the nav balances the space below the hero in the viewport.
    <section className="relative pt-[80px]">
      <div className="shell relative">
        {/* Far arcs: behind the hourglass, so the shape itself hides them.
            Both ring layers stay hidden through the loader and arrive with the
            video, so the stills play inside a bare shape. */}
        <Reveal
          show={show}
          delay={T.rings}
          duration={DUR.rings}
          className="pointer-events-none absolute left-[calc(50%-243px)] top-[260px] z-[1] w-[495px]"
        >
          <RingStack />
        </Reveal>

        {/* Centre media (Figma y=180, 500x687). */}
        <div
          ref={slotRef}
          className="absolute left-[calc(50%-250px)] top-[32px] z-[2] h-[687px] w-[500px]"
        >
          <HeroStage
            slotRef={slotRef}
            sources={wrist?.sources ?? []}
            poster={wrist?.hero}
            stills={stills}
            onReady={handleReady}
          />
        </div>

        {/* Near arcs: painted over the hourglass, completing the encirclement. */}
        <Reveal
          show={show}
          delay={T.rings}
          duration={DUR.rings}
          className="pointer-events-none absolute left-[calc(50%-243px)] top-[260px] z-[3] w-[495px]"
        >
          <RingStack near />
        </Reveal>

        {/* Starburst at Figma x=973, y=148. */}
        <Reveal show={show} delay={T.star} className="absolute left-[calc(50%+217px)] top-0 z-[4]">
          <img src={star} width="62" height="65" alt="" className="star-spin" />
        </Reveal>

        <div className="relative flex items-start justify-between">
          {/* ---------- left column (Figma x=90, y=170) ---------- */}
          <div className="flex w-[379px] flex-col gap-[43px] pt-[22px]">
            <div className="flex flex-col">
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[12px]">
                  <div className="flex">
                    {thumbs.map((src, i) => (
                      <Reveal
                        key={src}
                        show={show}
                        delay={T.thumb(i)}
                        as="span"
                        className="block h-[49px] w-[41px] shrink-0 overflow-hidden rounded-full ring-2 ring-cream"
                        style={{ marginRight: i < thumbs.length - 1 ? -8 : 0 }}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </Reveal>
                    ))}
                  </div>
                  {/* the arrow closes the run */}
                  <Reveal show={show} delay={T.thumb(thumbs.length)} as="span" className="block">
                    <img src={chevron} width="12" height="20" alt="" className="rotate-90" />
                  </Reveal>
                </div>

                <h1 className="whitespace-nowrap font-display text-[200px] leading-(--leading-display) text-ink">
                  <Letters text="RAD" show={show} />
                </h1>
              </div>

              <div className="flex h-[184px] items-center gap-[21px]">
                <Reveal
                  show={show}
                  delay={T.copy(0)}
                  duration={DUR.copy}
                  as="span"
                  className="block h-full w-px shrink-0 bg-body/40"
                />
                <p className="w-[353px] text-[20px] leading-[30px] text-body">
                  {COPY_LINES.map((line, i) => (
                    <Reveal
                      key={i}
                      show={show}
                      delay={T.copy(i)}
                      duration={DUR.copy}
                      as="span"
                      className="block"
                    >
                      {line}
                    </Reveal>
                  ))}
                </p>
              </div>
            </div>

            <Reveal show={show} delay={T.button}>
              <a
                href="#"
                className="btn-explore relative inline-flex h-[73px] w-[264px] items-center justify-center"
              >
                <img src={btn} alt="" className="absolute inset-0 h-full w-full" />
                {/* Gold sheen, masked to the button's notched silhouette so the
                    highlight follows the shape instead of a plain rectangle. */}
                <span
                  aria-hidden
                  className="btn-sheen absolute inset-0"
                  style={{ maskImage: `url("${btn}")`, WebkitMaskImage: `url("${btn}")` }}
                />
                <span className="btn-label relative text-[20px] leading-[30px] text-white">
                  Explore Now
                </span>
              </a>
            </Reveal>
          </div>

          {/* ---------- right column (Figma x=973.5, y=173) ---------- */}
          <div className="flex w-[426px] flex-col items-end pt-[25px]">
            <Reveal show={show} delay={T.oval}>
              {/* Slower than the loader on purpose: a gallery, not a flicker.
                  Only starts cycling once the hero itself has revealed. */}
              <Crossfade
                images={wrist?.ovals ?? []}
                interval={2000}
                fade={800}
                start={show}
                className="h-[72px] w-[222px] rounded-[52px]"
              />
            </Reveal>

            {/* 230px clears Group 24's full height before IANT at y=475. */}
            <h1 className="mt-[230px] whitespace-nowrap font-display text-[200px] leading-(--leading-display) text-ink">
              <Letters text="IANT" show={show} offset={LETTERS_IN_RAD} />
            </h1>

            <ul className="mt-[19px] flex items-start gap-[20px]">
              {SOCIALS.map(({ src, label }, i) => (
                <Reveal key={label} show={show} delay={T.social(i)} as="li">
                  <a href="#" aria-label={label}>
                    <img src={src} width="33" height="33" alt="" />
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
