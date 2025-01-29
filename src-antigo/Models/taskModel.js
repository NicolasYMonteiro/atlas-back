// MODEL

const querys = require('../DataBase/taskQuerys');

const getAll = async () => {
    try {
        return querys.getAll();
    } catch (error) {
        return error;
    };
};

const getByValue = async (idUser) => {
    try {
        return await querys.getByValue(idUser);
    } catch (error) {
        return error;
    }
}

const getById = async (id) => {
    try {
        return await querys.getById(id);
    } catch (error) {
        return error;
    }
}

const postTask = async (title, description, emergency, periodical, date, interval, hour, multiple, dateCreator, idUser) => {
    try {
        return await querys.postTask(title, description, emergency, periodical, date, interval, hour, multiple, dateCreator, idUser);
    } catch (error) {
        return error;
    }
};

const patchTask = async (id, updates) => {
    try {
        return await querys.patchTask(id, updates);
    } catch (error) {
        return error;
    }
}

const delTask = async (id) => {
    try {
        return await querys.delTask(id);
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAll,
    getByValue,
    getById,
    postTask,
    patchTask,
    delTask
};