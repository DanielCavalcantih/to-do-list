const { taskSchema } = require('./schemas');

const taskValidation = async (req, res, next) => {
  const validation = taskSchema.validate(req.body);
  if (validation.error) return res.status(404).json({ message: 'Verify the fields!' });
  return next();
};

module.exports = { taskValidation };