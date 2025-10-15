import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/api/kardex/getAll");
}

const getFilteredKardex = (startDate, endDate, toolId) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (toolId) params.append("toolId", toolId);
    return httpClient.get(`/api/kardex/filter?${params.toString()}`);
};

const getLoanByMonthAndToolName = () => {
    return httpClient.get("/api/kardex/loansByMonthAndToolName");
}

const getMostRequestedTool = () => {
    return httpClient.get("/api/kardex/mostRequestedTool");
}

const getMostRequestedToolInRange = (startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    return httpClient.get(`/api/kardex/mostRequestedToolInRange?${params.toString()}`);
};

const getRequestedToolsInRange = (startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    return httpClient.get(`/api/kardex/requestedToolsInRange?${params.toString()}`);
};

export default {
    getAll,
    getFilteredKardex,
    getLoanByMonthAndToolName,
    getMostRequestedTool,
    getMostRequestedToolInRange,
    getRequestedToolsInRange
}