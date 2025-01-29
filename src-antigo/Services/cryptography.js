const bcrypt = require('bcrypt');

const saltRounds = 5;

async function crypto(senha) {
    try {
        const hash = await bcrypt.hash(senha, saltRounds);
        return hash;
    } catch (err) {
        throw err;
    }
}

async function compararCripto(senha, hash) {
    try {
        const result = await bcrypt.compare(senha, hash);
        return result;
    }catch (error) {
        console.error("Erro ao fazer login");
    };
};
  

module.exports = {
    crypto,
    compararCripto
};
