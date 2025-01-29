// Querys

const mysql = require('./connection');

const getByTask = async (idTask) => {
    try {
        const query = "SELECT * FROM SubTask WHERE idTask = ?";
        const subTask = await mysql.query(query, [idTask]);
        return subTask;
    } catch (error) {
        return error;
    }
}

const postSubTask = async (idTask, title) => {
    try {
        const query = "INSERT INTO SubTask (idTask, title, verif) VALUES (?, ?, false)";
        const subTask = await mysql.query(query, [idTask, title]);
        return subTask
    } catch (error) {
        throw new Error(`Erro ao inserir subtask: ${error.message}`); // Lança o erro para o controlador
            }
}

const patchSubTask = async (id, field, value, idTask) => {
    try {
        console.log('query values: ', value);
        console.log('query idTask: ', idTask);
        console.log('query idSubTask: ', id);

        // Alterando a subtarefa específica, usando idSubTask e idTask
        const query = `UPDATE SubTask SET ${field} = ? WHERE id = ? AND idTask = ?`;

        console.log('query patch: ', query);

        // Executa a query no banco de dados
        const subTask = await mysql.query(query, [value, id, idTask]);

        console.log('query subTask: ', subTask);
        return subTask;
    } catch (error) {
        return error;
    }
}

const deleteSubTask = async (idTask) => {
    try {
        const query = "DELETE FROM SubTask WHERE idTask = ?";
        const subTask = mysql.query(query, [idTask]);
        return subTask;
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