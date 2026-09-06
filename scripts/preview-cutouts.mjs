// Throwaway: drops cut-outs onto the gallery's own ground so edge fringing and
// composition can be judged at something like display size. Numbers each cell so
// frames can be discussed and sequenced.
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const dir = process.argv[2] ?? 'public/images/cutout'
const out = process.argv[3] ?? 'C:/Temp/cutout-preview.jpg'
const cols = Number(process.argv[4] ?? 6)

const files = (await readdir(dir)).filter((f) => f.endsWith('.webp')).sort()

const CELL = 340
const PAD = 18
const GROUND = { r: 23, g: 21, b: 18 } // --wine-deep #171512
const rows = Math.ceil(files.length / cols)

const tiles = []
for (const [i, file] of files.entries()) {
  const left = (i % cols) * CELL
  const top = Math.floor(i / cols) * CELL

  tiles.push({
    input: await sharp(path.join(dir, file))
      .resize(CELL - PAD * 2, CELL - PAD * 2 - 22, {
        fit: 'contain',
        background: { ...GROUND, alpha: 0 },
      })
      .toBuffer(),
    left: left + PAD,
    top: top + PAD,
  })

  const label = `${i + 1}. ${file.replace(/^_Z7A|\.webp$/g, '')}`
  tiles.push({
    input: Buffer.from(
      `<svg width="${CELL}" height="22">
         <text x="${PAD}" y="15" font-family="monospace" font-size="14" fill="#a8926a">${label}</text>
       </svg>`,
    ),
    left,
    top: top + CELL - 22,
  })
}

await sharp({
  create: {
    width: cols * CELL,
    height: rows * CELL,
    channels: 3,
    background: GROUND,
  },
})
  .composite(tiles)
  .jpeg({ quality: 90 })
  .toFile(out)

console.log(`${files.length} frames → ${out}`)
