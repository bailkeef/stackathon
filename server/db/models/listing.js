const Sequelize = require('sequelize')
const db = require('../db')

const Listing = db.define('listing', {
  phone: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.STRING
  },
  beds: {
    type: Sequelize.STRING
  },
  baths: {
    type: Sequelize.STRING
  },
  sqft: {
    type: Sequelize.STRING
  }
})

module.exports = Listing
