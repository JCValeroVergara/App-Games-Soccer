const getAllTeams = require('../../controllers/teams/getAllTeams');
const getTeamById = require('../../controllers/teams/getTeamById');
const createTeam = require('../../controllers/teams/createTeam');
const updateTeam = require('../../controllers/teams/updateTeam');
const deleteTeam = require('../../controllers/teams/deleteTeam');

const getAllTeamsHandler = async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getTeamByIdHandler = async (req, res) => {
  try {
    const team = await getTeamById(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    } else {
      res.status(200).json(team);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const createTeamHandler = async (req, res) => {
  try {
    const team = await createTeam(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateTeamHandler = async (req, res) => {
  try {
    const team = await updateTeam(req.params.id, req.body);
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteTeamHandler = async (req, res) => {
  try {
    const team = await deleteTeam(req.params.id);
    res.status(200).json(team);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getAllTeamsHandler,
  getTeamByIdHandler,
  createTeamHandler,
  updateTeamHandler,
  deleteTeamHandler,
};
