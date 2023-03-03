const { Router } = require('express');
const { tokenValidation } = require('../middlewares/token.validation');
const { taskValidation } = require('../middlewares/task.validation');
const taskController = require('../controllers/task.controller');

const taskRouter = Router();

taskRouter.get('/tasks', tokenValidation, taskController.getTasks);
taskRouter.post('/tasks', tokenValidation, taskValidation, taskController.insertTask);
taskRouter.put('/tasks/:id', tokenValidation, taskController.updateTask);
taskRouter.delete('/tasks/:id', tokenValidation, taskController.deleteTask);

module.exports = { taskRouter };