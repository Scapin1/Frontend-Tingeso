import axios from "axios";
import keycloak from "./services/keycloak.js";

    const api = axios.create({
        baseURL: `http://192.168.1.86:8080`,
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