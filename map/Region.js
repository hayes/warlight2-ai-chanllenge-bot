var CONSTANTS = require('../constants')
var Collection = require('../collection')

module.exports = Region

function Region(id, superRegion, bot) {
  this.id = id
  this.superRegion = superRegion
  this.owner = 'neutral'
  this.neighbors = new Collection()
  this.troopCount = CONSTANTS.DEFAULT_TROOP_COUNT
  this.distaces = {}
  this.bot = bot
}

Region.prototype.threatLevel = function threatLevel() {
  var length = this.neighbors.list.length
  var total = 0

  if (this.owner === this.bot.name) {
    total -= this.troopCount
  }

  for (var i = 0; i < length; ++i) {
    var region = this.neighbors.list[i]
    if (region.owner === this.bot.opponent) total += region.troopCount
  }

  return total
}

Region.prototype.attackPotential = function attackPotential() {
  return 0
}

Region.prototype.targetValue = function attackValue() {
  return this.threatLevel()
}

Region.prototype.neighborsBelongingTo = function neighborsBelongingTo(name) {
  return this.neighbors.list.filter(function belingingTo(region) {
    return region.owner === name
  })
}

Region.prototype.calculateDistances = function calculateDistances(done) {
  var region = this
  setDistanceForNeighbors(this.neighbors.list, 1)
  done()

  function setDistanceForNeighbors(list, distance) {
    for (var i = list.length - 1; i >= 0; --i) {
      var node = list[i]
      if (region.distaces[node.id]) continue
      region.distaces[node.id] = distance
      setDistanceForNeighbors(node.neighbors.list, distance + 1)
    }
  }
}
