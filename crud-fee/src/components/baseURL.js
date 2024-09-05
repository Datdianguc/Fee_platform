import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.88.63:8081/api/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json', }
});


export default api;