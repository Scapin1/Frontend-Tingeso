import CustomTable from "../Other/CustomTable.jsx";
import ToolStateChip from "./ToolStateChip.jsx";
import DeactivateToolButton from "./DeactivateToolButton.jsx";
import toolService from "../../services/tool.service.js";
import React, {useState} from "react";
import ToolService from "../../services/tool.service.js";
import EditIcon from "@mui/icons-material/Edit";
import {IconButton, Tooltip, Box, Snackbar, Button} from "@mui/material";
import ToolChangeFeeDialog from "./ToolChangeFeeDialog.jsx";
import keycloak from "../../services/keycloak.js";
import ErrorSnackbar from "../General/ErrorSnackbar";
import MuiAlert from "@mui/material/Alert";

const IndividualToolsTable = ({ tools, onToolDeactivated }) => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [toolToDeactivate, setToolToDeactivate] = useState(null);

    const handleEditOpen = async (tool) => {
        try {
            const response = await ToolService.getFees(tool.id);
            setSelectedTool(response.data);
            setOpenEdit(true);
        } catch (error) {
            setError("Error al obtener tarifas: " + (error.response?.data?.message || error.message));
            setOpenError(true);
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
            setError("Error al guardar: " + (error.response?.data?.message || error.message));
            setOpenError(true);
        }
    };

    const handleDeactivate = (id) => {
        setToolToDeactivate(id);
        setConfirmOpen(true);
    };

    const handleConfirmDeactivate = () => {
        if (toolToDeactivate) {
            toolService.writeOff(toolToDeactivate, keycloak.tokenParsed.preferred_username)
                .then(() => {
                    onToolDeactivated();
                })
                .catch((err) => {
                    setError("Error al desactivar: " + (err.response?.data?.message || err.message));
                    setOpenError(true);
                });
        }
        setConfirmOpen(false);
        setToolToDeactivate(null);
    };

    const handleCancelDeactivate = () => {
        setConfirmOpen(false);
        setToolToDeactivate(null);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenError(false);
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
                        onDeactivate={() => handleDeactivate(params.row.id)}
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
            <ErrorSnackbar
                message={error}
                open={openError}
                onClose={handleCloseError}
            />
            <Snackbar
                open={confirmOpen}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleCancelDeactivate}
                autoHideDuration={null}
            >
                <MuiAlert elevation={6} severity="warning" sx={{ width: '100%' }} onClose={handleCancelDeactivate}>
                    {`¿Está seguro que desea desactivar la herramienta con id: ${toolToDeactivate.id}?`}
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleCancelDeactivate} color="inherit" style={{ marginRight: 8 }}>
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmDeactivate} color="error" variant="contained">
                            Desactivar
                        </Button>
                    </Box>
                </MuiAlert>
            </Snackbar>
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