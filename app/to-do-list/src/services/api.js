import axios from "axios";
import router from "@/router";

export const login = async (user) => {
  const response = await axios.post('http://localhost:3001/login', user);
  localStorage.setItem('token', response.data.token);
  return router.push('/');
};

export const register = async (newUser) => {
  await axios.post('http://localhost:3001/register', newUser);
};

export const getTasks = async () => {
  const token = localStorage.getItem('token');
  const tasks = await axios.get('http://localhost:3001/tasks', {
    headers: {
      Authorization: token,
    },
  });
  return tasks.data;
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get('http://localhost:3001/user', {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const changeMode = async () => {
  const token = localStorage.getItem('token');
  const body = await getUser();
  const { data } = await axios.put('http://localhost:3001/change-mode', body, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const insertTask = async (newTask) => {
  const token = localStorage.getItem('token');
  await axios.post('http://localhost:3001/tasks', newTask, {
    headers: {
      Authorization: token,
    },
  });
};

export const changeTaskStatus = async (taskId, status) => {
  const token = localStorage.getItem('token');
  await axios.put(`http://localhost:3001/tasks/${taskId}`, { status }, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`http://localhost:3001/tasks/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const updateTask = async (taskId, body) => {
  const token = localStorage.getItem('token');
  await axios.put(`http://localhost:3001/tasks/${taskId}`, body, {
    headers: {
      Authorization: token,
    },
  });
};