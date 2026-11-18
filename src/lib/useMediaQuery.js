import { useEffect, useState } from 'react'

/**
 * Tracks a media query so a layout can be *mounted* conditionally rather than
 * hidden with CSS.
 *
 * The two hero variants each own a video and a loader; rendering both and
 * hiding one would download the media twice and run two timelines, so the
 * breakpoint has to reach JavaScript, not just the stylesheet.
 *
 * Starts false and corrects on mount, which keeps the first client render
 * stable instead of guessing a width before one is measurable.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return matches
}
