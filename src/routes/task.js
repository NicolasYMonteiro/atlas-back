const express = require('express');
const controller = require('../controllers/task');
const token = require('../utils/token');

const router = express.Router();

router.get('/task', token.autenticarToken, controller.getTask); // GET /user/:id
router.post('/task' , token.autenticarToken, controller.createTask); // POST /users
router.patch('/task/:id', token.autenticarToken, controller.updateTask); // PATCH /user/:id
router.post('/task/complete/:id', token.autenticarToken, controller.completTask);
router.get('/task/complete', token.autenticarToken, controller.getCompletTask);


module.exports = router;