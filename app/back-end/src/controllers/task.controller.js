const taskService = require('../services/task.service');

const getTasks = async (req, res) => {
  const { id } = req.payload;
  const tasks = await taskService.getTasks(id);
  return res.status(200).json(tasks);
};

const insertTask = async (req, res) => {
  const { id } = req.payload;
  const newTask = await taskService.insertTask(req.body, id);
  return res.status(201).json(newTask);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await taskService.updateTask(req.body, id);
  return res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await taskService.deleteTask(id);
  return res.status(202).json({ message: 'Deleted!' });
};

module.exports = {
  getTasks,
  insertTask,
  deleteTask,
  updateTask,
};