const Sequelize = require('sequelize')
const db = require('../db')

const Listing = db.define('listing', {
  wiki: {
    type: Sequelize.STRING
  }
})

module.exports = Listing
