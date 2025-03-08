// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user');
const token = require('../utils/token');

const router = express.Router();

router.get('/user/:id', userController.getUser); // GET /user/:id
router.post('/user', userController.createUser); // POST /users
router.patch('/user/:id', userController.updateUser); // PATCH /user/:id
router.delete('/user/:id', userController.deleteUser); // DELETE /user/:id

router.post('/login', userController.login); // LOGIN /login
router.get('/login', token.autenticarToken, userController.getUser);

module.exports = router;