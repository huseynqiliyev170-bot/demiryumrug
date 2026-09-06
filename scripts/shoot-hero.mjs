import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const label = process.argv[2] ?? 'hero'
const widths = (process.argv[3] ?? '1440,390').split(',').map(Number)
const route = process.argv[4] ?? '/'

await mkdir('.shots', { recursive: true })
const browser = await chromium.launch()
for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: w > 700 ? 900 : 844 },
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  const errs = []
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
  page.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message))
  await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle', timeout: 120000 })
  await page.waitForFunction(
    () => [...document.querySelectorAll('img')].every((el) => el.naturalWidth > 0 || el.clientWidth === 0),
    null, { timeout: 30000 },
  ).catch(() => console.log('  ! images not all decoded'))
  await page.waitForTimeout(2600)
  await page.screenshot({ path: `.shots/${label}-${w}.png` })
  const o = await page.evaluate(() => ({
    s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth,
  }))
  console.log(`@${w} overflow=${o.s - o.c}px errors=${errs.length}`)
  if (errs.length) console.log('  ' + errs.slice(0, 6).join('\n  '))
  await ctx.close()
}
await browser.close()
