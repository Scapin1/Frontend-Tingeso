import {useEffect, useState} from "react";
import KardexService from "../../services/kardex.service.js";
import {Box} from "@mui/material";
import CustomTable from "../Other/CustomTable.jsx";
import KardexStateChip from "./KardexStateChip.jsx";
import dayjs from "dayjs";

const Kardex = () => {
    const [kardex, setKardex] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        KardexService
            .getAll()
            .then((response) => {
                setKardex(response.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const columns = [
        { field: "id", headerName: "ID", headerAlign: "center", align: "center" },
        { field: "toolId", headerName: "Id Herramienta", flex: 1, headerAlign: "center", align: "center" },
        { field: "user", headerName: "Usuario", flex: 1, headerAlign: "center", align: "center" },
        { field: "quantity", headerName: "Cantidad afectada", flex: 1, headerAlign: "center", align: "center" },
        { field: "movementDate", headerName: "Fecha del movimiento", flex: 1, headerAlign: "center", align: "center", renderCell: (params) => dayjs(params.value).format("DD/MM/YYYY HH:mm") },
        { field: "type", headerName: "Tipo de movimiento", flex: 1, headerAlign: "center", align: "center", renderCell: (params) => <KardexStateChip state={params.value} />,}
    ];

    return (
        <Box m="50px">
            <CustomTable rows={kardex} columns={columns}/>
        </Box>
    );

}

export default Kardex;