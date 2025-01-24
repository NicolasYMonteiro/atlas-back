// MODEL

const querys = require('../DataBase/userQuerys');

const getAll = async () => {
    try {
        return querys.getAll();
    } catch (error) {
        return error;
    };
};

const getByValue = async (Value) => {
    try {
        return await querys.getByValue(Value);
    } catch (error) {
        return error;
    }
}

const postUser = async (name, user, email, password) => {
    try {
        return await querys.postUser(name, user, email, password);
    } catch (error) {
        return error;
    }
};

const patchUser = async (field, values, idTask) => {
    try {
        return await querys.patchUser(field, values);
    } catch (error) {
        return error;
    }
}

const delUser = async (id) => {
    try {
        return await querys.delUser(id);
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAll,
    getByValue,
    postUser,
    patchUser,
    delUser
};