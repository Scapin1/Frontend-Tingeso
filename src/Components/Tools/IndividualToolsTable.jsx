import CustomTable from "../Other/CustomTable.jsx";
import ToolStateChip from "./ToolStateChip.jsx";
import DeactivateToolButton from "./DeactivateToolButton.jsx";
import toolService from "../../services/tool.service.js";
import {useState} from "react";
import ToolService from "../../services/tool.service.js";
import EditIcon from "@mui/icons-material/Edit";
import {IconButton, Tooltip, Box} from "@mui/material";
import ToolChangeFeeDialog from "./ToolChangeFeeDialog.jsx";

const IndividualToolsTable = ({ tools, onToolDeactivated }) => {

    const [selectedTool, setSelectedTool] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const handleEditOpen = async (tool) => {
        try {
            const response = await ToolService.getFees(tool.id);
            setSelectedTool(response.data);
            setOpenEdit(true);
        } catch (error) {
            alert("Error al obtener tarifas: " + (error.response?.data?.message || error.message));
        }
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setSelectedTool(null);
    };

    const handleFeeChange = (updated) => {
        setSelectedTool(updated);
    };

    const handleSave = async (fee) => {
        try {
            await ToolService.updateFee(fee);
            setOpenEdit(false);
        } catch (error) {
            alert("Error al guardar: " + (error.response?.data?.message || error.message));
        }
    };

    const columns = [
        { field: "id", headerName: "ID", headerAlign: "center", align: "center" },
        { field: "name", headerName: "Nombre", flex: 1, headerAlign: "center", align: "center" },
        { field: "category", headerName: "Categoría", flex: 1, headerAlign: "center", align: "center" },
        {
            field: "state",
            headerName: "Estado",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => <ToolStateChip state={params.value} />,
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box>
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
                    <Tooltip title="Editar">
                        <IconButton onClick={() => handleEditOpen(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return(
        <Box>
            <CustomTable rows={tools} columns={columns} />
            <ToolChangeFeeDialog
                open={openEdit && selectedTool !== null}
                fees={selectedTool || {}}
                onChange={handleFeeChange}
                onClose={handleEditClose}
                onSave={handleSave}
            />
        </Box>
    );
};

export default IndividualToolsTable;