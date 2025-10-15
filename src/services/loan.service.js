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

const getTopClients = () => {
    return httpClient.get('/api/loans/clientWithMostLoans');
}

const getClientsWithMostOverdues = () => {
    return httpClient.get('/api/loans/clientsWithMostOverdues');
}

const getToolWithMostOverdues = () => {
    return httpClient.get('/api/loans/toolWithMostOverdues');
}

const getClientsWithMostLoansInRange = (startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    return httpClient.get(`/api/loans/clientsWithMostLoansInRange?${params.toString()}`);
};

const getClientsWithMostOverduesInRange = (startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    return httpClient.get(`/api/loans/clientsWithMostOverduesInRange?${params.toString()}`);
};

const getToolWithMostOverduesInRange = (startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    return httpClient.get(`/api/loans/toolWithMostOverduesInRange?${params.toString()}`);
};

export default {
    getAllLoans,
    addLoan,
    returnLoan,
    getTopClients,
    getClientsWithMostOverdues,
    getToolWithMostOverdues,
    getClientsWithMostLoansInRange,
    getClientsWithMostOverduesInRange,
    getToolWithMostOverduesInRange
}