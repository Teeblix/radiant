import WipeImage from '../components/WipeImage'
import Crossfade from '../components/Crossfade'
import useInView from '../lib/useInView'
import star from '../assets/icons/star.svg'

/**
 * WE PROVIDE THE / BEST PRODUCTS / WORLDWIDE (Figma node 3:78), desktop.
 *
 * Three lines of display type stepping right across the section, a pill and a
 * body column on the left, and two photographs tilted against each other on
 * the right. Each tilted frame wipes in once, then keeps cycling its own set
 * on its own clock, and drifts slowly up and down while it does.
 *
 * As with the collection section, horizontal positions are percentages of the
 * comp's 1332px content width so the composition holds at the wider shell the
 * 40px gutter gives, while vertical offsets stay fixed.
 *
 *   0    WE PROVIDE THE          star at x=1267
 *   141  BEST PRODUCTS   (x=420)
 *   278  WORLDWIDE       (x=769)
 *   312  pill, then the body copy 81px below it
 *   346  the two tilted photographs (x=582)
 */
const PCT = (px) => `${((px / 1332) * 100).toFixed(3)}%`

const COPY = [
  'Shopping at Radiant is not just a transaction; it\u2019s an experience. We prioritize customer satisfaction, offering a seamless online shopping journey backed by secure transactions and prompt, reliable delivery.',
  'Become a part of the Radiant community and stay updated on the latest trends, exclusive offers, and behind-the-scenes glimpses into the artistry behind our creations.',
]

const LINES = [
  { text: 'WE PROVIDE THE', left: 0, top: 0, delay: 0 },
  { text: 'BEST PRODUCTS', left: 420, top: 141, delay: 110 },
  { text: 'WORLDWIDE', left: 769, top: 278, delay: 220 },
]

export default function Worldwide({ images }) {
  const [ref, inView] = useInView({ rootMargin: '-10% 0px' })

  const rise = (delay, className = '', style = {}) => ({
    className: [
      'transition-[opacity,transform] duration-[800ms] ease-out',
      inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
      className,
    ].join(' '),
    style: { ...style, transitionDelay: `${delay}ms` },
  })

  return (
    <section ref={ref} className="relative mt-[80px] md:mt-[110px] xl:mt-[140px]">
      <div className="shell relative hidden xl:block">
        {/* headline block — 797px tall overall, the type stepping right */}
        <div className="relative h-[448px]">
          {LINES.map(({ text, left, top, delay }) => (
            <h2
              key={text}
              {...rise(
                delay,
                'absolute whitespace-nowrap font-display text-[100px] leading-(--leading-display) text-ink',
                { left: PCT(left), top },
              )}
            >
              {text}
            </h2>
          ))}

          <div {...rise(300, 'absolute', { left: PCT(1267), top: 139 })}>
            <img src={star} width="62" height="65" alt="" className="star-spin" />
          </div>
        </div>

        {/* lower band: copy on the left, the tilted pair on the right */}
        <div className="relative mt-[-136px] h-[485px]">
          <div className="absolute left-0 top-0 flex w-[475px] flex-col gap-[81px]">
            <WipeImage
              src={images?.pill}
              delay={120}
              className="h-[134px] w-[357px] rounded-[81px]"
            />

            <div {...rise(360, 'flex flex-col gap-[30px] text-[20px] leading-[30px] text-body')}>
              {COPY.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          {/* The two photographs lean away from each other. Each is wrapped so
              the rotation sits outside the wipe — the reveal then runs along
              the photograph's own axis rather than the page's. */}
          <div
            className="absolute top-[34px] flex items-start"
            style={{ left: PCT(582) }}
          >
            <div
              className="card-float flex h-[440px] w-[374px] items-center justify-center"
              style={{ animationDuration: '7s' }}
            >
              <div className="rotate-[-20.96deg]">
                <WipeImage delay={200} className="h-[372px] w-[258px]">
                  <Crossfade
                    images={images?.setA ?? []}
                    interval={3400}
                    fade={900}
                    start={inView}
                    className="h-full w-full"
                  />
                </WipeImage>
              </div>
            </div>
            {/* 9.2s against 7s, offset half a cycle: the two never rise or
                fall together. */}
            <div
              className="card-float flex h-[441px] w-[377px] items-center justify-center"
              style={{ animationDuration: '9.2s', animationDelay: '-4.6s' }}
            >
              <div className="rotate-[21.6deg]">
                <WipeImage delay={340} className="h-[372px] w-[258px]">
                  {/* 4700 against 3400: deliberately not a multiple, so the two
                      frames drift apart instead of settling into lockstep. */}
                  <Crossfade
                    images={images?.setB ?? []}
                    interval={4700}
                    fade={1100}
                    start={inView}
                    startIndex={1}
                    className="h-full w-full"
                  />
                </WipeImage>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stacked below the desktop breakpoint: the three lines read as one
          left-aligned block instead of stepping across, and the leaning pair
          shrinks to sit inside the column. */}
      <div className="shell xl:hidden">
        <div className="relative">
          <h2 {...rise(0, 'font-display text-[36px] leading-[1.18] text-ink md:text-[58px]')}>
            WE PROVIDE THE
            <br />
            BEST PRODUCTS
            <br />
            WORLDWIDE
          </h2>
          <div {...rise(200, 'absolute right-0 top-0')}>
            <img
              src={star}
              alt=""
              className="star-spin h-[34px] w-[32px] md:h-[48px] md:w-[46px]"
            />
          </div>
        </div>

        <WipeImage
          src={images?.pill}
          delay={120}
          className="mt-[30px] h-[96px] w-[256px] rounded-[48px] md:mt-[40px] md:h-[134px] md:w-[357px]"
        />

        <div
          {...rise(
            300,
            'mt-[26px] flex flex-col gap-[20px] text-[16px] leading-[24px] text-body md:mt-[34px] md:text-[20px] md:leading-[30px]',
          )}
        >
          {COPY.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <div className="mt-[30px] flex items-start justify-center md:mt-[44px]">
          <div
            className="card-float flex h-[190px] w-[162px] items-center justify-center md:h-[300px] md:w-[262px]"
            style={{ animationDuration: '7s' }}
          >
            <div className="rotate-[-20.96deg]">
              <WipeImage delay={200} className="h-[160px] w-[111px] md:h-[260px] md:w-[180px]">
                <Crossfade
                  images={images?.setA ?? []}
                  interval={3400}
                  fade={900}
                  start={inView}
                  className="h-full w-full"
                />
              </WipeImage>
            </div>
          </div>
          <div
            className="card-float flex h-[190px] w-[162px] items-center justify-center md:h-[300px] md:w-[262px]"
            style={{ animationDuration: '9.2s', animationDelay: '-4.6s' }}
          >
            <div className="rotate-[21.6deg]">
              <WipeImage delay={340} className="h-[160px] w-[111px] md:h-[260px] md:w-[180px]">
                <Crossfade
                  images={images?.setB ?? []}
                  interval={4700}
                  fade={1100}
                  start={inView}
                  startIndex={1}
                  className="h-full w-full"
                />
              </WipeImage>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
