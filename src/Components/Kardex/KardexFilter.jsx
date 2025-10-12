// KardexFilter.jsx
import { Box, TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";


const KardexFilter = ({ onFilter }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [toolId, setToolId] = useState("");

    const handleFilter = () => {
        onFilter({
            startDate: startDate ? dayjs(startDate).hour(0).minute(0).format("YYYY-MM-DDTHH:mm") : null,
            endDate: endDate ? dayjs(endDate).hour(23).minute(59).format("YYYY-MM-DDTHH:mm") : null,
            toolId: toolId.trim() !== "" ? toolId.trim() : null,
        });
    };

    const handleClear = () => {
        setStartDate(null);
        setEndDate(null);
        setToolId("");
        onFilter({ startDate: null, endDate: null, toolId: null });
    };

    return (
        <Box display="flex" gap={2} alignItems="center" mb={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Fecha inicio"
                    value={startDate}
                    onChange={setStartDate}
                    format={'YYYY-MM-DD'}
                    slotProps={{ textField: { size: "small" } }}
                />
                <DatePicker
                    label="Fecha fin"
                    value={endDate}
                    onChange={setEndDate}
                    format={'YYYY-MM-DD'}
                    slotProps={{ textField: { size: "small" } }}
                />
            </LocalizationProvider>
            <TextField
                label="ID Herramienta"
                value={toolId}
                onChange={e => setToolId(e.target.value)}
                size="small"
            />
            <Button variant="contained" color="primary" onClick={handleFilter}>
                Filtrar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear}>
                Limpiar
            </Button>
        </Box>
    );
};

export default KardexFilter;
