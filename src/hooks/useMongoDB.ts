import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetTasks = async (completed?: string) => {
  const response = await axios.get(
    `${API_URL}/api/tasks?completed=${completed}`
  );
  return response.data;
};

export const useCreateTask = async (task: {
  title: string;
  description?: string;
}) => {
  const response = await axios.post(`${API_URL}/api/tasks`, task);
  return response.data;
};

export const useUpdateTask = async (task: {
  _id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}) => {
  const response = await axios.put(`${API_URL}/api/tasks/${task._id}`, task);
  return response.data;
};

export const useRemoveTask = async (id: string) => {
  await axios.delete(`${API_URL}/api/tasks/${id}`);
};
export const useRegister = async (user: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/api/user-register`, user);
  return response;
};

export const useLogin = async (user: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/api/user-login`, user);
  return response;
};
