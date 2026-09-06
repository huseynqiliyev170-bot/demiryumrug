import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
const dir = process.argv[2]
const out = process.argv[3]
const CELL = Number(process.argv[4] ?? 240)
const files = (await readdir(dir)).filter(f => /\.(webp|jpg|png|avif)$/i.test(f)).sort()
const COLS = Number(process.argv[5] ?? 6)
const rows = Math.ceil(files.length / COLS)
const tiles = []
for (const [i, f] of files.entries()) {
  tiles.push({
    input: await sharp(`${dir}/${f}`).resize(CELL - 8, CELL - 28, { fit: 'contain', background: { r: 26, g: 24, b: 22, alpha: 1 } }).flatten({ background: '#1a1816' }).toBuffer(),
    left: (i % COLS) * CELL + 4, top: Math.floor(i / COLS) * CELL + 4,
  })
  const svg = `<svg width="${CELL-8}" height="20"><text x="2" y="14" font-family="monospace" font-size="12" fill="#c9a44c">${f.replace(/\.(webp|jpg|png|avif)$/,'')}</text></svg>`
  tiles.push({ input: Buffer.from(svg), left: (i % COLS) * CELL + 4, top: Math.floor(i / COLS) * CELL + CELL - 22 })
}
await sharp({ create: { width: COLS * CELL, height: rows * CELL, channels: 3, background: '#0f0e0c' } })
  .composite(tiles).jpeg({ quality: 80 }).toFile(out)
console.log(out, files.length, 'files')
