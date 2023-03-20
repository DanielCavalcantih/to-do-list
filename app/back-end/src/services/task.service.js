const { Task } = require('../models');

const getTasks = async (userId) => {
  const tasks = await Task.findAll({ where: { user_id: userId } });
  return tasks;
};

const insertTask = async (task, id) => {
  const newTask = {
    ...task,
    status: 'Pending',
    user_id: id,
  };
  const createdTask = await Task.create(newTask);
  return createdTask;
};

const updateTask = async (task, id) => {
  const updatedTask = await Task.update(task, {
    where: { id },
  });
  return updatedTask;
};

const deleteTask = async (id) => {
  await Task.destroy({
    where: { id },
  });
};

module.exports = {
  getTasks,
  insertTask,
  deleteTask,
  updateTask,
};