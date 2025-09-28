import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/clients/getClients');
}

const addClient = (client) => {
    return httpClient.post('/api/clients/addClient', client);
}

const updateClient = (client) => {
    return httpClient.put("/api/clients/updateClient", client);
}

export default {
    getAll,
    addClient,
    updateClient
}