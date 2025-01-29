// QUERYS

const mysql = require('./connection');

const getAll = async () => {
    try {
        const query = "SELECT * FROM Task";
        const [task] = await mysql.query(query);
        return task;    
    } catch (error) {

        /*return error;

        Dessa forma também é possível:*/
        let mensagem = "error in queries: " + error;
        return mensagem;
        
    };

};

const getByValue = async (idUser) => {
    try {
        const query = `SELECT * FROM Task WHERE idUser = ?`;

        const [task] = await mysql.query(query, [idUser]);
        return task
    } catch (error) {
        return error;
    }
}

const getById = async (id) => {
    try {
        const query = `SELECT * FROM Task WHERE id = ?`;

        const [task] = await mysql.query(query, [id]);
        return task
    } catch (error) {
        return error;
    }
}

const postTask = async (title, description, emergency, periodical, date, interval, hour, multiple, dateCreator, idUser) => {
    try {
        const query = `INSERT INTO Task (title, description, emergency, 
        periodical, date, \`interval\`, hour, multiple, dateCreator, idUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await mysql.query(query, [title, description, emergency, 
            periodical, date, interval, hour, multiple, dateCreator, idUser]);

        return result.insertId;
    } catch (error) {
        return error;
    }
};

const patchTask = async (id, updates) => {
    try {
        // Verifica se 'updates' é um objeto e contém pelo menos um campo
        if (typeof updates !== 'object' || !Object.keys(updates).length) {
            throw new Error("Invalid updates object");
        }

        const fields = Object.keys(updates);
        const values = Object.values(updates);
        values.push(id);

        // Monta a cláusula SET para a query
        const setClause = fields.map(field => `${mysql.escapeId(field)} = ?`).join(", ");

        const query = `UPDATE Task SET ${setClause} WHERE id = ?`;

        // Executa a query
        const [result] = await mysql.query(query, values);

        return result;

    } catch (error) {
        console.error("Error updating task:", error);
        throw error; // Re-lança o erro para tratamento externo
    }
};

const delTask = async (id) => {
    try {
        const query = "DELETE FROM Task WHERE id = ?";
        const [result] = await mysql.query(query, [id]);
        return result;
    } catch (error) {
        return error;
    }

};

module.exports = {
    getAll,
    getByValue,
    getById,
    postTask,
    patchTask,
    delTask
};