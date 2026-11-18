/**
 * An endless horizontal ticker.
 *
 * The row is rendered twice and the track slides exactly -50%, so the moment
 * the first copy leaves the frame the second is sitting in precisely the same
 * place — the loop has no seam and needs no measurement or JS tick.
 *
 * `reverse` runs it the other way, which is how the two bands in the brand
 * strip travel against each other.
 */
export default function Marquee({
  items = [],
  speed = 40,
  reverse = false,
  gap = 120,
  className = '',
  renderItem,
}) {
  const row = (key) => (
    <div className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }} key={key}>
      {items.map((item, i) => (
        <div key={i} className="shrink-0">
          {renderItem ? renderItem(item, i) : item}
        </div>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee-track ${reverse ? 'marquee-track--reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {row('a')}
        {/* aria-hidden: the duplicate exists only to close the loop */}
        <div aria-hidden className="flex shrink-0 items-center">
          {row('b')}
        </div>
      </div>
    </div>
  )
}
