const bcrypt = require('bcrypt');

const saltRounds = 5;

async function createCrypto(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        throw err;
    }
}

async function compararCripto(password, hash) {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    }catch (error) {
        throw err;
    };
};
  

module.exports = {
    createCrypto,
    compararCripto
};
