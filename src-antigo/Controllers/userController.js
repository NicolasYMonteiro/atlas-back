// CONTROLLER

const userModel = require("../Models/userModel");
const cryptography = require("../Services/cryptography");
const token = require("../Services/Tokens");

const getAll = async (req, res) => {
    try {
        const user = await userModel.getAll();
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }

};

const getByValue = async (req, res) => {
  try {
    const tokenUserId = req.user?.id;
    let requestValue = req.body;
    if (tokenUserId) {
      requestValue = { id: tokenUserId };
    }

    const user = await userModel.getByValue(requestValue);

    if (user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    console.log('Request received:', req.body);
    const { email, password } = req.body;

    const user = await userModel.getByValue({ email });

    if (user.length === 0) {
      return res.status(404).send("User not found");
    }

    const foundUser = user[0];
    const match = await cryptography.compararCripto(
      password,
      foundUser.password
    );

    if (!match) {
      return res.status(401).send("Invalid password");
    }

    await token.gerarToken(foundUser, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login." });
  }
};

const postUser = async (req, res, next) => {
  try {
    console.log('Request received:', req.body);
    const { name, user, email, password } = req.body;

    if (!name || !user || !password || !email) {
      return res.status(400).json({ error: "Dados Incompletos" });
    }

    await userModel.postUser(
      name,
      user,
      email,
      await cryptography.crypto(password)
    );

    req.body = { email, password };
    next();

  } catch (error) {
    console.log('erro: ', error)
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id || !updates) {
      return res.status(400).json({ error: "Dados Incompletos" });
    }

    const user = await userModel.patchUser(id, updates);

    if (!user.affectedRows) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Usuário modificado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const delUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.delUser(id);

    if (!user.affectedRows) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAll,
  getByValue,
  login,
  postUser,
  patchUser,
  delUser,
};
