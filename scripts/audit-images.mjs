// Throwaway diagnostic: for every <img> on a route, report whether the real
// bitmap actually decoded or whether the blur placeholder is still standing in.
import { chromium } from 'playwright'

const route = process.argv[2] ?? '/'
const width = Number(process.argv[3] ?? 1440)

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width, height: width > 700 ? 900 : 844 } })
const page = await ctx.newPage()

const failed = []
page.on('response', (r) => {
  if (r.status() >= 400 && /image|_next\/image/.test(r.url())) failed.push(`${r.status()} ${r.url().slice(0, 120)}`)
})
page.on('requestfailed', (r) => {
  if (/image/.test(r.url())) failed.push(`FAILED ${r.request?.() ?? ''} ${r.url().slice(0, 120)}`)
})

await page.goto('http://localhost:3000' + route, { waitUntil: 'load', timeout: 90000 })

// Walk the whole page so lazy images enter the viewport, then give the dev-mode
// image optimizer real time to finish transcoding.
await page.evaluate(async () => {
  const step = window.innerHeight * 0.6
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 250))
  }
  window.scrollTo(0, 0)
})
await page.waitForTimeout(4000)

const report = await page.evaluate(() => {
  return [...document.querySelectorAll('img')].map((el) => {
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return {
      src: (el.currentSrc || el.src).replace(/^.*?url=/, '').split('&')[0].slice(0, 60),
      nat: `${el.naturalWidth}x${el.naturalHeight}`,
      complete: el.complete,
      box: `${Math.round(r.width)}x${Math.round(r.height)}`,
      filter: cs.filter === 'none' ? '' : cs.filter,
      opacity: cs.opacity,
      bgBlur: /url\(/.test(cs.backgroundImage) ? 'placeholder-bg' : '',
    }
  })
})

console.log(`\n${route} @${width} — ${report.length} <img>`)
for (const r of report) {
  const bad = !r.complete || r.nat === '0x0'
  console.log(
    `${bad ? '✗' : '·'} nat=${r.nat.padEnd(11)} box=${r.box.padEnd(11)} op=${r.opacity.padEnd(4)} ${r.bgBlur.padEnd(15)} ${r.filter.padEnd(18)} ${decodeURIComponent(r.src)}`,
  )
}
if (failed.length) console.log('\nnetwork problems:\n  ' + [...new Set(failed)].join('\n  '))

const counts = await page.evaluate(() => ({
  footers: document.querySelectorAll('footer').length,
  h1: document.querySelectorAll('h1').length,
}))
console.log('\nfooter elements:', counts.footers, ' h1 elements:', counts.h1)

await browser.close()
