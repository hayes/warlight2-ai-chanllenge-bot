module.exports = addGo

function addGo(bot) {
  bot.interface.on('go', go)

  function go(action, time) {
    switch (action) {
      case 'place_armies':
        bot.placeArmies(time)
        break
      case 'attack/transfer':
        bot.attackTransfer(time)
        break
    }
  }
}
