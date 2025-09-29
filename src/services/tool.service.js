import httpClient from "../http-common";

const getAllList = () => {
    return httpClient.get('/api/tools/getAllList');
}

const getAll = () => {
    return httpClient.get('/api/tools/getAll');
}

const add = (tool ,username) => {
    return httpClient.post( `/api/tools/addTool/${username}`, tool)
}

const getFees = id => {
    return httpClient.get(`/api/tools/getFees/${id}`);
}

const updateFee = fees => {
    return httpClient.put('/api/tools/changeFee', fees)
}

const writeOff = (id,username) => {
    return httpClient.put(`/api/tools/writeOff/${id}/${username}`);
}

export default  {
    getAllList,
    add,
    getAll,
    writeOff,
    getFees,
    updateFee
};