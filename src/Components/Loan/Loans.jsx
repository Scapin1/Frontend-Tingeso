import {Box, TextField, useTheme} from "@mui/material";
import {tokens} from "../../theme.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import LoanService from "../../services/loan.service.js";
import CustomTable from "../Other/CustomTable.jsx";


const Loans = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [loans, setLoans] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        LoanService
            .getAllLoans()
            .then((response) => {
                setLoans(response.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const columns = [
        { field: "id", headerName: "ID", headerAlign: "center", align: "center" },
        { field: "toolLoaned", headerName: "ID Herramienta", flex: 1, headerAlign: "center", align: "center" },
        { field: "client", headerName: "ID Cliente", flex: 1, headerAlign: "center", align: "center" },
        { field: "loanDate", headerName: "Fecha Préstamo", flex: 1, headerAlign: "center", align: "center" },
        { field: "returnDate", headerName: "Fecha Devolución", flex: 1, headerAlign: "center", align: "center" },
        { field: "status", headerName: "Estado", flex: 1, headerAlign: "center", align: "center" },
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
            <CustomTable rows={loans} columns={columns}/>
        </Box>
    );
}
export default Loans;