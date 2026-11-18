import btn from '../assets/icons/btn.svg'

/**
 * Proceed, with the arrow threading out of the button.
 *
 * The arrow never moves. At rest its tail runs back into the button, where
 * `difference` blend renders it white against the black; past the button's
 * edge the same white inverts to near-black on the cream page. On hover only
 * the tail retracts, to the button's edge and no further.
 *
 * Two details that are easy to get wrong:
 *
 * - The split sits at x=51.2, not at the button's bounding box. Its right edge
 *   is a cubic that bows inward, so at the arrow's height the painted black
 *   stops at x=252.2 — 11.8px short of 264. Splitting at the box would leave
 *   the shaft floating in a gap once the tail retracted.
 * - The tail is an element, not an SVG line. A horizontal line has a
 *   zero-height bounding box, so neither percentage clip-paths nor
 *   `transform-box: fill-box` have anything to resolve against.
 *
 * The two tones are never painted in. Figma bakes them into its asset at
 * x=53, which only holds while nothing moves.
 */
export default function ProceedButton({ label = 'Proceed', href = '#' }) {
  return (
    <div className="btn-proceed relative h-[73px] w-[340px] bg-cream">
      <a
        href={href}
        className="btn-explore absolute left-0 top-0 inline-flex h-[73px] w-[264px] items-center justify-center"
      >
        <img src={btn} alt="" className="absolute inset-0 h-full w-full" />
        <span
          aria-hidden
          className="btn-sheen absolute inset-0"
          style={{ maskImage: `url("${btn}")`, WebkitMaskImage: `url("${btn}")` }}
        />
        <span className="btn-label relative text-[20px] leading-[30px] text-white">{label}</span>
      </a>

      {/* 201px in, so 51.2px of arrow lies over the button and the rest runs past it */}
      <span
        aria-hidden
        className="proceed-arrow absolute left-[201px] top-1/2 block h-[15px] w-[135px]"
      >
        {/* tail — the only part that moves */}
        <span className="proceed-tail absolute left-0 top-1/2 block h-[2px] w-[51.2px] -translate-y-1/2 bg-white" />

        {/* shaft and head — anchored. The shaft starts where the tail ends, so
            the arrow reads as one unbroken line with no seam. */}
        <span className="absolute left-[51.2px] top-1/2 block h-[2px] w-[81.8px] -translate-y-1/2 bg-white" />
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2"
          width="8"
          height="15"
          viewBox="127 0 8 14.73"
          fill="none"
        >
          <polyline
            points="128.3,1.71 134,7.364 128.3,13.03"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )
}
