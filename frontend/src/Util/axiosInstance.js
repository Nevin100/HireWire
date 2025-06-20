import axios from "axios";
import { BASE_URL } from "./ApiPath.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // ✅ Required for sending cookies
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - redirecting to login");
      // Optional: add redirection logic
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";
// import { BASE_URL } from "./ApiPath.js";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("token");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access, e.g., redirect to login
//       console.error("Unauthorized access - redirecting to login");
//       // You can add your redirection logic here
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
