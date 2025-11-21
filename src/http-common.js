import axios from "axios";
import keycloak from "./services/keycloak.js";

const API_HOST = import.meta.env.VITE_API_HOST || '192.168.1.86';
const API_PORT = import.meta.env.VITE_API_PORT || '8080';

    const api = axios.create({
        baseURL: `http://${API_HOST}:${API_PORT}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    api.interceptors.request.use(
    async (config) => {
        if(keycloak.authenticated){
            await keycloak.updateToken(30);
            config.headers.Authorization = `Bearer ${keycloak.token}`;
        }
        return config;
    }, (error) => {
            return Promise.reject(error);
    });
    export default api;