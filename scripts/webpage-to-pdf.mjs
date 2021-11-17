import puppeteer from 'puppeteer'
import fs from 'fs'

async function getPlaceholder(baseUrl, target, options) {
  const browserConfig = {}

  // For Alpine Linux in a Docker container
  if (fs.existsSync('/usr/bin/chromium-browser')) {
    browserConfig.executablePath = '/usr/bin/chromium-browser'
    browserConfig.args = ['--no-sandbox', '--disabled-setupid-sandbox']
  }

  console.log('creating browser with config:', browserConfig)

  const browser = await puppeteer.launch(browserConfig)

  console.log('creating new page with options', options)

  const page = await browser.newPage()

  page.setViewport({
    height: options.height,
    width: options.width,
  })

  console.log('opening url', baseUrl)

  await page.goto(baseUrl, {
    waitUntil: 'networkidle2',
  })

  if (options.flip) {
    console.log('flipping page')

    await page.evaluate(() => {
      document.body.style.transform = 'rotate(-180deg)'
    })
  }

  console.log('creating pdf')

  await page.pdf({
    height: options.height,
    landscape: options.landscape,
    path: destination,
    printBackground: options.printBackground,
    timeout: options.timeout,
    width: options.width,
  })

  console.log('closing browser')

  await browser.close()
}

const source = process.argv[2]
const destination = process.argv[3]

let defaultOptions = {
  flip: true,
  height: 1404,
  landscape: false,
  printBackground: true,
  timeout: 60 * 1000,
  width: 1872,
}

await getPlaceholder(source, destination, defaultOptions)
