const { User } = require('../models');
const { generateToken } = require('../middlewares/generateToken');

const login = async (user) => {
  const { email, password } = user;
  const findUser = await User.findOne({
    where: { email, password },
  });
  if (findUser) {
    const token = generateToken(findUser.dataValues);
    return token;
  }
};

const register = async (newUser) => {
  const findUser = await User.findOne({
    where: { email: newUser.email },
  });
  if (!findUser) {
    const body = {
      ...newUser,
      dark_mode: false,
    };
    await User.create(body);
    return { message: 'Registrado com sucesso!' };
  }
};

const getUser = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  return user;
};

const changeMode = async (user) => {
  const { id } = user
  const body = {
    ...user,
    dark_mode: !user.dark_mode,
  }
  await User.update(body, { where: { id } });
  const { dataValues } = await getUser(id);
  return dataValues;
}

module.exports = { login, register, getUser, changeMode };