// src/controllers/userController.js

const userService = require('../services/user');
const userRepository = require('../repositories/user');
const token = require('../utils/token');

// Buscar usuário por ID
const getUser = async (req, res) => {
  try {
    const tokenUserId = req.user?.id;
    const user = await userService.findUserById(parseInt(tokenUserId));
    //console.log("user: ", user)
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

// Update de usuário
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(parseInt(req.params.id), req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete usuário
const deleteUser = async (req, res) => {
  try {
    const user = await userRepository.deleteUser(parseInt(req.params.id));
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Logar usuário
const login = async (req, res) => {
  try {
    const {email, senha} = req.body;
    const user = await userService.login(email, senha);
    await token.gerarToken(user, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getUser, createUser, updateUser, deleteUser, login };