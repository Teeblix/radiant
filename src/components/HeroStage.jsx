import { useEffect, useRef, useState } from 'react'
import { hourglassD } from '../lib/hourglass'

/**
 * The hourglass sits in its final page position from the first frame. The
 * loader runs *inside* it: a rapid cut between still campaign frames, then the
 * video takes over and the rest of the page reveals.
 *
 * The silhouette scales with the slot; its points live in lib/hourglass.
 */

/**
 * Hold per still. Seven frames x 120ms is ~0.85s, matching the "0.8 to 1
 * seconds" the sequence should take overall. Raise this if the cuts should
 * read as individual photographs rather than a flicker.
 */
const STILL_MS = 120

export default function HeroStage({
  slotRef,
  sources = [],
  poster,
  stills = [],
  onReady,
  /** Tablet and mobile drop the hourglass for a plain rounded panel. */
  rounded = false,
}) {
  const stageRef = useRef(null)
  const videoRef = useRef(null)
  const readyRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  // Keep the silhouette matched to the slot, which never changes size today
  // but would if the hero is ever made fluid.
  useEffect(() => {
    const stage = stageRef.current
    const slot = slotRef.current
    if (!stage || !slot) return
    if (rounded) {
      stage.style.clipPath = ''
      return
    }
    const fit = () => {
      stage.style.clipPath = `path("${hourglassD(slot.offsetWidth, slot.offsetHeight)}")`
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [slotRef, rounded])

  // Cut through the stills, then hand over to the video.
  useEffect(() => {
    const finish = () => {
      if (readyRef.current) return
      readyRef.current = true
      setPlaying(true)
      videoRef.current?.play().catch(() => {})
      onReady?.()
    }

    if (!stills.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }

    let i = 0
    const id = setInterval(() => {
      i += 1
      if (i >= stills.length) {
        clearInterval(id)
        finish()
      } else {
        setIndex(i)
      }
    }, STILL_MS)

    // rAF is suspended in a hidden tab but setInterval still fires, so the
    // sequence completes either way; this only guards a stalled interval.
    const safety = setTimeout(finish, STILL_MS * stills.length + 2000)
    return () => {
      clearInterval(id)
      clearTimeout(safety)
    }
  }, [stills.length, onReady])

  return (
    <div
      ref={stageRef}
      className={`absolute inset-0 z-0 overflow-hidden bg-ink ${rounded ? 'rounded-[18px]' : ''}`}
    >
      {/* All stills stay mounted so the cuts never wait on a decode. */}
      {stills.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: !playing && i === index ? 1 : 0 }}
        />
      ))}

      {/* Mounted from the start and preloaded, so it starts instantly when the
          stills finish rather than buffering on screen. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: playing ? 1 : 0 }}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
      >
        {sources.map(({ src, type }) => (
          <source key={src} src={src} type={type} />
        ))}
      </video>
    </div>
  )
}
