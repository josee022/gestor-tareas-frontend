import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers["Authorization"];
    localStorage.removeItem("token");
  }
};

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

export default api;
