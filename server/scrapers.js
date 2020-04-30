const puppeteer = require('puppeteer')
const request = require('request-promise-native')
const poll = require('promise-poller').default
const apiKey = process.env.RECAPTCHA_SECRET

// const siteDetails = {
//   sitekey: "6Lcj-R8TAAAAABs3FrRPuQhLMbp5QrHsHufzLf7b",
//   pageurl: 'https://www.zillow.com/toms-river-nj-08753/fsbo/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%2208753%22%2C%22mapBounds%22%3A%7B%22west%22%3A-74.25446319653321%2C%22east%22%3A-74.0508728034668%2C%22south%22%3A39.90668609062976%2C%22north%22%3A40.06110367083166%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A61169%2C%22regionType%22%3A7%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22mapZoom%22%3A12%2C%22filterState%22%3A%7B%22pmf%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22pf%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%7D'
// }

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 10
}

//------------------------------------------------------------

async function scrapeListings(url) {
  console.log('made it into scrapeListings')
  const browser = await puppeteer.launch(chromeOptions)
  const page = await browser.newPage()
  // const requestId = await initiateCaptchaRequest(apiKey);

  await page.goto('https://www.forsalebyowner.com/search/list/08753', {
    waitUntil: 'domcontentloaded'
  })

  // const response = await pollForRequestResults(apiKey, requestId);
  // console.log(response, 'pollForRequestResults response');
  // const js = `document.getElementById("g-recaptcha-response").innerHTML="${response}";`
  // await page.evaluate(js);

  let data = await page.evaluate(() => {
    // let wiki = document.querySelector('#www-wikipedia-org > h1 > div > strong').innerText
    let price = document.querySelectorAll(
      'div[class="estateSummary-price mix-estateSummary_SM-price_sm"]'
    ).innerText
    let address = document.querySelector('div[class="estateSummary-address"]')
      .innerText
    console.log(price, address, 'PRICE & ADDRESS')

    let prices = Array.from(
      document.querySelectorAll(
        'div[class="estateSummary-price mix-estateSummary_SM-price_sm"]'
      )
    ).map(curr => curr.innerText)

    let addresses = Array.from(
      document.querySelectorAll('div[class="estateSummary-address"]')
    ).map(curr => curr.innerText)

    let homes = []
    for (let i = 0; i < addresses.length; i++) {
      homes.push({
        address: addresses[i],
        price: prices[i]
      })
    }

    console.log(address, price, addresses, prices, homes)
    return {address, price, prices, addresses, homes}
  })

  // console.log(data)
  await browser.close()
  return data
}

//-------------------------------------------------

// async function initiateCaptchaRequest(apiKey) {
//   console.log('inside initiateCaptchaRequest')
//   const formData = {
//     method: 'userrecaptcha',
//     googlekey: siteDetails.sitekey,
//     key: apiKey,
//     pageurl: siteDetails.pageurl,
//     json: 1
//   };
//   const response = await request.post('http://2captcha.com/in.php', {form: formData});
//   return JSON.parse(response).request;
// }

// async function pollForRequestResults(
//   key,
//   id,
//   retries = 30,
//   interval = 1500,
//   delay = 15000
// ) {
//   console.log('inside pollForRequestResults')
//   await timeout(delay);
//   return poll({
//     taskFn: requestCaptchaResults(key, id),
//     interval,
//     retries
//   });
// }

// function requestCaptchaResults(apiKey, requestId) {
//   console.log('inside requestCaptchaResults')
//   const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
//   return async function() {
//     return new Promise(async function(resolve, reject){
//       const rawResponse = await request.get(url);
//       const resp = JSON.parse(rawResponse);
//       if (resp.status === 0) return reject(resp.request);
//       resolve(resp.request);
//     });
//   }
// }

// const timeout = millis => new Promise(resolve => setTimeout(resolve, millis))

//------------------------------------------------

module.exports = {
  scrapeListings
}
