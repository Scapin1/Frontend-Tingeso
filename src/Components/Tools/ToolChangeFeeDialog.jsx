import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme.js";
import formatPesoCL from "../Format/formatPesoCL";

function ToolChangeFeeDialog({ open, onClose, onSave, onChange, fees }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const feeFields = [
        { key: "lateFee", label: "Late fee" },
        { key: "maintenanceFee", label: "Maintenance fee" },
        { key: "rentalFee", label: "Rental fee" },
        { key: "repoFee", label: "Repo fee" }
    ];

    // Estado local para el valor formateado de cada campo
    const [editState, setEditState] = useState({});

    React.useEffect(() => {
        // Sincroniza el estado local con los fees cuando cambian
        setEditState(feeFields.reduce((acc, { key }) => {
            acc[key] = fees[key] !== undefined && fees[key] !== null && fees[key] !== ""
                ? formatPesoCL(fees[key])
                : "";
            return acc;
        }, {}));
    }, [fees, open]);

    const handleChange = (key, value) => {
        // Permite solo números
        const numericValue = value.replace(/[^0-9]/g, "");
        // Formatea en tiempo real
        setEditState((prev) => ({
            ...prev,
            [key]: numericValue === "" ? "" : formatPesoCL(numericValue)
        }));
        const updated = { ...fees, [key]: numericValue === "" ? "" : Number(numericValue) };
        onChange?.(updated);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{
            paper: {
                sx: {
                    backgroundColor: colors.primary[600],
                    padding: 2
                }
            }
        }}>
            <DialogTitle>Editar Precios</DialogTitle>
            <DialogContent>
                {feeFields.map(({ key, label }) => (
                    <TextField
                        key={key}
                        label={label}
                        fullWidth
                        margin="dense"
                        value={editState[key] ?? ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        slotProps={{
                            input: {
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                style: { textAlign: 'right' }
                            },
                            startAdornment: {
                                children: '$',
                                position: 'start'
                            }
                        }}
                        type="text"
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={() => onSave(fees)} variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
export default ToolChangeFeeDialog;
