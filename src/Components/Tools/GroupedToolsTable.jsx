import CustomTable from "../Other/CustomTable.jsx";
import formatPesoCL from "../Format/formatPesoCL";

const columns = [
    { field: "name", headerName: "Nombre", flex: 1, headerAlign: "center", align: "center" },
    { field: "category", headerName: "Categoría", flex: 1, headerAlign: "center", align: "center" },
    { field: "stock", headerName: "Cantidad", flex: 1, headerAlign: "center", align: "center" },
    {
        field: "repoFee",
        headerName: "Repo Fee",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => formatPesoCL(params.value)
    },
    {
        field: "maintenanceFee",
        headerName: "Maintenance Fee",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => formatPesoCL(params.value)
    },
    {
        field: "rentalFee",
        headerName: "Rental Fee",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => formatPesoCL(params.value)
    },
    {
        field: "lateFee",
        headerName: "Late Fee",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => formatPesoCL(params.value)
    },
];

const GroupedToolsTable = ({ tools }) => {
    return <CustomTable rows={tools} columns={columns} />;
};

export default GroupedToolsTable;