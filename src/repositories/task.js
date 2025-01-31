//repositories

const { prisma } = require('../prismaClient');

const getById = async (id) => {
    return await prisma.task.findUnique({
        where: { id },
        include: { multipleTask: true }
    })
}

const createTask = async (data) => {
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
    return await prisma.task.delete({
        where: { id },
    });
}

module.exports = { getById, createTask, updateTask, removeTask };