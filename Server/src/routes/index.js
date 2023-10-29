const express = require('express');

const playersRouter = require('./players/router');
const teamsRouter = require('./teams/router');
const gamesRouter = require('./games/router');
const fieldsRouter = require('./fileds/router');



function routerApi(app) {
  const router = express.Router();

  app.use('/api', router);
  router.use('/players', playersRouter);
  router.use('/teams', teamsRouter);
  router.use('/games', gamesRouter);
  router.use('/fields', fieldsRouter);
}



module.exports = routerApi;
