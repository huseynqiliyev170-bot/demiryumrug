// Throwaway: contact sheet of the plates already in lib/gallery-plates.ts, so
// new photographs can be curated against what the catalogue already shows.
import sharp from 'sharp'

const files = [
  'public/images/fist-front.webp',
  'public/images/fist-angle.webp',
  'public/images/fist-side.webp',
  'public/images/fist-profile.webp',
  'public/images/fist-back.webp',
  'public/images/fist-top.webp',
  'public/images/optimized/1.avif',
  'public/images/optimized/2.avif',
  'public/images/optimized/3.avif',
  'public/images/optimized/4.avif',
  'public/images/optimized/5.avif',
  'public/images/optimized/6.avif',
]

const COLS = 6
const CELL = 260
const rows = Math.ceil(files.length / COLS)

const tiles = []
for (const [i, file] of files.entries()) {
  tiles.push({
    input: await sharp(file)
      .resize(CELL, CELL, { fit: 'contain', background: { r: 20, g: 18, b: 16 } })
      .toBuffer(),
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
  .toFile('/tmp/current-plates.jpg')

console.log(files.map((f, i) => `${i + 1}. ${f}`).join('\n'))
