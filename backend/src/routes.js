const express = require('express');
const routes = express.Router();

const AuthController = require('./controllers/AuthController');

const CheckAuth = require('./middlewares/auth')

//AUTH
routes.post('/signin', AuthController.signin);
routes.post('/signup', AuthController.signup);

module.exports = routes