import CustomTable from "../Other/CustomTable.jsx";
import ToolStateChip from "./ToolStateChip.jsx";
import DeactivateToolButton from "../Other/DeactivateToolButton.jsx";
import toolService from "../../services/tool.service.js";

const columns = [
    { field: "id", headerName: "ID", headerAlign: "center", align: "center" },
    { field: "name", headerName: "Name", flex: 1, headerAlign: "center", align: "center" },
    { field: "category", headerName: "Category", flex: 1, headerAlign: "center", align: "center" },
    {
        field: "state",
        headerName: "State",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => <ToolStateChip state={params.value} />,
    },
    {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <DeactivateToolButton
                onDeactivate={() => {
                    alert(`Deactivate tool with ID: ${params.row.id}`);
                    toolService.writeOff(params.row.id).then(() => {
                    })
                    .catch((err) => {
                        console.error("There was an error!", err);
                    })
                }}
                disabled={params.row.state === "WRITTEN_OFF"}
            />
        ),
    },
];

const IndividualToolsTable = ({ tools, onToolDeactivated }) => {

    const columns = [
        { field: "id", headerName: "ID", headerAlign: "center", align: "center" },
        { field: "name", headerName: "Name", flex: 1, headerAlign: "center", align: "center" },
        { field: "category", headerName: "Category", flex: 1, headerAlign: "center", align: "center" },
        {
            field: "state",
            headerName: "State",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => <ToolStateChip state={params.value} />,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <DeactivateToolButton
                    onDeactivate={() => {
                        if(confirm(`sure you want to deactivate tool with ID: ${params.row.id}?`))
                            toolService.writeOff(params.row.id).then(() => {
                            onToolDeactivated();
                        })
                            .catch((err) => {
                                console.error("There was an error!", err);
                            })
                    }}
                    disabled={params.row.state === "WRITTEN_OFF"}
                />
            ),
        },
    ];

    return <CustomTable rows={tools} columns={columns} />
};

export default IndividualToolsTable;