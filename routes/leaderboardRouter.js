const express = require('express')
const leaderboardRouter = express.Router()
const { LeaderboardsController } = require('../controllers/leaderboardController')

leaderboardRouter.get('/', LeaderboardsController.getLeaderboards)
leaderboardRouter.get('/:id', LeaderboardsController.getLeaderboardById)


module.exports = { leaderboardRouter }