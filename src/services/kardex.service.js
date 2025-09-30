import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/api/kardex/getAll");
}

export default {
    getAll,
}