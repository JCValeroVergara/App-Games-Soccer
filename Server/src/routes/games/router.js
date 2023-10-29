const router = require('express').Router();

//Handlers
const {
  getAllGamesHandler,
  getGameByIdHandler,
  createGameHandler,
  updateGameHandler,
  deleteGameHandler,
} = require('../../handlers/games');

//Routes

router.get('/', getAllGamesHandler);
router.get('/:id', getGameByIdHandler);
router.post('/', createGameHandler);
router.put('/:id', updateGameHandler);
router.delete('/:id', deleteGameHandler);

module.exports = router;
