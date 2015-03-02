var Collection = require('../collection')

module.exports = SuperRegion

function SuperRegion(id, bonus) {
  this.id = id
  this.bonus = bonus
  this.regions = new Collection()
}
