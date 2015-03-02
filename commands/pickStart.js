module.exports = pickStart

function pickStart(bot) {
  bot.interface.on('pick_starting_region', pick)

  function pick() {
    var options = [].slice.call(arguments, 1)
    bot.interface.write('' + options[Math.floor(Math.random() * options.length)])
  }
}
