// ROUTER

const express = require('express');
const controller = require('../Controllers/subTaskController')
const token = require('../Services/Tokens');

const routerSubTask = express.Router();

//routerUser.get('/task', token.autenticarToken, controller.getAll);

routerSubTask.get('/subtask/:idTask', token.autenticarToken, controller.getByTask);

routerSubTask.post('/subtask/:idTask',  token.autenticarToken, controller.postSubTask);

routerSubTask.patch('/subtask/:idTask', token.autenticarToken, controller.patchSubTask);

//routerUser.delete('/task/:id', token.autenticarToken, controller.delTask);

module.exports = routerSubTask;