const puppeteer = require('puppeteer')

async function scrapeListings(url) {
  console.log('made it into scrapeListings')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'networkidle2'})

  let data = await page.evaluate(() => {
    let wiki = document.querySelector('#www-wikipedia-org > h1 > div > strong')
      .innerText
    // let address = document.querySelector('address[class="list-card-addr"]').innerText;
    // let price = document.querySelector('div[class="list-card-price"]').innerText;

    return {wiki}
  })

  console.log(data)
  await browser.close()
  return data
}

module.exports = {
  scrapeListings
}
