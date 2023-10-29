const router = require('express').Router();

//Handlers
const {
  getAllTeamsHandler,
  getTeamByIdHandler,
  createTeamHandler,
  updateTeamHandler,
  deleteTeamHandler,
} = require('../../handlers/teams');

//Routes

router.get('/', getAllTeamsHandler);
router.get('/:id', getTeamByIdHandler);
router.post('/', createTeamHandler);
router.put('/:id', updateTeamHandler);
router.delete('/:id', deleteTeamHandler);

module.exports = router;
