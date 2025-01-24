// CONTROLLER

const taskModel = require("../Models/taskModel");
const moment = require('moment');

const getAll = async (req, res) => {
    try {
        const task = await taskModel.getAll();
        return res.status(200).json(task);

    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }

};

const getByValue = async (req, res) => {
  try {
    const idUser = req.user.id;

    const tasks = await taskModel.getByValue(idUser);

    if (tasks.length === 0) {
      return res.status(400).json({ message: "task not found" });
    }
    
    const formattedTasks = tasks.map(task => ({
      ...task,
      date: moment(task.date).format('DD-MM-YYYY'),
      dateCreator: moment(task.dateCreator).format('DD-MM-YYYY')
    }));

    return res.json(formattedTasks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const postTask = async (req, res, next) => {
  try {
    const { title, description, emergency, periodical, date, 
        interval, hour, multiple, dateCreator } = req.body;

    const idUser = req.user.id;

    console.log("informations: ", title, description, emergency, periodical, date, 
      interval, hour, multiple, dateCreator, idUser );

    if (!title || !description || emergency === undefined || periodical === undefined || !date || 
        interval === undefined || !hour || multiple === undefined || !dateCreator || !idUser) {
        throw new Error("Dados Incompletos");
    }

    const task  = await taskModel.postTask(title, description, emergency, periodical, 
        date, interval, hour, multiple, dateCreator, idUser);
    
        console.log("task: ", task)

    return res.status(200).json({ message: "Task Created sucessfully", id: task });

  } catch (error) {
    console.log('erro: ', error)
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const patchTask = async (req, res) => {
  try {
    const { id } = req.params;
    const idUserT = req.user.id;
    const updates = req.body;

    console.log("id: ", id)
    console.log("idUserT: ", idUserT)
    console.log("updates: ", updates)


    if (!id || !updates) {
      return res.status(400).json({ error: "Dados Incompletos" });
    }

    const [user] = await taskModel.getById(id);

    if (!user) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (user.idUser !== idUserT) {
      return res.status(403).json({ message: "Permission denied" });
    }

    if (Object.keys(updates).includes('id') || Object.keys(updates).includes('idUser')) {
      return res.status(400).json({ message: "Invalid update operation" });
    }

    const task = await taskModel.patchTask(id, updates);

    if (!task.affectedRows) {
      return res.status(404).json({ message: "Task não foi modificada" });
    }

    return res.status(200).json({ message: "Task modificado com sucesso" });
  } catch (error) {
    console.error('Erro ao modificar task:', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const delTask = async (req, res) => {
  try {
    const { id } = req.params;
    const idUserT = req.user.id;

    const [user] = await taskModel.getById(id);
    if (!user) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (user.idUser !== idUserT) {
      return res.status(403).json({ message: "Permission denied" });
    }

    const task = await taskModel.delTask(id);

    if (!task.affectedRows) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deletada com sucesso" });
  } catch (error) {
    console.error('Erro ao deletar task:', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
    getAll,
    getByValue,
    postTask,
    patchTask,
    delTask
};
