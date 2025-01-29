// src/controllers/userController.js
const userService = require('../services/user');

// Buscar usuário por ID
const getUser = async (req, res) => {
  try {
    const user = await userService.findUserById(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Registrar um novo usuário
const createUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUser, createUser };