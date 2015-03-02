var readline = require('readline')
var EE = require('events').EventEmitter

module.exports = Interface

function Interface() {
  EE.call(this)
  readline.createInterface(process.stdin, process.stdout)
    .on('line', this.parseLine.bind(this))
    .on('close', process.exit.bind(process, 0))
}

Interface.prototype = Object.create(EE.prototype)
Interface.prototype.constructor = Interface

Interface.prototype.parseLine = function parseLine(data) {
  if (data.length === 0) return

  var lines = data.trim().split('\n')

  for (var i = 0, l = lines.length; i < l; ++i) {
    var line = lines[i].trim()
    var lineParts = line.split(' ')

    if (lineParts.length === 0) continue

    this.emit.apply(this, lineParts)
  }
}

Interface.prototype.write = function write(data) {
  process.stdout.write(data + '\n')
}
