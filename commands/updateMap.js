module.exports = updateMap

function updateMap(bot) {
  bot.on('update_map', update)

  function update() {
    var region, id, i, l
    var seen = {}

    for (i = 0, l = arguments.length; i < l; i += 3) {
      id = arguments[i]
      seen[id] = true
      region = bot.map.regions.map[id]
      region.owner = arguments[i + 1]
      region.troopCount = +arguments[i + 2]
    }

    var regions = bot.map.regions.list
    for (i = regions.length - 1; i >= 0; --i) {
      region = regions[i]
      if (!seen[region.id]) {
        region.owner = bot.them
        region.troopCount = 5
      }
    }
  }
}
