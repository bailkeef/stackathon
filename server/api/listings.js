const router = require('express').Router()
const {Listing} = require('../db/models')
const scrapers = require('../scrapers')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const listings = await Listing.findAll()
    res.json(listings)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  console.log('here')
  console.log(req.body, 'req.body')
  const data = await scrapers.scrapeListings(req.body.url)
  console.log(data, 'this is the data')
  const newListings = await Listing.create(data)
  res.json(newListings)
})
