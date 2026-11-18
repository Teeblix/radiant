import star from '../assets/icons/star.svg'

/**
 * The circular "THE BEST JEWELLERY COLLECTION" stamp (Figma 3:150).
 *
 * The comp exports this as 27 separate glyph images, one per letter. Set on an
 * SVG textPath instead it stays editable, scales cleanly, and can rotate as a
 * single object — which also keeps the star still while the ring turns.
 */
export default function CollectionBadge({ className = '' }) {
  return (
    <div className={`relative size-[143px] ${className}`}>
      <svg viewBox="0 0 143 143" className="badge-ring absolute inset-0 size-full" aria-hidden>
        <defs>
          {/* clockwise circle, starting at the top */}
          <path
            id="badge-arc"
            fill="none"
            d="M 71.5 71.5 m 0 -58 a 58 58 0 1 1 -0.1 0"
          />
        </defs>
        {/* Spacing is done with letter-spacing rather than textLength:
            textLength on a textPath is ignored by the renderer. The arc is
            364px around (2 pi r, r = 58) and the phrase sets at 193px, so
            ~5px after each of its 31 characters closes the ring. */}
        <text className="badge-text" fill="#1C1C1C">
          <textPath href="#badge-arc" startOffset="0%">
            THE BEST JEWELLERY COLLECTION ·
          </textPath>
        </text>
      </svg>

      <img
        src={star}
        alt=""
        width="65"
        height="65"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <span className="sr-only">The best jewellery collection</span>
    </div>
  )
}
