module.exports = addGo

function addGo(bot) {
  bot.on('go', go)

  function go(action) {
    switch (action) {
      case 'place_armies':
        bot.emit('place')
        break
      case 'attack/transfer':
        bot.emit('attack')
        break
    }
  }
}
