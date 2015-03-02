var SuperRegion = require('./SuperRegion')
var Collection = require('../collection')
var Region = require('./Region')

module.exports = Map

function Map() {
  this.regions = new Collection()
  this.superRegions = new Collection()
}

Map.prototype.addSuperRegion = function addSuperRegion(id, bonus) {
  this.superRegions.add(+id, new SuperRegion(+id, bonus))
}

Map.prototype.addRegion = function addRegion(id, superRegion) {
  this.regions.add(+id, new Region(+id, this.superRegions.map[superRegion]))
}

Map.prototype.linkRegions = function linkRegions(id1, list) {
  var ids = list.split(',')
  var center = this.regions.map[id1]
  var linked

  for (var i = 0, l = ids.length; i < l; ++i) {
    linked = this.regions.map[ids[i]]
    center.neighbors.add(linked.id, linked)
    linked.neighbors.add(center.id, center)
  }
}

Map.prototype.getRegionsFor = function getRegionsFor(owner) {
  var list = this.regions.list
  var length = list.length
  var matched = []

  for (var i = 0; i < length; ++i) {
    if (list[i].owner === owner) matched.push(list[i])
  }

  return list
}
