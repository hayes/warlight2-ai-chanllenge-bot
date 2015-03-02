module.exports = loadSettings

function loadSettings(bot) {
  bot.interface.on('settings', addSetting)

  function addSetting(name, value) {
    switch (name) {
      case 'timebank':
      case 'time_per_move':
      case 'max_rounds':
      case 'starting_armies':
      case 'starting_pick_amount':
        bot.settings[name] = +value
        break
      case 'starting_regions':
        bot.settomgs[name] = [].slice.call(arguments, 1)
        break
      default:
        bot.settings[name] = value
    }
  }
}
