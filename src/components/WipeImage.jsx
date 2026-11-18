import useInView from '../lib/useInView'

/**
 * Reveals its contents with a downward wipe.
 *
 * The frame's clip opens from the top edge while what is inside sits at a
 * slight counter-offset and settles as the wipe passes — so the picture
 * appears to be uncovered rather than to slide in behind a mask. Scaling very
 * slightly past 1 keeps the counter-move from exposing an edge.
 *
 * Takes either a `src` or arbitrary `children`, so a frame can hold a single
 * photograph or something that keeps moving afterwards, like a crossfade.
 */
export default function WipeImage({
  src,
  alt = '',
  delay = 0,
  duration = 1000,
  className = '',
  style,
  children,
}) {
  const [ref, inView] = useInView({ rootMargin: '-12% 0px' })

  const settle = {
    transform: inView ? 'translateY(0) scale(1)' : 'translateY(-12%) scale(1.06)',
    transition: `transform ${duration + 200}ms cubic-bezier(0.76, 0, 0.24, 1)`,
    transitionDelay: `${delay}ms`,
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-body/10 ${className}`}
      style={{
        ...style,
        clipPath: inView ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        transition: `clip-path ${duration}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children ? (
        <div className="h-full w-full" style={settle}>
          {children}
        </div>
      ) : (
        <img src={src} alt={alt} className="h-full w-full object-cover" style={settle} />
      )}
    </div>
  )
}
