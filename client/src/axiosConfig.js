import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    const persistedAuth = window.localStorage.getItem("persist:auth");
    const token =
      persistedAuth && JSON.parse(persistedAuth)?.token?.slice(1, -1);

    config.headers = {
      ...config.headers,
      authorization: token ? `Bearer ${token}` : null,
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
