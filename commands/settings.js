module.exports = loadSettings

function loadSettings(bot) {
  bot.on('settings', addSetting)

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
        bot.settings[name] = [].slice.call(arguments, 1)
        break
      case 'your_bot':
        bot.name = value
        break
      case 'opponent_bot':
        bot.opponent = value
        break
      default:
        bot.settings[name] = value
    }
  }
}
