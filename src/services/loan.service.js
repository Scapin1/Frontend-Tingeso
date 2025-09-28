import httpClient from "../http-common";

const getAllLoans = () => {
    return httpClient.get('/api/loans/getAll');
}

const addLoan = loan => {
    return httpClient.post('/api/loans/addLoan', loan);
}

const returnLoan = (loanId, damaged) => {
    return httpClient.put(`/api/loans/returnLoan/${loanId}/${damaged}`);

}
export default {
    getAllLoans,
    addLoan,
    returnLoan
}