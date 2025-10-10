import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import LoanService from "../../services/loan.service.js";
import CustomTable from "../Other/CustomTable.jsx";
import LoanStateChip from "./LoanStateChip.jsx";
import ReturnLoanButton from "./ReturnLoanButton.jsx";


const Loans = () => {
    const [loans, setLoans] = useState([]);

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
        { field: "toolLoaned", headerName: "Herramienta", flex: 1, headerAlign: "center", align: "center" },
        { field: "toolId", headerName: "ID Herramienta", flex: 1, headerAlign: "center", align: "center" },
        { field: "client", headerName: "RUT Cliente", flex: 1, headerAlign: "center", align: "center" },
        { field: "loanDate", headerName: "Fecha Préstamo", flex: 1, headerAlign: "center", align: "center" },
        { field: "returnDate", headerName: "Fecha Devolución", flex: 1, headerAlign: "center", align: "center" },
        { field: "status", headerName: "Estado", flex: 1, headerAlign: "center", align: "center", renderCell: (params) => <LoanStateChip state={params.value} />,
        },
        {
            field: "actions",
            headerName: "Acción",
            flex: 1,
            headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <ReturnLoanButton
                    loanId={params.row.id}
                    toolId={params.row.toolLoaned.id}
                    status={params.row.status}
                    onReturned={init}
                />
            ),
        }
    ];

    return (
        <Box m="50px">
            <CustomTable rows={loans} columns={columns}/>
        </Box>
    );
}
export default Loans;