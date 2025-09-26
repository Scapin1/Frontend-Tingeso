import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/clients/getClients');
}

const addClient = (client) => {
    return httpClient.post('/api/clients/addClient', client);
}

export default {
    getAll, addClient
}