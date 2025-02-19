const express = require('express');
const controller = require('../controllers/task');
const token = require('../utils/token');

const router = express.Router();

router.get('/task', token.autenticarToken, controller.getTask); // GET /user/:id
router.post('/task', controller.createTask); // POST /users
router.patch('/task/:id', controller.updateTask); // PATCH /user/:id
//router.delete('/user/:id', controller.deleteTasl); // DELETE /user/:id

module.exports = router;