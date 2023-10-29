const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routerApi = require('./routes/index');

const app = express();

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

routerApi(app);


module.exports = app;
