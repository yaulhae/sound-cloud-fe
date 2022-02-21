import axios from 'axios';
const apis = axios.create({
  baseURL: "http://3.35.167.81:8080",
});
export default apis;
