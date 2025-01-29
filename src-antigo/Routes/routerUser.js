// ROUTER

const express = require('express');
const userController = require('../Controllers/userController');
const token = require('../Services/Tokens');

const routerUser = express.Router();

routerUser.get('/user', userController.getAll);

routerUser.get('/user', userController.getByValue);

routerUser.post('/login', userController.login);
routerUser.get('/login', token.autenticarToken, userController.getByValue);

routerUser.post('/user', userController.postUser, userController.login);

routerUser.patch('/user/:id', token.autenticarToken, userController.patchUser);

routerUser.delete('/user/:id', token.autenticarToken, userController.delUser);

module.exports = routerUser;