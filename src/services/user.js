// src/services/userService.js

const userRepository = require('../repositories/user');
const validations = require('../utils/validations')
const cryptography = require('../utils/cryptography');
const bcrypt = require('bcrypt');


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

  // Verificar formato do email
  const regexEmail = await validations.validationEmail(email);
  if(regexEmail == false){
    throw new Error('Formato inválido de email');
  }

  // Verificar se o e-mail ou usuário já existe
  const existingUser = await userRepository.findExistingUser(email, user);

  if (existingUser) {
    throw new Error('E-mail ou usuário já cadastrado');
  }

  // Criptografia de senha
  data.password = await cryptography.createCrypto(data.password);

  // Criar o usuário
  return userRepository.createUser(data);
};


// Update de usuário com validação
const updateUser = async (id, data) => {

  if(data.email || data.user){
    const { email, user } = data;

    // Verificar se o e-mail ou usuário já existe
    const existingUser = await userRepository.findExistingUser(email, user);

    if (existingUser) {
      throw new Error('E-mail ou usuário já cadastrado');
    }
  }
  
  // update usuário
  return userRepository.updateUser(id, data);
};

const login = async (email, senha) => {
  const user = await userRepository.findUserByEmail(email);

  const senhaCorreta = await bcrypt.compare(senha, user.password);

  if (!senhaCorreta) {
    throw new Error('Senha incorreta');
  }

  return user;
};


module.exports = { findUserById, registerUser, updateUser, login };