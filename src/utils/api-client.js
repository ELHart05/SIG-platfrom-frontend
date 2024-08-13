import axios from "axios";
import {
    SERVER_URL
} from "../../constants";

const API = axios.create({
    baseURL: SERVER_URL[
        import.meta.env.VITE_ENVIRONMENT],
    timeout: 12000,
    withCredentials: true
});

API.interceptors.request.use(async (config) => {
    return config;
});

API.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return error;
    }
);

export default API;