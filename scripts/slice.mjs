import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'

const pref = process.argv[2] ?? 'before'
const W = Number(process.argv[3] ?? 820)
const H = Number(process.argv[4] ?? 1150)
await mkdir('.shots/slices', { recursive: true })
const files = (await readdir('.shots')).filter((f) => f.startsWith(pref) && f.endsWith('.png'))
for (const f of files) {
  const meta = await sharp(`.shots/${f}`).metadata()
  const scale = W / meta.width
  const newH = Math.round(meta.height * scale)
  const buf = await sharp(`.shots/${f}`).resize(W).png().toBuffer()
  const n = Math.ceil(newH / H)
  console.log(f, `${meta.width}x${meta.height} -> ${W}x${newH} in ${n} slices`)
  for (let i = 0; i < n; i++) {
    const top = i * H
    const h = Math.min(H, newH - top)
    await sharp(buf).extract({ left: 0, top, width: W, height: h })
      .jpeg({ quality: 72 }).toFile(`.shots/slices/${f.replace('.png','')}-${String(i+1).padStart(2,'0')}.jpg`)
  }
}
