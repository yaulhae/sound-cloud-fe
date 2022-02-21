import axios from 'axios';
const apis = axios.create({
    baseURL: 'http://e3c1-210-205-134-193.ngrok.io',
});
export default apis;
