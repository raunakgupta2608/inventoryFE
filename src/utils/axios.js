import axios from "axios";

const url = "http://localhost:2000";
const API = axios.create({
  baseURL: url,
});

axios.defaults.headers.common["Content-Type"] = "application/json";

export default API;
