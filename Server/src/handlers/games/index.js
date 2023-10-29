const getAllGames = require('../../controllers/games/getAllGames');
const getGameById = require('../../controllers/games/getGameById');
const createGame = require('../../controllers/games/createGame');
const updateGame = require('../../controllers/games/updateGame');
const deleteGame = require('../../controllers/games/deleteGame');

const getAllGamesHandler = async (req, res) => {
  try {
    const games = await getAllGames();
    res.status(200).json(games);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getGameByIdHandler = async (req, res) => {
  try {
    const game = await getGameById(req.params.id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    } else {
      res.status(200).json(game);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const createGameHandler = async (req, res) => {
  try {
    const game = await createGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateGameHandler = async (req, res) => {
  try {
    const game = await updateGame(req.params.id, req.body);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteGameHandler = async (req, res) => {
  try {
    const game = await deleteGame(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getAllGamesHandler,
  getGameByIdHandler,
  createGameHandler,
  updateGameHandler,
  deleteGameHandler,
};
