const express = require('express');
const { userRouter } = require('./routes/user.route');
const { taskRouter } = require('./routes/task.route');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
