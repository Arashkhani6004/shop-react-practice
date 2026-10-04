import axios from "axios";

const api = axios.create({ baseURL: "https://fakestoreapi.noksha.dev/api" });

api.interceptors.response.use(
  (response) => response.data.data,
  (error) => Promise.reject(error)
);


export default api;
