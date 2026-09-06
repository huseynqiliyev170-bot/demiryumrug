import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const routes = ['/about', '/contact']
const widths = [1440, 390]

const FORCE = `
*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}
`

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

  for (const route of routes) {
    await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle', timeout: 90000 })
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 70))
      }
      window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 250))
    })
    const decoded = await page
      .waitForFunction(
        () => [...document.querySelectorAll('img')].every((el) => el.naturalWidth > 0 || el.clientWidth === 0),
        null,
        { timeout: 20000 },
      )
      .then(() => true)
      .catch(() => false)
    if (!decoded) console.log('  ! some images never decoded')

    await page.addStyleTag({ content: FORCE })
    await page.waitForTimeout(350)
    const name = route.replace(/\//g, '-').replace(/^-/, '')
    await page.screenshot({ path: `.shots/ac-${name}-${w}.png`, fullPage: true })
    const o = await page.evaluate(() => ({
      s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth,
      h: document.documentElement.scrollHeight,
    }))
    console.log(`${route} @${w}  h=${o.h}  overflow=${o.s - o.c}px  errors=${errs.length}`)
    if (errs.length) console.log('  ' + errs.slice(0, 8).join('\n  '))
    errs.length = 0
  }
  await ctx.close()
}
await browser.close()
console.log('DONE')
