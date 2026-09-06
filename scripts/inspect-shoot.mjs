// Throwaway: inspect the unused shoot files. Prints dimensions + a 12px blur
// placeholder for each, and writes a labelled contact sheet to /tmp so the
// photographs can be sequenced before they are given catalogue numbers.
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const dir = 'public/images'
const files = (await readdir(dir)).filter((f) => /^_Z7A\d+\.webp$/.test(f)).sort()

const COLS = 6
const CELL = 260
const rows = Math.ceil(files.length / COLS)

const meta = []
const tiles = []

for (const [i, file] of files.entries()) {
  const src = path.join(dir, file)
  const image = sharp(src)
  const { width, height } = await image.metadata()

  const blur = await sharp(src).resize(12).webp({ quality: 45 }).toBuffer()
  meta.push({
    file,
    width,
    height,
    ratio: (width / height).toFixed(3),
    blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
  })

  const tile = await sharp(src)
    .resize(CELL, CELL, { fit: 'contain', background: { r: 20, g: 18, b: 16 } })
    .toBuffer()

  tiles.push({
    input: tile,
    left: (i % COLS) * CELL,
    top: Math.floor(i / COLS) * CELL,
  })
}

await sharp({
  create: {
    width: COLS * CELL,
    height: rows * CELL,
    channels: 3,
    background: { r: 20, g: 18, b: 16 },
  },
})
  .composite(tiles)
  .jpeg({ quality: 82 })
  .toFile('/tmp/contact-sheet.jpg')

console.log(
  'Grid order (left→right, top→bottom):\n' +
    files.map((f, i) => `${i + 1}. ${f}`).join('\n'),
)
console.log('\n' + JSON.stringify(meta, null, 2))
