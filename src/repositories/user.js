// src/repositories/repositories.js

const { prisma } = require('../prismaClient');

// get by id
const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { tasks: true },
  });
};

// create
const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

// update
const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

// delete
const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

// Verificar se um email ou nome de usuário já existe
const findExistingUser = async (email, user) => {
  return await prisma.user.findFirst({
    where: { OR: [{ email }, { user }] },
  });
};

// Busca o usuário pelo email
const findUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: { email },
    include: { tasks: true }
  });

  if (!user) {
    throw new Error('Email não cadastrado');
  }

  return user;
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findExistingUser,
  findUserByEmail
};