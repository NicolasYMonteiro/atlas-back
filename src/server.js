const app = require('./app');
const dotenv = require("dotenv");

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const PORT = process.env.PORT || 3003;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});