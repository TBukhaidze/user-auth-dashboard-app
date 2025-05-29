import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      localStorage.removeItem("token");
      toast.error(
        error.response.status === 403
          ? "Your account has been blocked. Please contact admin."
          : "Session expired or unauthorized. Please login again."
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    }
    return Promise.reject(error);
  }
);

export default api;
