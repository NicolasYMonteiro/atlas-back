// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/:id', userController.getUser); // GET /users/:id
router.post('/user', userController.createUser); // POST /users

module.exports = router;