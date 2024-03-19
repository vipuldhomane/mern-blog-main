import axios from "axios";

// Create an instance of Axios with custom configuration
export const axiosInstance = axios.create({
  baseURL: "https://mern-blog-main-ds4m.onrender.com", // Replace this with your API base URL
  //   baseURL: "http://localhost:8000", // Replace this with your API base URL
  timeout: 10000, // Adjust the timeout as needed
  withCredentials: true, // Allow cookies to be sent with cross-origin requests (for authentication)
});
