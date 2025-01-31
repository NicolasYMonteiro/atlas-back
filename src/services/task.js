//service

const repositories = require('../repositories/task');
const validations = require('../utils/validations');

// Buscar uma task pelo ID
const findTaskById = async (idUser, id) => {
    await validations.findUserIdByTask(idUser); // valida se o usuário existe 
    return await repositories.getById(id);
};

const createTask = async (data) => {
    return await repositories.createTask({
        ...data,
        multipleTask: {
            create: data.multipleTask
        }
    });
}

const updateTask = async (id, data) => {
    return await repositories.updateTask(id, {
        ...data,
        multipleTask: data.multipleTask ? {
            updateMany: data.multipleTask
                .filter(task => task.id) // Atualiza apenas as que têm ID
                .map(task => ({
                    where: { id: parseInt(task.id) },
                    data: { title: task.title, verif: task.verif }
                })),
            create: data.multipleTask
                .filter(task => !task.id) // Cria apenas as que não têm ID
        } : undefined
    });
};

module.exports = { findTaskById, createTask, updateTask };