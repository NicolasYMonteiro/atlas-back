import { listen } from './app';
import { config } from "dotenv";

// Carrega variáveis de ambiente do arquivo .env
config();

const PORT = process.env.PORT || 8080;

listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});