/**
 * Lifts the studio white off the unused shoot so those photographs can hang on
 * the gallery's dark ground next to the existing cut-outs.
 *
 * A luminance threshold alone is wrong here: the red sleeve carries a printed
 * white ornament, and thresholding punches holes straight through it. So the
 * background is found by flood-filling inward from the frame edge — only white
 * that is *connected to the border* is removed, and anything enclosed by the
 * object survives.
 *
 * The mask is then eroded a couple of pixels (the boundary pixels are a blend of
 * object and paper, and on a dark ground any white left behind reads as a halo)
 * and feathered so edges land soft instead of stair-stepped. The RGBA buffer is
 * assembled by hand rather than via joinChannel, which silently promotes a
 * single-channel mask to RGB and drops the alpha.
 *
 * Usage: node scripts/lift-studio-white.mjs [--out dir] [--erode n] [file...]
 */
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const argv = process.argv.slice(2)
const consumed = new Set()
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`)
  if (i === -1) return fallback
  consumed.add(i).add(i + 1)
  return argv[i + 1]
}

const outDir = flag('out', 'public/images/cutout')
const erodeBy = Number(flag('erode', 2))

/**
 * Treated as background: near-neutral, and either bright enough to be paper or
 * smooth enough to be shadow lying on it.
 *
 * A white-only threshold leaves the soft cast shadow behind as grey islands, so
 * the floor drops well below paper white — but neutrality and smoothness have to
 * carry the weight there, because a lit crocodile-leather lid also desaturates.
 * The one neutral element on the objects, the printed silver ornament, is
 * enclosed by red, so connectivity keeps it safe regardless.
 */
const PAPER_LUMA = Number(flag('paper', 205))
const LUMA_MIN = Number(flag('luma', 132))
const CHROMA_MAX = Number(flag('chroma', 12))
/** Local luma standard deviation, over a 5×5 window, below which a dim neutral
 *  pixel is read as shadow on paper rather than as part of a textured object. */
const SMOOTH_MAX = Number(flag('smooth', 3.5))
/** Kept regions smaller than this fraction of the frame are shadow debris. */
const MIN_ISLAND = Number(flag('island', 0.001))
/** Transparent margin kept around the object, in pixels. */
const MARGIN = 8

const explicit = argv.filter((a, i) => !consumed.has(i) && !a.startsWith('--'))

const srcDir = 'public/images'
const files = explicit.length
  ? explicit
  : (await readdir(srcDir))
      .filter((f) => /^_Z7A\d+\.webp$/.test(f))
      .sort()
      .map((f) => path.join(srcDir, f))

await mkdir(outDir, { recursive: true })

for (const file of files) {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info
  const n = width * height

  // Local roughness, via integral images of luma and luma², is what separates
  // paper from leather. The studio sweep and the shadow falling across it are
  // almost perfectly smooth; the crocodile embossing is not. Without this the
  // lenient shadow threshold walks straight through the specular highlight on a
  // box lid and eats a ragged bite out of it.
  const gray = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    const o = i * 3
    gray[i] = 0.299 * data[o] + 0.587 * data[o + 1] + 0.114 * data[o + 2]
  }

  const iw = width + 1
  const sum = new Float64Array(iw * (height + 1))
  const sumSq = new Float64Array(iw * (height + 1))
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const v = gray[y * width + x]
      const p = (y + 1) * iw + (x + 1)
      sum[p] = v + sum[p - 1] + sum[p - iw] - sum[p - iw - 1]
      sumSq[p] = v * v + sumSq[p - 1] + sumSq[p - iw] - sumSq[p - iw - 1]
    }
  }

  const RADIUS = 2
  const roughness = (i) => {
    const x = i % width
    const y = (i - x) / width
    const x0 = Math.max(0, x - RADIUS)
    const y0 = Math.max(0, y - RADIUS)
    const x1 = Math.min(width - 1, x + RADIUS)
    const y1 = Math.min(height - 1, y + RADIUS)
    const area = (x1 - x0 + 1) * (y1 - y0 + 1)
    const a = y0 * iw + x0
    const b = y0 * iw + (x1 + 1)
    const c = (y1 + 1) * iw + x0
    const d = (y1 + 1) * iw + (x1 + 1)
    const mean = (sum[d] - sum[b] - sum[c] + sum[a]) / area
    const meanSq = (sumSq[d] - sumSq[b] - sumSq[c] + sumSq[a]) / area
    return Math.sqrt(Math.max(0, meanSq - mean * mean))
  }

  // 255 = keep, 0 = background.
  const mask = new Uint8Array(n).fill(255)
  const queue = new Int32Array(n)
  let head = 0
  let tail = 0

  const isBackground = (i) => {
    const o = i * 3
    const r = data[o]
    const g = data[o + 1]
    const b = data[o + 2]
    const chroma = Math.max(r, g, b) - Math.min(r, g, b)
    if (chroma > CHROMA_MAX) return false
    const luma = gray[i]
    // Bright and neutral is paper outright. Below that it can only be shadow
    // lying on the paper, which has to be smooth to qualify.
    if (luma >= PAPER_LUMA) return true
    return luma >= LUMA_MIN && roughness(i) <= SMOOTH_MAX
  }

  const push = (i) => {
    if (mask[i] === 0 || !isBackground(i)) return
    mask[i] = 0
    queue[tail++] = i
  }

  for (let x = 0; x < width; x++) {
    push(x)
    push((height - 1) * width + x)
  }
  for (let y = 0; y < height; y++) {
    push(y * width)
    push(y * width + width - 1)
  }

  while (head < tail) {
    const i = queue[head++]
    const x = i % width
    if (x > 0) push(i - 1)
    if (x < width - 1) push(i + 1)
    if (i >= width) push(i - width)
    if (i < n - width) push(i + width)
  }

  let bg = 0
  for (let i = 0; i < n; i++) if (mask[i] === 0) bg++

  // Drop debris: shadow that the fill could not reach stays behind as small
  // islands. Several genuine objects can sit apart in one frame, so this cannot
  // simply keep the largest region — it drops everything under a floor instead.
  const minArea = Math.round(n * MIN_ISLAND)
  let dropped = 0
  const seen = new Uint8Array(n)
  for (let start = 0; start < n; start++) {
    if (mask[start] === 0 || seen[start]) continue
    let cursor = 0
    tail = 0
    seen[start] = 1
    queue[tail++] = start
    while (cursor < tail) {
      const i = queue[cursor++]
      const x = i % width
      const neighbours = [
        x > 0 ? i - 1 : -1,
        x < width - 1 ? i + 1 : -1,
        i >= width ? i - width : -1,
        i < n - width ? i + width : -1,
      ]
      for (const j of neighbours) {
        if (j === -1 || seen[j] || mask[j] === 0) continue
        seen[j] = 1
        queue[tail++] = j
      }
    }
    if (tail < minArea) {
      for (let k = 0; k < tail; k++) mask[queue[k]] = 0
      dropped += tail
    }
  }

  // Erode: pull the edge inside the paper/object blend so no white rim survives.
  for (let pass = 0; pass < erodeBy; pass++) {
    const prev = Uint8Array.from(mask)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x
        if (prev[i] === 0) continue
        if (
          (y > 0 && prev[i - width] === 0) ||
          (y < height - 1 && prev[i + width] === 0) ||
          (x > 0 && prev[i - 1] === 0) ||
          (x < width - 1 && prev[i + 1] === 0)
        ) {
          mask[i] = 0
        }
      }
    }
  }

  // Feather with two separable [1,2,1] passes — enough to kill stair-stepping
  // without eating detail.
  let alpha = Float32Array.from(mask)
  for (let pass = 0; pass < 2; pass++) {
    const tmp = new Float32Array(n)
    for (let y = 0; y < height; y++) {
      const row = y * width
      for (let x = 0; x < width; x++) {
        const l = alpha[row + (x > 0 ? x - 1 : x)]
        const c = alpha[row + x]
        const r = alpha[row + (x < width - 1 ? x + 1 : x)]
        tmp[row + x] = (l + 2 * c + r) / 4
      }
    }
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = y * width + x
        const u = tmp[y > 0 ? i - width : i]
        const c = tmp[i]
        const d = tmp[y < height - 1 ? i + width : i]
        alpha[i] = (u + 2 * c + d) / 4
      }
    }
  }

  // Assemble RGBA and find the object's bounding box in one pass.
  const rgba = Buffer.alloc(n * 4)
  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1
  for (let i = 0; i < n; i++) {
    const a = alpha[i]
    rgba[i * 4] = data[i * 3]
    rgba[i * 4 + 1] = data[i * 3 + 1]
    rgba[i * 4 + 2] = data[i * 3 + 2]
    rgba[i * 4 + 3] = a
    if (a > 8) {
      const x = i % width
      const y = (i - x) / width
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }

  if (maxX < 0) {
    console.warn(`${path.basename(file)}: nothing survived the cut — skipped`)
    continue
  }

  const left = Math.max(0, minX - MARGIN)
  const top = Math.max(0, minY - MARGIN)
  const region = {
    left,
    top,
    width: Math.min(width, maxX + MARGIN + 1) - left,
    height: Math.min(height, maxY + MARGIN + 1) - top,
  }

  const out = path.join(outDir, path.basename(file).replace(/\.\w+$/, '.webp'))
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract(region)
    .webp({ quality: 88, alphaQuality: 90, effort: 5 })
    .toFile(out)

  console.log(
    `${path.basename(file)} → ${width}x${height} → ${region.width}x${region.height}  ` +
      `bg ${((bg / n) * 100).toFixed(1)}%  debris ${((dropped / n) * 100).toFixed(2)}%`,
  )
}
