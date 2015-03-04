module.exports = pickStart

function pickStart(bot) {
  var calculated = false
  bot.on('pick_starting_region', pick)

  function pick() {
    var start = Date.now()
    var options = [].slice.call(arguments, 1)
    if (calculated) return doPick()
    calculated = true
    bot.map.calculateDistances(doPick)

    function doPick() {
      bot.log('distance calculation took:', Date.now() - start + 'ms')
      bot.emit('output', options[Math.floor(Math.random() * options.length)])
    }
  }
}
