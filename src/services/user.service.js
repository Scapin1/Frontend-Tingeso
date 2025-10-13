import httpClient from "../http-common";

const get = () => {
    return httpClient.get('/api/users/getUsers');
}

export default { get};
