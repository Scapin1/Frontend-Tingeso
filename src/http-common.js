import axios from "axios";
import keycloak from "./services/keycloak.js";

const API_URL = import.meta.env.VITE_API_URL || `http://${import.meta.env.VITE_API_HOST || 'localhost'}:${import.meta.env.VITE_API_PORT || '8080'}`;

    const api = axios.create({
        baseURL: API_URL,
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
