const express = require('express');
const playerRouter = express.Router();
const PlayerController = require('../controllers/playerController')

playerRouter.get('/', PlayerController.getPlayers);
playerRouter.get('/:id', PlayerController.getPlayerById);
playerRouter.put('/:id', PlayerController.updatePlayer);
playerRouter.delete('/:id', PlayerController.deletePlayer);

module.exports = {playerRouter}