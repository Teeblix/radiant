/**
 * "Explore" — a long rule running into a dark circle with a white arrow.
 *
 * On hover the rule retracts rightwards and vanishes at the circle's edge;
 * leaving, it draws back out right to left. The circle and the arrow inside
 * it never change.
 *
 * The rule is a plain element rather than an SVG <line>. A horizontal line has
 * a zero-height bounding box, which both percentage clip-paths and
 * `transform-box: fill-box` need in order to resolve — neither works on one.
 * As an element it can simply scale toward its right edge, which is exactly
 * the circle's left edge at x=166.227 (cx 192.727 − r 26.5).
 */
export default function ExploreLink({ label = 'Explore', href = '#' }) {
  return (
    <a href={href} className="explore-link group flex flex-col gap-[30px]">
      <span className="text-[20px] leading-none text-body">{label}</span>

      <span className="relative block h-[53px] w-[219.227px]">
        {/* the rule — the only part that moves */}
        <span
          aria-hidden
          className="explore-rule absolute left-0 top-1/2 block h-[2.409px] w-[166.227px] -translate-y-1/2 bg-ink"
        />

        {/* circle and arrow — fixed */}
        <svg
          className="absolute right-0 top-0"
          width="53"
          height="53"
          viewBox="166.227 0 53 53"
          fill="none"
          aria-hidden
        >
          <circle cx="192.727" cy="26.5" r="26.5" fill="#1C1C1C" />
          <path
            d="M198.397 27.3517C198.868 26.8813 198.868 26.1187 198.397 25.6483L190.732 17.9826C190.261 17.5122 189.498 17.5122 189.028 17.9826C188.558 18.453 188.558 19.2157 189.028 19.6861L195.842 26.5L189.028 33.3139C188.558 33.7843 188.558 34.547 189.028 35.0174C189.498 35.4878 190.261 35.4878 190.732 35.0174L198.397 27.3517ZM166.227 26.5V27.7045L197.545 27.7045V26.5V25.2955L166.227 25.2955V26.5Z"
            fill="white"
          />
        </svg>
      </span>
    </a>
  )
}
