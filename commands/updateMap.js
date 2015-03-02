module.exports = updateMap

function updateMap(bot) {
  bot.interface.on('update_map', update)

  function update() {
    var region
    for (var i = 0, l = arguments.length; i < l;) {
      region = bot.map.regions.map[arguments[i++]]
      region.owner = arguments[i++]
      region.troopCount = arguments[i++]
    }
  }
}
