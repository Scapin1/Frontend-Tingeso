import CustomTable from "../Other/CustomTable.jsx";

const groupTools = (tools) => {
    const grouped = {};
    tools.forEach((tool) => {
        const key = `${tool.name}-${tool.category}`;
        if (!grouped[key]) {
            grouped[key] = { ...tool, quantity: 1 };
        } else {
            grouped[key].quantity += 1;
        }
    });
    return Object.values(grouped);
};

const columns = [
    { field: "name", headerName: "Nombre", flex: 1, headerAlign: "center", align: "center" },
    { field: "category", headerName: "Categoría", flex: 1, headerAlign: "center", align: "center" },
    { field: "stock", headerName: "Cantidad", flex: 1, headerAlign: "center", align: "center" },
];

const GroupedToolsTable = ({ tools }) => {
    const groupedRows = groupTools(tools).map((row, idx) => ({ ...row, id: idx + 1 }));
    return <CustomTable rows={groupedRows} columns={columns} />;
};

export default GroupedToolsTable;