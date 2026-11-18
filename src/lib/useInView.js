import { useEffect, useRef, useState } from 'react'

/**
 * Flips true the first time an element scrolls into view, and stays true.
 *
 * `requireScroll` holds the trigger until the page has actually been scrolled.
 * Without it, a section that happens to sit inside a tall viewport at load
 * would reveal itself immediately — the point here is that the section arrives
 * as a result of scrolling, not merely because it fits on screen.
 *
 * This is what keeps the layout honest: the gap above the section can be the
 * one the design calls for, instead of being inflated to push it past the fold.
 */
export default function useInView({
  rootMargin = '-12% 0px',
  threshold = 0,
  requireScroll = false,
} = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver: show it rather than risk leaving the section
    // permanently invisible.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    let io = null
    let started = false

    const observe = () => {
      if (started) return
      started = true
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        },
        { rootMargin, threshold },
      )
      io.observe(el)
    }

    if (!requireScroll) {
      observe()
      return () => io?.disconnect()
    }

    const onScroll = () => {
      if (window.scrollY <= 0) return
      window.removeEventListener('scroll', onScroll)
      observe()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // A reload can restore a non-zero scroll position, so check once up front.
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [rootMargin, threshold, requireScroll])

  return [ref, inView]
}
