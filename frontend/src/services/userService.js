import api from "./api";

export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const blockUsers = async (ids) => {
  const response = await api.post("/users/block", { ids });
  return response.data;
};

export const unblockUsers = async (ids) => {
  const response = await api.post("/users/unblock", { ids });
  return response.data;
};

export const deleteUsers = async (ids) => {
  const response = await api.post("/users/delete", { ids });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};
