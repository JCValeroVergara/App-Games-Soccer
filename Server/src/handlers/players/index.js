const getAllPlayers = require('../../controllers/players/getAllPlayer');
const getPlayerById = require('../../controllers/players/getPlayerById');
const createPlayer = require('../../controllers/players/createPlayer');
const updatePlayer = require('../../controllers/players/updatePlayer');
const deletePlayer = require('../../controllers/players/deletePlayer');

const getAllPlayersHandler = async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.status(200).json(players);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getPlayerByIdHandler = async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    } else {
      res.status(200).json(player);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const createPlayerHandler = async (req, res) => {
  try {
    const player = await createPlayer(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updatePlayerHandler = async (req, res) => {
  try {
    const player = await updatePlayer(req.params.id, req.body);
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deletePlayerHandler = async (req, res) => {
  try {
    const player = await deletePlayer(req.params.id);
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getAllPlayersHandler,
  getPlayerByIdHandler,
  createPlayerHandler,
  updatePlayerHandler,
  deletePlayerHandler,
}
