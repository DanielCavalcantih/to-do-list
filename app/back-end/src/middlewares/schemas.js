const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(7).required(),
});

const registerSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const taskSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
});

module.exports = { loginSchema, registerSchema, taskSchema };