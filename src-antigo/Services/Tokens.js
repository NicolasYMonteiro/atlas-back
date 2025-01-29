const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const dotenv = require("dotenv");

dotenv.config();
const chavetoken = process.env.chavetoken;

function gerarToken(user, res) {
  try {
    const token = jwt.sign({ id: user.id }, chavetoken, { expiresIn: "30d" });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwtToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60, //15 dias
        path: "/",
      })
    );

    return res.json({ token });
  } catch (error) {
    console.error("Erro ao gerar token");
    throw error;
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
