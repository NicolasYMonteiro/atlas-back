const express = require('express');
const controller = require('../controllers/task');

const router = express.Router();

router.get('/task/:id', controller.getTask); // GET /user/:id
router.post('/task', controller.createTask); // POST /users
router.patch('/task/:id', controller.updateTask); // PATCH /user/:id
//router.delete('/user/:id', controller.deleteTasl); // DELETE /user/:id

module.exports = router;