import { useRef, useState, useCallback } from 'react'
import HeroStage from '../components/HeroStage'
import Crossfade from '../components/Crossfade'
import { T, DUR, COPY_TEXT } from '../lib/timeline'

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
 * Hero for tablet and mobile (Figma 15:959 and 15:2044).
 *
 * The comp restructures rather than just reflowing, which is why this is its
 * own component instead of breakpoints bolted onto the desktop hero:
 *
 *   - RADIANT is one word, not split around the image
 *   - the wire loops and starburst are dropped
 *
 * The comp draws the media as a plain rounded rectangle here, but the client
 * wants the hourglass carried across every breakpoint. The silhouette is
 * normalised 0..1, so it fits the smaller slots without any extra work.
 *   - mobile drops the oval too
 *
 * Vertical rhythm from the comp — mobile 390/364, tablet 810/755:
 *   thumbs 0 · RADIANT 89 / 112 · media 206 / 302 · copy 664 / 1061
 *   button 817 / 1196 · socials 925 / 1312
 */
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

/** RADIANT reads as one word here, but still lands a letter at a time. */
function Letters({ text, show }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span
          key={i}
          className={[
            'inline-block transition-[opacity,transform] ease-out',
            show ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          ].join(' ')}
          style={{
            transitionDuration: `${DUR.letter}ms`,
            transitionDelay: `${T.letter(i)}ms`,
          }}
        >
          {ch}
        </span>
      ))}
    </>
  )
}

export default function HeroStacked({ onReady, revealed, thumbs = [], stills = [], wrist }) {
  const slotRef = useRef(null)
  const [ready, setReady] = useState(false)

  const handleReady = useCallback(() => {
    setReady(true)
    onReady?.()
  }, [onReady])

  const show = ready || revealed

  return (
    <section className="relative pt-[28px] md:pt-[40px]">
      <div className="shell">
        {/* thumbs, and the oval alongside them on tablet only */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="flex">
              {thumbs.map((src, i) => (
                <Reveal
                  key={src}
                  show={show}
                  delay={T.thumb(i)}
                  as="span"
                  className="block h-[40px] w-[33px] shrink-0 overflow-hidden rounded-full ring-2 ring-cream md:h-[49px] md:w-[41px]"
                  style={{ marginRight: i < thumbs.length - 1 ? -6 : 0 }}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </Reveal>
              ))}
            </div>
            <Reveal show={show} delay={T.thumb(thumbs.length)} as="span" className="block">
              <img
                src={chevron}
                width="20"
                height="11.5123"
                alt=""
                className="h-[9.2px] w-[16px] rotate-90 md:h-[11.5px] md:w-[20px]"
              />
            </Reveal>
          </div>

          <Reveal show={show} delay={T.oval} className="hidden md:block">
            <Crossfade
              images={wrist?.ovals ?? []}
              interval={2000}
              fade={800}
              start={show}
              className="h-[72px] w-[222px] rounded-[52px]"
            />
          </Reveal>
        </div>

        {/* sized to span the full content width at every breakpoint */}
        <div className="wordmark-wrap mt-[32px] md:mt-[40px]">
          <h1 className="wordmark-fill whitespace-nowrap font-display leading-(--leading-display) text-ink">
            <Letters text="RADIANT" show={show} />
          </h1>
        </div>

        {/* media — centred, and a rounded panel rather than the hourglass */}
        <div className="mt-[32px] flex justify-center md:mt-[65px]">
          <div
            ref={slotRef}
            className="relative aspect-[310/429] h-[37.5svh] max-h-[330px] md:aspect-auto md:h-[719px] md:w-[519px] md:max-h-none"
          >
            <HeroStage
              slotRef={slotRef}
              sources={wrist?.sources ?? []}
              poster={wrist?.hero}
              stills={stills}
              onReady={handleReady}
            />
          </div>
        </div>

        {/* Copy flows naturally here rather than using the desktop's fixed
            line breaks, so it fills the column. Mobile runs full width at
            16px; tablet caps at 650 so the measure stays readable. */}
        <div className="mt-[26px] flex gap-[21px] md:mt-[40px]">
          <Reveal
            show={show}
            delay={T.copy(0)}
            duration={DUR.copy}
            as="span"
            className="block w-px shrink-0 self-stretch bg-body/40"
          />
          <Reveal
            show={show}
            delay={T.copy(1)}
            duration={DUR.copy}
            as="p"
            className="text-[16px] leading-[22px] text-body md:max-w-[650px] md:text-[20px] md:leading-[30px]"
          >
            {COPY_TEXT}
          </Reveal>
        </div>

        <Reveal show={show} delay={T.button} className="mt-[36px] md:mt-[43px]">
          <a
            href="#"
            className="btn-explore relative inline-flex h-[61px] w-[220px] md:h-[73px] md:w-[264px] items-center justify-center"
          >
            <img src={btn} alt="" className="absolute inset-0 h-full w-full" />
            <span
              aria-hidden
              className="btn-sheen absolute inset-0"
              style={{ maskImage: `url("${btn}")`, WebkitMaskImage: `url("${btn}")` }}
            />
            <span className="btn-label relative text-[18px] leading-[26px] text-white md:text-[20px] md:leading-[30px]">
              Explore Now
            </span>
          </a>
        </Reveal>

        <ul className="mt-[22px] flex items-start gap-[20px] pb-[8px] md:mt-[35px]">
          {SOCIALS.map(({ src, label }, i) => (
            <Reveal key={label} show={show} delay={T.social(i)} as="li">
              <a href="#" aria-label={label}>
                <img src={src} width="33" height="33" alt="" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
