// src/services/userService.js
const userRepository = require('../repositories/user');

// Buscar um usuário pelo ID
const findUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  return user;
};

// Criar um novo usuário com validação
const registerUser = async (data) => {
  const { email, user } = data;

  // Verificar se o e-mail ou usuário já existe
  const existingUser = await userRepository.findExistingUser({
    where: { OR: [{ email }, { user }] },
  });

  if (existingUser) {
    throw new Error('E-mail ou usuário já cadastrado');
  }

  // Criar o usuário
  return userRepository.createUser(data);
};

module.exports = { findUserById, registerUser };