import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3080",
  // baseURL: "https://loadlinker-backend.onrender.com",
});
