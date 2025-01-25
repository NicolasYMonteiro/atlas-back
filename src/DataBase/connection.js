const mysql = require("mysql2/promise");

require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: 44181,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

const testConnection = async () => {
    try {
        await connection.query('SELECT 1'); // Realiza uma consulta de teste
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados (', process.env.MYSQL_HOST,'):', error.message);
    }
};

testConnection();

module.exports = connection;


module.exports = connection;