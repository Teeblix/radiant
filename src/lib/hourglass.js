/**
 * The pinched silhouette the comp uses for its portrait frames — the hero's
 * stage (node 4:27, 500x687) and the testimonial portrait (node 4:264,
 * 476x654) are the same shape at two sizes, so the points live here rather
 * than in either one.
 *
 * Normalised 0..1, so they scale to whatever box they are drawn into.
 */
export const HOURGLASS = [
  [0, 0], [1, 0], [0.939528, 0.216683],
  [0.884442, 0.414061], [0.886238, 0.617613], [0.944802, 0.814461],
  [1, 1], [0, 1], [0.053828, 0.826161],
  [0.117195, 0.621830], [0.119136, 0.409807], [0.059520, 0.204736],
]

/** The silhouette as SVG path data, scaled to `w` x `h`. */
export function hourglassD(w = 1, h = 1, digits = 2) {
  const p = HOURGLASS.map(([x, y]) => [x * w, y * h])
  const n = (v) => v.toFixed(digits)
  return (
    `M${n(p[0][0])} ${n(p[0][1])}` +
    `L${n(p[1][0])} ${n(p[1][1])}` +
    `L${n(p[2][0])} ${n(p[2][1])}` +
    `C${n(p[3][0])} ${n(p[3][1])} ${n(p[4][0])} ${n(p[4][1])} ${n(p[5][0])} ${n(p[5][1])}` +
    `L${n(p[6][0])} ${n(p[6][1])}` +
    `L${n(p[7][0])} ${n(p[7][1])}` +
    `L${n(p[8][0])} ${n(p[8][1])}` +
    `C${n(p[9][0])} ${n(p[9][1])} ${n(p[10][0])} ${n(p[10][1])} ${n(p[11][0])} ${n(p[11][1])}` +
    `Z`
  )
}
