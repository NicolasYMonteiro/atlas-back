//controller/
const repositories = require('../repositories/task');
const services = require('../services/task');

const getTask = async (req, res) => {
  try {
    let idUser = 1; // vai ser substituido mais tarde pelo ID obtido no token
    const task = await services.findTaskById(parseInt(idUser), parseInt(req.params.id));
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const createTask = async (req, res) => {
  try {
    let idUser = 1; // vai ser substituido mais tarde pelo ID obtido no token
    const task = await services.createTask({ ...req.body, idUser });
    /*  Usar ...req.body quando você quiser copiar os dados e adicionar/modificar 
        propriedades antes de passar o objeto. 
    */
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateTask = async (req, res) => {
    try {
        let idUser = 1; // vai ser substituido mais tarde pelo ID obtido no token
        const task = await services.updateTask(parseInt(req.params.id), req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getTask, createTask, updateTask};