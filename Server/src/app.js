const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routerApi = require('./routes/index');

const app = express();

// Middlewares
const corsOptions = {
  origin: 'https://app-games-soccer.vercel.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routerApi(app);

module.exports = app;
