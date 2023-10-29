const router = require('express').Router();

//Handlers
const { getAllPlayersHandler, getPlayerByIdHandler, createPlayerHandler, updatePlayerHandler, deletePlayerHandler } = require('../../handlers/players');

//Routes

router.get('/', getAllPlayersHandler);
router.get('/:id', getPlayerByIdHandler);
router.post('/', createPlayerHandler);
router.put('/:id', updatePlayerHandler);
router.delete('/:id', deletePlayerHandler);

module.exports = router;

