const Sequelize = require('sequelize')
const db = require('../db')

const Listing = db.define('listing', {
  address: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.STRING
  },
  sqft: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
})

module.exports = Listing
