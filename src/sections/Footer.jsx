import useInView from '../lib/useInView'

/**
 * Footer (Figma node 4:287), desktop.
 *
 * A rule, the wordmark set very large and very pale, then three columns and
 * the copyright. The columns are 465/378/378 in the comp, which exactly fills
 * its 1332px content width, so they are given as fr units rather than fixed
 * widths — at the wider shell they keep the comp's proportions instead of
 * leaving a gap on the right.
 */

/* Rule running into a 28px disc, the comp's newsletter submit. */
const SUBMIT_ARROW =
  'M87.8182 14V14.6364L104.364 14.6364V14V13.3636L87.8182 13.3636V14ZM104.814 14.45C105.062 14.2015 105.062 13.7985 104.814 13.55L100.764 9.50023C100.515 9.25171 100.112 9.25171 99.8639 9.50023C99.6154 9.74874 99.6154 10.1517 99.8639 10.4002L103.464 14L99.8639 17.5998C99.6154 17.8483 99.6154 18.2513 99.8639 18.4998C100.112 18.7483 100.515 18.7483 100.764 18.4998L104.814 14.45Z'

export default function Footer() {
  const [ref, inView] = useInView({ rootMargin: '-8% 0px' })

  const rise = (delay, className = '', style = {}) => ({
    className: [
      'transition-[opacity,transform] duration-[800ms] ease-out',
      inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
      className,
    ].join(' '),
    style: { ...style, transitionDelay: `${delay}ms` },
  })

  return (
    <footer ref={ref} className="mt-[80px] pb-[32px] md:mt-[110px] xl:mt-[140px] xl:pb-[40px]">
      <div className="shell">
        <span aria-hidden className="block h-px w-full bg-body" />

        <div {...rise(0, 'wordmark-wrap mt-[28px] md:mt-[56px] xl:mt-[94px]')}>
          <p className="wordmark-fill whitespace-nowrap font-display text-black/10">
            RADIANT
          </p>
        </div>

        <div className="mt-[36px] grid grid-cols-1 gap-y-[44px] text-body md:mt-[70px] md:grid-cols-2 md:gap-x-[40px] xl:mt-[117px] xl:grid-cols-[465fr_378fr_378fr] xl:gap-x-[55px] xl:gap-y-0">
          {/* newsletter */}
          <div {...rise(80, 'flex flex-col gap-[20px]')}>
            <div className="flex flex-col gap-[15px]">
              <h2 className="text-[22px] font-medium leading-[30px] md:text-[26px] md:leading-[36px] xl:text-[30px] xl:leading-[41px]">Stay Updated</h2>
              <p className="text-[16px] leading-[24px] xl:text-[20px] xl:leading-[30px]">
                Subscribe to our newsletter and be the first to know about new
                collections, promotions, and exciting updates.
              </p>
            </div>

            <form className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[10px] py-[4px]">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  className="min-w-0 flex-1 bg-transparent text-[15px] leading-[20px] text-body outline-none placeholder:text-body"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="shrink-0 cursor-pointer transition-opacity duration-300 hover:opacity-70"
                >
                  <svg width="115.818" height="28" viewBox="0 0 115.818 28" fill="none" aria-hidden>
                    <line
                      x1="0"
                      y1="14"
                      x2="87.8182"
                      y2="14"
                      strokeWidth="1.27273"
                      stroke="#1C1C1C"
                    />
                    <circle cx="101.818" cy="14" r="14" fill="#1C1C1C" />
                    <path d={SUBMIT_ARROW} fill="white" />
                  </svg>
                </button>
              </div>
              <span aria-hidden className="block h-px w-full bg-ink" />
            </form>
          </div>

          {/* customer care */}
          <div {...rise(160, 'flex flex-col gap-[15px]')}>
            <h2 className="text-[22px] font-medium leading-[30px] md:text-[26px] md:leading-[36px] xl:text-[30px] xl:leading-[41px]">Customer Care</h2>
            {/* the comp breaks the line before the number rather than letting
                it wrap mid-number */}
            <div className="text-[16px] leading-[24px] xl:text-[20px] xl:leading-[30px]">
              <p>
                Have questions or need assistance? Reach out to our dedicated
                customer support team at{' '}
                <a href="mailto:support@radiantjewels.com" className="underline">
                  support@radiantjewels.com
                </a>
              </p>
              <p>
                or call us at{' '}
                <a href="tel:+17702636712" className="underline">
                  +1 (770) 263-6712
                </a>
              </p>
            </div>
          </div>

          {/* showroom */}
          <div {...rise(240, 'flex flex-col gap-[13px]')}>
            <div className="flex flex-col gap-[15px]">
              <h2 className="text-[22px] font-medium leading-[30px] md:text-[26px] md:leading-[36px] xl:text-[30px] xl:leading-[41px]">
                Visit Our Showroom
              </h2>
              <p className="text-[16px] leading-[24px] xl:text-[20px] xl:leading-[30px]">
                Experience the radiance in person at 123 Sparkling Avenue, Gemstone
                Plaza, City of Elegance, Radiantland.
              </p>
            </div>
            <p className="text-[16px] leading-[24px] xl:text-[20px] xl:leading-[30px]">
              [<a href="#" className="underline">Privacy Policy</a>] | [
              <a href="#" className="underline">Terms and Conditions</a>]
            </p>
          </div>
        </div>

        <p
          {...rise(
            320,
            'mt-[40px] text-center text-[15px] leading-[30px] text-body xl:mt-[55px]',
          )}
        >
          © 2026 Radiant Jewelry. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
