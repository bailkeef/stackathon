const puppeteer = require('puppeteer')
// const request = require('request-promise-native')
// const poll = require('promise-poller').default
// const apiKey = process.env.RECAPTCHA_SECRET

// const siteDetails = {
//   sitekey: "6Lcj-R8TAAAAABs3FrRPuQhLMbp5QrHsHufzLf7b",
//   pageurl: 'https://www.zillow.com/toms-river-nj-08753/fsbo/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%2208753%22%2C%22mapBounds%22%3A%7B%22west%22%3A-74.25446319653321%2C%22east%22%3A-74.0508728034668%2C%22south%22%3A39.90668609062976%2C%22north%22%3A40.06110367083166%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A61169%2C%22regionType%22%3A7%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22mapZoom%22%3A12%2C%22filterState%22%3A%7B%22pmf%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22pf%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%7D'
// }

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  // slowMo: 10,
  args: ['--no-sandbox']
}

//------------------------------------------------------------

async function scrapeListings(url) {
  const browser = await puppeteer.launch(chromeOptions)
  const page = await browser.newPage()
  // const requestId = await initiateCaptchaRequest(apiKey); //recaptcha

  await page.goto(url, {
    waitUntil: 'domcontentloaded'
  })

  const links = await page.$$eval('div.estate-bd > div > div > a', links =>
    links.map(link => link.href)
  )
  console.log(links, 'links')

  // const response = await pollForRequestResults(apiKey, requestId); //recaptcha
  // console.log(response, 'pollForRequestResults response'); //recaptcha
  // const js = `document.getElementById("g-recaptcha-response").innerHTML="${response}";` //recaptcha
  // await page.evaluate(js); //recaptcha
  let allListings = []
  for (let link of links) {
    const newTab = await browser.newPage()
    await newTab.goto(link, {
      waitUntil: 'domcontentloaded'
    })
    // do the stuff
    let phone = await newTab.evaluate(() =>
      document.querySelector('div [id="nav-stats"] span strong')
    )
    console.log(phone, 'phone')

    let checkUrl = await newTab.evaluate(() => location.href)
    console.log(checkUrl, 'checkUrl')

    if (phone) {
      let data = await newTab.evaluate(() => {
        console.log('in page evaluate')
        let phone = document.querySelector('div [id="nav-stats"] span strong')
          .innerText
        let address = document.querySelector(
          '#header > header > div > div.summary-list.clearfix > div.summary-list__col.col-1.col-md-3 > ul.list-inline.list-inline--large'
        ).innerText
        let price = document.querySelector(
          '#header > header > div > div.summary-list.clearfix > div.summary-list__col.col-2.col-md-5 > ul.list-inline.list-inline--with-delimiters.list-inline--large > li:nth-child(1) > label'
        ).innerText
        let beds = document.querySelector(
          '#header > header > div > div.summary-list.clearfix > div.summary-list__col.col-2.col-md-5 > ul.list-inline.list-inline--with-delimiters.list-inline--large > li:nth-child(2) > label'
        ).innerText
        let baths = document.querySelector(
          '#header > header > div > div.summary-list.clearfix > div.summary-list__col.col-2.col-md-5 > ul.list-inline.list-inline--with-delimiters.list-inline--large > li:nth-child(3) > label'
        ).innerText
        let sqft = document.querySelector(
          '#header > header > div > div.summary-list.clearfix > div.summary-list__col.col-2.col-md-5 > ul.list-inline.list-inline--with-delimiters.list-inline--large > li:nth-child(4) > label'
        ).innerText
        let img = document.querySelector(
          '#gallery > div.ug-slider-wrapper > div.ug-slider-inner > div.ug-slide-wrapper.ug-slide2 > div.ug-item-wrapper > img'
        )
        let imgUrl
        if (img) imgUrl = img.innerText
        return {
          phone,
          address,
          price,
          beds,
          baths,
          sqft,
          imgUrl
        }
      })
      let allData = {
        phone: data.phone,
        address: data.address,
        price: data.price,
        beds: data.beds,
        baths: data.baths,
        sqft: data.sqft,
        imgUrl: data.imgUrl,
        link: link
      }
      allListings.push(allData)
    }
    await newTab.close()
  }
  console.log(allListings)

  await browser.close()
  return allListings
}

//--------------FOR RECAPTCHA BYPASSING----------------------------------
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
