// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/user/:id', userController.getUser); // GET /user/:id
router.post('/user', userController.createUser); // POST /users
router.patch('/user/:id', userController.updateUser); // PATCH /user/:id
router.delete('/user/:id', userController.deleteUser); // DELETE /user/:id

module.exports = router;