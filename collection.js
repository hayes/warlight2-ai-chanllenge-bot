module.exports = Collection

function Collection() {
  this.list = []
  this.map = this
}

Collection.prototype.add = function add(key, value) {
  if (this[key]) return
  this.list.push(value)
  this[key] = value
}
