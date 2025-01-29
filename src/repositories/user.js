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

// Verificar se um e-mail ou nome de usuário já existe
const findExistingUser = async ({ email, user }) => {
  return prisma.user.findFirst({
    where: { OR: [{ email }, { user }] },
  });
};
module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    findExistingUser
};