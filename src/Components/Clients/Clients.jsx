import {IconButton, Tooltip, useTheme} from "@mui/material";
import {tokens} from "../../theme.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Box, TextField} from "@mui/material";
import { useEffect } from "react";
import CustomTable from "../Other/CustomTable.jsx";
import ClientService from "../../services/client.service.js";
import ClientStateChip from "./ClientStateChip.jsx";
import EditIcon from '@mui/icons-material/Edit';
import ClientEditDialog from "./ClientEditDialog.jsx";


const Clients = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const handleEditOpen = (client) => {
        setSelectedClient(client);
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setSelectedClient(null);
    };

    const handleClientChange = (updated) => {
        setSelectedClient(updated);
    };

    const handleSave = async (client) => {
        try {
            await ClientService.updateClient(client);
            setOpenEdit(false);
            init(); // refresca la tabla
        } catch (error) {
            alert("Error al guardar: " + (error.response?.data?.message || error.message));
        }
    };
    useEffect(() => {
        init();
    }, []);

    const filteredClient = clients.filter((clients) =>
        Object.values(clients)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const init = () => {
        ClientService
            .getAll()
            .then((response) => {
                setClients(response.data);
            })
            .catch((error) => {
                alert("Error fetching clients: " + error.response.data.message);
            });
    };

    const columns = [
        { field: "id", headerName: "ID", headerAlign: "center", align: "center" },
        { field: "firstName", headerName: "Nombre", flex: 1, headerAlign: "center", align: "center" },
        { field: "email", headerName: "Email", flex: 1, headerAlign: "center", align: "center" },
        { field: "rut", headerName: "RUT", flex: 1, headerAlign: "center", align: "center" },
        { field: "phoneNumber", headerName: "Teléfono", flex: 1, headerAlign: "center", align: "center", },
        { field: "debt", headerName: "Deuda", flex: 1, headerAlign: "center", align: "center" },
        { field: "clientState", headerName: "Estado", flex: 1, headerAlign: "center", align: "center", renderCell: (params) => <ClientStateChip state={params.value} />, },
        {
            field: "actions",
            headerName: "Acciones",
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: (params) => (
                <Tooltip title="Editar">
                    <IconButton onClick={() => handleEditOpen(params.row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ),
        }

    ];
    return (
        <Box m="50px">
            <Box mb={2} display="flex" justifyContent="flex-end" gap={2}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    sx={{ background: colors.primary[400], borderRadius: 1 }}
                />
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <button
                        style={{
                            padding: "10px 20px",
                            background: colors.greenAccent[600],
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                        onClick={() => {navigate('/clients/add')}}
                    >
                        Nuevo Cliente
                    </button>
                </Box>
            </Box>
            <CustomTable rows={filteredClient} columns={columns}/>
            <ClientEditDialog
                open={openEdit && selectedClient !== null}
                client={selectedClient || {}}
                onChange={handleClientChange}
                onClose={handleEditClose}
                onSave={handleSave}
            />

        </Box>
    );
}
export default Clients;