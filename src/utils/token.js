// src/utils/token.js

const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const dotenv = require("dotenv");

dotenv.config();
const chavetoken = process.env.chavetoken;

function gerarToken(user, res) {
  try {
    const token = jwt.sign({ id: user.id }, chavetoken, { expiresIn: "30d" });

    res.cookie('authToken', token, {
      httpOnly: true,  // Impede que o JavaScript do frontend acesse o cookie
      secure: true,    // Só envia em conexões HTTPS
      sameSite: 'Strict', // Evita CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expira em 7 dias
    });

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Erro ao gerar token:", error);
    return res.status(500).json({ error: "Erro ao gerar token" });
  }
}


function autenticarToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }
  jwt.verify(token, chavetoken, (err, user) => {
    if (err) {
      return res.status(403).json({ mensagem: "Token inválido" });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  autenticarToken,
  gerarToken,
};
