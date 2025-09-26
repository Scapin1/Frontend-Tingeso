import httpClient from "../http-common";

const getAllList = () => {
    return httpClient.get('/api/tools/getAllList');
}

const getAll = () => {
    return httpClient.get('/api/tools/getAll');
}

const add = data => {
    return httpClient.post('/api/tools/addTool', null, {
        params: {
            quantity: data.quantity,
            name: data.name,
            category: data.category,
            repoFee: data.repoFee,
            state: data.state,
        }
    });
}

const writeOff = id => {
    return httpClient.put('/api/tools/writeOff',null,{
        params: {
            toolId: id
        }
    });
}

export default  {
    getAllList, add, getAll, writeOff
};