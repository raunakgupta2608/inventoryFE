import axios from "axios";
const url = "http://localhost:5000";

const API = axios.create({
  baseURL: url,
});
axios.defaults.headers.common["Content-Type"] = "application/json";

API.interceptors.request.use((request) => {
  request.headers["Content-Type"] = "application/json";
  if (request.url.includes("auth")) return request;

  const token = window.sessionStorage.getItem("token");
  request.headers["x-auth-token"] = token;

  return request;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error in axios", error);
    if (error.response.status === 401) {
      window.location.reload();
    }
  }
);

export default API;
