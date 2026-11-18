import { useEffect, useState } from 'react'

/**
 * Cycles a set of images in place with a soft crossfade.
 *
 * Deliberately slower than the loader's cuts: the loader is a flicker, this is
 * a gallery. Every frame stays mounted so a fade never waits on a decode, and
 * the cycle only runs while the tab is visible — a background tab would
 * otherwise burn through the set unseen and resume mid-fade.
 */
export default function Crossfade({
  images = [],
  interval = 2000,
  fade = 800,
  className = '',
  start = true,
  /** Offsets where this instance begins, so stacked panels never show the
      same frame at the same moment. */
  startIndex = 0,
}) {
  const [i, setI] = useState(startIndex % Math.max(images.length, 1))

  useEffect(() => {
    if (!start || images.length < 2) return

    let id = 0
    const run = () => {
      id = setInterval(() => {
        if (document.visibilityState === 'visible') {
          setI((p) => (p + 1) % images.length)
        }
      }, interval)
    }
    run()
    return () => clearInterval(id)
  }, [images.length, interval, start])

  if (!images.length) return <span className={className} />

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: idx === i ? 1 : 0,
            transition: `opacity ${fade}ms ease-in-out`,
          }}
        />
      ))}
    </span>
  )
}
