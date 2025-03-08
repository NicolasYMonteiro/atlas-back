//service

const repositories = require('../repositories/task');
const validations = require('../utils/validations');

// Buscar uma task pelo ID
const findTaskById = async (idUser) => {
    await validations.findUserIdByTask(idUser); // valida se o usuário existe 
    return await repositories.getById(idUser);
};

// Buscar uma task pelo ID
const findCompleteTaskById = async (idUser) => {
    await validations.findUserIdByTask(idUser); // Valida se o usuário existe
    return await repositories.getCompleteById(idUser);
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
    console.log("updateTask chamado para ID:", id);

    // Obtém a tarefa específica pelo ID
    const existingTask = await repositories.getTaskById(id);
    if (!existingTask) {
        console.error("Tarefa não encontrada");
        throw new Error("Tarefa não encontrada");
    }

    const existingSubTasks = existingTask.multipleTask || [];
    console.log("Subtarefas atuais:", existingSubTasks);

    // IDs das subtarefas enviadas no PATCH
    const updatedSubTaskIds = data.multipleTask?.map(task => Number(task.id)).filter(Boolean) || [];
    console.log("Subtarefas enviadas no PATCH:", updatedSubTaskIds);

    // Identifica as subtarefas a serem removidas
    const subTasksToRemove = existingSubTasks
        .filter(task => !updatedSubTaskIds.includes(task.id)) // Comparação agora garante que ambos são números
        .map(task => task.id);

    if (subTasksToRemove.length > 0) {
        console.log("Deletando subtarefas:", subTasksToRemove);
        await repositories.deleteSubTasks(subTasksToRemove);
    } else {
        console.log("Nenhuma subtarefa para deletar.");
    }

    // Atualiza e cria subtarefas normalmente
    const updatedTask = await repositories.updateTask(id, {
        ...data,
        multipleTask: {
            updateMany: data.multipleTask
                ?.filter(task => task.id)
                .map(task => ({
                    where: { id: Number(task.id) },
                    data: { title: task.title, verif: task.verif }
                })) || [],
            create: data.multipleTask
                ?.filter(task => !task.id)
                || []
        }
    });

    return updatedTask;
};

const completTask = async (idTask) => {
    return await repositories.completTask(idTask);
};


module.exports = { findTaskById, createTask, updateTask, completTask, findCompleteTaskById };