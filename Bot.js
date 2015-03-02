var Map = require('./map/Map')
var Interface = require('./interface')
var addCommands = require('./commands')

function Bot() {
  if (!(this instanceof Bot)) {
    return new Bot()
  }

  this.settings = {}
  this.map = new Map()
  this.interface = new Interface()
  addCommands(this)
}

Bot.prototype.placeArmies = function placeArmies() {
    var name = this.settings.your_bot
    var remaining = this.settings.starting_armies
    var regions = this.map.getRegionsFor(this.settings.your_bot)
    var placements = []

    while (remaining) {
      var region = regions[Math.floor(Math.random() * regions.length)]
      placements.push(name + ' place_armies ' + region.id + ' 1')
      ++region.troopCount
    }

    return placements.join(', ')
}

Bot.prototype.attackTransfer = function attackTransfer() {
  var moves = []
  var ownedRegions = this.map.getOwnedRegions(this.settings.your_bot)
  var i
  var n
  var parsedMoves = ''
  var region
  var targetRegion

  for (i = 0; i < ownedRegions.length; i++) {
    region = ownedRegions[i]

    // attack neighboring enemy / neutral region if troopCount > 6
    if (region.troopCount > 6) {
      // shuffle the neighbours for some randomness
      for (n in region.neighbors.shuffle()) {
        // continue with the next iteration if n is a property of the neighbors array,
        // instead of an item in the array
        if (!region.neighbors.hasOwnProperty(n)) {
          continue
        }

        // set the target region
        targetRegion = region.neighbors[n]

        // attack with all available troops if target region is not owned by bot
        if (this.settings.your_bot !== targetRegion.owner) {
          moves.push([region.id, targetRegion.id, region.troopCount - 1])
          region.troopCount = 1
          break
        }
      }
    }

    // transfer troops to neighboring friendly region if troopCount > 1
    if (region.troopCount > 1) {
      // shuffle the neighbours for some randomness
      for (n in region.neighbors.shuffle()) {
        // continue with the next iteration if n is a property of the neighbors array,
        // instead of an item in the array
        if (!region.neighbors.hasOwnProperty(n)) {
            continue
        }

        // set the target region
        targetRegion = region.neighbors[n]

        // transfer all available troops if target region is owned by bot
        if (this.settings.your_bot === targetRegion.owner) {
          moves.push([region.id, targetRegion.id, region.troopCount - 1])
          region.troopCount = 1
          break
        }
      }
    }
  }

  // Return 'No moves' if no moves are made
  if (moves.length === 0) {
    return 'No moves'
  }

  // Else parse the moves
  for (i = 0; i < moves.length; i++) {
    parsedMoves += this.settings.your_bot + ' attack/transfer ' + moves[i].join(' ')

    if (i < moves.length - 1) {
      parsedMoves += ','
    }
  }

  return parsedMoves
}

/**
 * Initialize bot
 * __main__
 */
var bot = new Bot()
