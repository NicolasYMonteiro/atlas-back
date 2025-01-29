// CONTROLLER

const model = require("../Models/subTaskModel");

const getByTask = async (req, res) => {
  try {
    const { idTask } = req.params;

    const subTask = await model.getByTask(idTask);
    return res.status(200).json(subTask);

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

};

const postSubTask = async (req, res, next) => {
  try {

    console.log('req.body:', req.body);
    console.log('req.params:', req.params);

    const vetorSubTask = req.body;
    const { idTask } = req.params;

    console.log("informations: ", idTask, vetorSubTask);

    if (!idTask || !vetorSubTask) {
      throw new Error("Dados Incompletos");
    }

    console.log("tentei excluir");
    await deleteSubTask(idTask);
    console.log("tirei do ar");

    for (let i = 0; i < vetorSubTask.length; i++) {
      const subTaskTitle = vetorSubTask[i];
      console.log(`Sub Task ${i}: ${subTaskTitle}`);
      const subTask = await model.postSubTask(idTask, subTaskTitle);
      console.log(`Result ${i}: ${subTask}`);
    }

    return res.status(200).json({ message: "SubTasks Created successfully" });

  } catch (error) {
    console.log('erro: ', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const patchSubTask = async (req, res) => {
  try {
    console.log("ta chamando controller");

    const { idTask } = req.params;  // idTask da tarefa principal
    const updates = req.body; // esperado: [{ idSubTask: id1, field: "field1", value: "value1" }, ...]

    console.log("updates: ", updates)

    if (!idTask || !Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ error: "Invalid updates format or missing idTask" });
    }

    // Loop pelas atualizações
    for (const update of updates) {
      const { id, field, value } = update;

      // Chama a função do modelo para atualizar a subtarefa
      const result = await model.patchSubTask(id, field, value, idTask);
      console.log("result controller: ", result);

    }

    return res.status(200).json({ message: "SubTask modificado com sucesso" });
  } catch (error) {
    console.error("Erro ao modificar task:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const deleteSubTask = async (idTask) => {
  try {
    const task = await model.deleteSubTask(idTask);
    return task; // Retorna o resultado da operação
  } catch (error) {
    console.error('Erro ao deletar task:', error);
    throw error; // Repassa o erro para ser tratado pelo chamador
  }
};

module.exports = {
  getByTask,
  postSubTask,
  patchSubTask,
  deleteSubTask
}