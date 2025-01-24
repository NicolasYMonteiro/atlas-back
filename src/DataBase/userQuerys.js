// QUERYS

const mysql = require('./connection');

const getAll = async () => {
    try {
        const query = "SELECT * FROM User";
        const [user] = await mysql.query(query);
        return user;    
    } catch (error) {

        /*return error;

        Dessa forma também é possível:*/
        let mensagem = "error in queries: " + error;
        return mensagem;
        
    };

};

const getByValue = async (Value) => {
    try {
        const field = Object.keys(Value);
        const value = Object.values(Value);

        const query = `SELECT * FROM User WHERE ${field} = ?`;
        const [user] = await mysql.query(query, [value]);

        return user
    } catch (error) {
        return error;
    }
}

const postUser = async (name, user, email, password) => {
    try {
        const query = "INSERT INTO User (name, user, email, password) VALUES (?, ?, ?, ?)";
        const [result] = await mysql.query(query, [name, user, email, password]);
        return result;
    } catch (error) {
        return error;
    }
};

const patchUser = async (id, updates) => { //field, modified
    try {
        console.log("updates", updates)
        const fields = Object.keys(updates);
        const values = Object.values(updates);

        console.log("fields", fields)
        console.log("values", values)

        values.push(id);
        const setClause = fields.map(field => `${field} = ?`).join(", ");
        
        const query = `UPDATE User SET ${setClause} WHERE id = ?`;
        const [result] = await mysql.query(query, values);
        return result;

    } catch (error) {
        return error;
    }
};

const delUser = async (id) => {
    try {
        const query = "DELETE FROM User WHERE id = ?";
        const [result] = await mysql.query(query, [id]);
        return result;
    } catch (error) {
        return error;
    }

};

module.exports = {
    getAll,
    getByValue,
    postUser,
    patchUser,
    delUser
};