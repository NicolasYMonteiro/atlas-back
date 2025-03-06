//repositories

const { prisma } = require('../prismaClient');

const getById = async (idUser) => {
    return await prisma.task.findMany({
        where: { idUser },
        include: { multipleTask: true }
    })
}

const getCompleteById = async (idUser) => {
    return await prisma.task.findMany({
        where: { idUser },
        include: { taskCompletion: true }
    })
};


const getTaskById = async (id) => {
    return await prisma.task.findUnique({
        where: { id },
        include: { multipleTask: true }
    });
};


const createTask = async (data) => {
    console.log("data repositories: ", data)
    return await prisma.task.create({
        data,
        include: { multipleTask: true }
    });
}

const updateTask = async (id, data) => {
    return await prisma.task.update({
        where: { id },
        data,
        include: { multipleTask: true }
    });
}

const removeTask = async (id) => {
    await prisma.multipleTask.deleteMany({
        where: { idTask: id }
    });
    return await prisma.task.delete({
        where: { id: id },
    });
}

const deleteSubTasks = async (subTaskIds) => {
    for (const id of subTaskIds) {
        await prisma.multipleTask.delete({
            where: { id }
        }).catch(err => console.error(`Erro ao deletar subtarefa ${id}:`, err));
    }
};

const completTask = async (idTask) => {
    // Verifica se a tarefa existe e se é periódica
    const task = await prisma.task.findUnique({
        where: { id: idTask },
    });

    if (!task) {
        throw new Error("Tarefa não encontrada.");
    }

    if (task.periodical == 0) {
        console.log("remove Task");
        return await removeTask(idTask);
    }

    // Registra a conclusão da tarefa no banco de dados
    return await prisma.taskCompletion.create({
        data: {
            taskId: idTask,
            completion: new Date(),
        }
    });
};

module.exports = { getById, createTask, updateTask, removeTask, deleteSubTasks, getTaskById, completTask, getCompleteById };