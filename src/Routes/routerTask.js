// ROUTER

const express = require('express');
const controller = require('../Controllers/taskController');
const token = require('../Services/Tokens');

const routerTask = express.Router();

//routerUser.get('/task', token.autenticarToken, controller.getAll);

routerTask.get('/task', token.autenticarToken, controller.getByValue);

routerTask.post('/task',  token.autenticarToken, controller.postTask);

routerTask.patch('/task/:id', token.autenticarToken, controller.patchTask);

routerTask.delete('/task/:id', token.autenticarToken, controller.delTask);

module.exports = routerTask;