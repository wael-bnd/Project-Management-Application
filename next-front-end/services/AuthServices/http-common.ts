import axios from "axios";

const API_URL = `${process.env.API_URL}/api/user`;

export default axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "*/*",
  },
});
