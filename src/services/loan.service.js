import httpClient from "../http-common";

const getAllLoans = () => {
    return httpClient.get('/api/loans/getAll');
}

const addLoan = loan => {
    return httpClient.post('/api/loans/addLoan', loan);
}

export default {
    getAllLoans,
    addLoan,
}