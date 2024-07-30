import store from "@/store/store";
import axios from "axios";

const repository = import.meta.env.VITE_APP_REPOSITORY;

const guest = axios.create({
  // withCredentials: true,
  baseURL: `http://localhost/${repository}/public/user`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
});

const api = axios.create({
  // withCredentials: true,
  baseURL: `http://localhost/${repository}/public/`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 400) {
      store.dispatch("logout");
    } else {
      return Promise.reject(error);
    }
  }
);

export { guest, api };
