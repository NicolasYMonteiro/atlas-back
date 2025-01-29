// MODEL

const querys = require("../DataBase/subTaskQuerys");

const getByTask = async (idTask) => {
    try {
        return await querys.getByTask(idTask);    
    } catch (error) {
        return error;
    };
}

const postSubTask = async (idTask, title) => {
    try {
        return await querys.postSubTask(idTask, title)
    } catch (error) {
        return error;
    }
}

const patchSubTask = async (id, field, value, idTask) => {
    try {
        return await querys.patchSubTask(id, field, value, idTask);
    } catch (error) {
        return error;
    }
}

const deleteSubTask = async (idTask) => {
    try {
        return await querys.deleteSubTask(idTask)
    } catch (error) {
        return error;
    }
}

module.exports = {
    getByTask,
    postSubTask,
    patchSubTask,
    deleteSubTask
}