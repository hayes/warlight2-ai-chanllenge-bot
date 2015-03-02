var CONSTANTS = require('../constants')
var Collection = require('../collection')

module.exports = Region

function Region(id, superRegion) {
  this.id = id
  this.superRegion = superRegion
  this.owner = 'neutral'
  this.neighbors = new Collection()
  this.troopCount = CONSTANTS.DEFAULT_TROOP_COUNT
}
