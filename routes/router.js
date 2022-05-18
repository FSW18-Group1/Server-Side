const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/playerController')

router.get('/', PlayerController.getPlayers);
router.post('/', PlayerController.createPlayer);
router.get('/:id', PlayerController.getPlayerById);
router.put('/:id', PlayerController.updatePlayer);
router.delete('/:id', PlayerController.deletePlayer);

module.exports = {router}