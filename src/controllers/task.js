//controller/
const services = require('../services/task');

const getTask = async (req, res) => {
  try {
    const idUser = req.user?.id; // ID obtido no token
    const task = await services.findTaskById(idUser);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const createTask = async (req, res) => {
  try {
    let idUser = req.user?.id;
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
    let idUser = req.user?.id;
    const task = await services.updateTask(parseInt(req.params.id), req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const completTask = async (req, res) => {
  try {
    const idTask = parseInt(Number(req.params.id));
    const completedTask = await services.completTask(idTask);
    console.log("return: ", completTask)
    res.status(201).json(completedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCompletTask = async (req, res) => {
  try {
    const idUser = req.user?.id;  // ID obtido no token   
    const task = await services.findCompleteTaskById(idUser);
    console.log("return: ", task)

    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}


module.exports = { getTask, createTask, updateTask, completTask, getCompletTask };