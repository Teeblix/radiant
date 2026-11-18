import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Eases the page's scroll so the wheel glides instead of jumping.
 *
 * Skipped entirely under prefers-reduced-motion: hijacking the scroll is
 * exactly the kind of motion that setting exists to opt out of, and the native
 * scroll stays untouched when it is on.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Leave touch alone — native momentum already feels right there and
      // overriding it tends to fight the platform.
      syncTouch: false,
    })

    let frame = 0
    const loop = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
