import axios from "axios";
const apis = axios.create({
  baseURL: "http://3.35.167.81:8080",
  // baseURL: "http://0848-210-205-134-193.ngrok.io",
});
export default apis;
