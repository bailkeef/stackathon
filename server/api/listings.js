const router = require('express').Router()
const {Listing} = require('../db/models')
const scrapers = require('../scrapers')
const texting = require('../../twilio/send-sms')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listings = await Listing.findAll()
    res.json(listings)
  } catch (err) {
    next(err)
  }
})

router.post('/text', async (req, res, next) => {
  console.log(req.body.message, 'req.body.message')
  try {
    const listings = await Listing.findAll()
    texting.sendText('+19087832721', req.body.message)
    res.json(listings)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const url = `https://www.forsalebyowner.com/search/list/${req.body.zipcode}`
    const data = await scrapers.scrapeListings(url)
    console.log(data, 'this is the data')
    const newListings = await Listing.bulkCreate(data)
    res.json(newListings)
  } catch (err) {
    console.error(err)
  }
})
