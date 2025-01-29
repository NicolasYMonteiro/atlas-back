const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const testConnection = async () => {
  try {
    await prisma.$connect("SELECT 1"); // Realiza uma consulta de teste
    console.log("Conexão com o banco de dados estabelecida com sucesso! ");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.messagez);
  }
};

testConnection();

module.exports = { prisma };
