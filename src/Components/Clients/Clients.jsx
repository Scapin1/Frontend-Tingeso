import {useTheme} from "@mui/material";
import {tokens} from "../../theme.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Box, TextField} from "@mui/material";
import { useEffect } from "react";
import CustomTable from "../Other/CustomTable.jsx";
import ClientService from "../../services/client.service.js";


const Clients = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");

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
                console.error("There was an errorrr!", error);
            });
    };

    useEffect(() => {
        init();
    }, []);

    const columns = [
        { field: "id", headerName: "ID", headerAlign: "center", align: "center" },
        { field: "firstName", headerName: "Nombre", flex: 1, headerAlign: "center", align: "center" },
        { field: "email", headerName: "Email", flex: 1, headerAlign: "center", align: "center" },
        { field: "rut", headerName: "RUT", flex: 1, headerAlign: "center", align: "center" },
        { field: "phoneNumber", headerName: "Teléfono", flex: 1, headerAlign: "center", align: "center", },
        { field: "clientState", headerName: "Estado", flex: 1, headerAlign: "center", align: "center" },
        { field: "debt", headerName: "Deuda", flex: 1, headerAlign: "center", align: "center" },
    ];
    return (
        <Box m="50px">
            <Box mb={2} display="flex" justifyContent="flex-end" gap={2}>
                <TextField
                    label="Search"
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
                        New Client
                    </button>
                </Box>
            </Box>
            <CustomTable rows={filteredClient} columns={columns}/>
        </Box>
    );
}
export default Clients;