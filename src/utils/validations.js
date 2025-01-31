const repositoriesUser = require('../repositories/user');

const validationEmail = async (email) => {
    const regex = /^[a-zA-Z0-9]{4,}@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}$/;

    return regex.test(email);
}

// Buscar uma task pelo ID
const findUserIdByTask = async (id) => {
    const user = await repositoriesUser.getUserById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
};

module.exports = { validationEmail, findUserIdByTask };
