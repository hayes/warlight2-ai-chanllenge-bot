var CONSTANTS = require('../constants')

module.exports = setupMap

function setupMap(bot) {
  bot.interface.on('setup_map', checkType)

  function checkType(type) {
    switch (type) {
      case 'super_regions':
        invoke.call(bot, 'addSuperRegions', arguments)
        break
      case 'regions':
        invoke.call(bot, 'addRegions', arguments)
        break
      case 'neighbors':
        invoke.call(bot, 'linkRegions', arguments)
        break
      case 'wastelands':
        wastelands(bot, arguments)
        break
      case 'opponent_starting_regions':
        starting(bot, arguments)
        break
    }
  }
}

function invoke(method, values) {
  for (var i = 1, l = values.length; i < l;) {
    this.map[method](values[i++], values[i++])
  }
}

function wastelands(bot, values) {
  for (var i = 1, l = values.length; i < l; ++i) {
    bot.map.regions.map[+values[i]].troopCount = CONSTANTS.WASTELAND_TROOPS
  }
}

function starting(bot, values) {
  for (var i = 1, l = values.length; i < l; ++i) {
    bot.map.regions.map[+values[i]].owner = bot.options.opponent_bot
  }
}
