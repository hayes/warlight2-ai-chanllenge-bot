module.exports = Collection

function Collection() {
  this.list = []
  this.map = this
}

Collection.prototype.add = function add(key, value) {
  this.list.push(value)
  this.map[key] = value
}
