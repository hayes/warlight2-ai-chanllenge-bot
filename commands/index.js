var settings = require('./settings')
var setupMap = require('./setupMap')
var updateMap = require('./updateMap')
var pickStart = require('./pickStart')
var go = require('./go')
var place = require('./place')
var attack = require('./attack')

module.exports = init

function init(bot) {
  settings(bot)
  setupMap(bot)
  updateMap(bot)
  pickStart(bot)
  go(bot)
  place(bot)
  attack(bot)
}
