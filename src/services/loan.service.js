import httpClient from "../http-common";

const getAllLoans = () => {
    return httpClient.get('/api/loans/getAll');
}

const addLoan = (loan, username) => {
    return httpClient.post(`/api/loans/addLoan/${username}`, loan);
}

const returnLoan = (loanId, damaged, username) => {
    return httpClient.put(`/api/loans/returnLoan/${loanId}/${damaged}/${username}`);

}
export default {
    getAllLoans,
    addLoan,
    returnLoan
}