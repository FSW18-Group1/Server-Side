const express = require('express');
const GameController = require('../controllers/gameController');
const accessbilityRouter = express.Router();
const PlayerController = require('../controllers/playerController')


accessbilityRouter.get('/', GameController.getAllGames)
accessbilityRouter.post('/register', PlayerController.createPlayer)
accessbilityRouter.post('/login', PlayerController.signedPlayer)

module.exports = {accessbilityRouter}