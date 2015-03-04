var EE = require('events').EventEmitter
var GameMap = require('./map')
var addCommands = require('./commands')
var parseLine = require('./parseLine')
var util = require('util')

module.exports = Bot

function Bot() {
  if (!(this instanceof Bot)) {
    return new Bot()
  }

  EE.call(this)
  this.settings = {}
  this.map = new GameMap(this)
  addCommands(this)
  this.name = ''
  this.opponent = ''
}

Bot.prototype = Object.create(EE.prototype)
Bot.prototype.constructor = Bot
Bot.prototype.parseLine = parseLine
Bot.prototype.log = log

function log() {
  this.emit('log', util.format.apply(null, arguments))
}
