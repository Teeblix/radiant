/**
 * The three wire loops from Figma (nodes 3:29-3:31), inlined so the stroke can
 * be animated. Each is a single open spiral, so giving it one small travelling
 * gap makes the line run around the loop: the ring reads as revolving while
 * staying exactly in place. Rotating the artwork instead would tumble it,
 * because these are horizontal hoops drawn in perspective.
 *
 * `pathLength={1}` normalises each path so the dash values are the same for
 * all three regardless of their real arc length.
 */
const LOOPS = [
  { viewBox: "0 0 495.241 157.942", w: 495.241, h: 157.942, d: "M451.058 1.16427C484.558 -0.00239661 530.055 3.97579 448.058 48.6643C348.058 103.164 156.558 142.164 37.058 156.164C-12.7289 161.997 -11.9422 134.164 45.5578 101.664", delay: "-0.00s", mt: 0 },
  { viewBox: "0 0 493.571 158.027", w: 493.571, h: 158.027, d: "M446.699 1.1608C480.199 -0.00586295 529.932 4.13655 447.934 48.8251C347.934 103.325 156.434 142.325 36.9343 156.325C-12.8525 162.158 -11.8008 130.661 45.6992 98.1608", delay: "-6.67s", mt: -116 },
  { viewBox: "0 0 493.799 158.056", w: 493.799, h: 158.056, d: "M445.714 1.1608C479.214 -0.00586377 530.813 4.13653 448.816 48.825C348.815 103.325 157.315 142.325 37.8156 156.325C-11.9713 162.158 -12.7857 132.161 44.7143 99.6608", delay: "-13.34s", mt: -117 },
]

export default function RingStack({ near = false }) {
  return (
    <div>
      {LOOPS.map(({ viewBox, w, h, d, delay, mt }, i) => (
        <div key={i} style={{ marginTop: mt }} className={near ? 'ring-near' : undefined}>
          <svg
            viewBox={viewBox}
            width="100%"
            height={h}
            fill="none"
            preserveAspectRatio="none"
            className="block w-full"
            style={{ height: 'auto' }}
          >
            <path
              d={d}
              pathLength={1}
              stroke="#4C4C4C"
              strokeWidth={2}
              className="ring-travel"
              style={{ animationDelay: delay }}
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
