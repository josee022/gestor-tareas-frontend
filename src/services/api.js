import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem("user_id");
  if (userId) {
    if (config.method === "get") {
      config.params = { ...config.params, user_id: userId };
    } else {
      config.data = { ...config.data, user_id: userId };
    }
  }
  return config;
});

export default api;
