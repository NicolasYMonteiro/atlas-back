const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const testConnection = async ( retries = 6, delay = 5000) => { // 30 segundos
  for(let attempt = 1; attempt <= retries; attempt++) {
    try {
      await prisma.$connect("SELECT 1"); // Realiza uma consulta de teste
      console.log("Conexão com o banco de dados estabelecida com sucesso! ");
    } catch (error) {
      console.error(`Tentativa ${attempt} falhou:`, error.message);
      if (attempt < retries) {
        console.log(`Tentando novamente em ${delay / 1000} segundos...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("Falha ao conectar ao banco de dados após várias tentativas.");
        process.exit(1); // Finaliza o processo com erro
      }
    }
  }
};

testConnection();

module.exports = { prisma };
