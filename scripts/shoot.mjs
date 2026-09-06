import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const routes = (process.argv[2] ?? '/').split(',')
const label = process.argv[3] ?? 'x'
const widths = (process.argv[4] ?? '1440,390').split(',').map(Number)
const raw = process.argv[5] === 'raw'

// Force every scroll-reveal into its settled state so a full-page capture
// shows layout, not mid-transition opacity.
const FORCE = `
*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}
.dy-reveal,.dy-reveal-scale,.dy-reveal-mask,.dy-reveal-line,.dy-line-inner,[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}
.material-line{transform:scaleX(1)!important;opacity:1!important}
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
    // The dev-mode image optimizer transcodes on first request, so a short wait
    // captures blur placeholders instead of photographs. Block until every
    // <img> has actually decoded (or 20s passes) before shooting.
    const decoded = await page
      .waitForFunction(
        () => [...document.querySelectorAll('img')].every((el) => el.naturalWidth > 0 || el.clientWidth === 0),
        null,
        { timeout: 20000 },
      )
      .then(() => true)
      .catch(() => false)
    if (!decoded) console.log('  ! some images never decoded — capture may show placeholders')

    if (!raw) await page.addStyleTag({ content: FORCE })
    await page.waitForTimeout(350)
    const name = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '')
    await page.screenshot({ path: `.shots/${label}-${name}-${w}.png`, fullPage: true })
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
