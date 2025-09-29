import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme} from "@mui/material";
import React from "react";
import {tokens} from "../../theme.js";


function ToolChangeFeeDialog({ open, onClose, onSave, onChange, fees }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const feeFields = [
        { key: "lateFee", label: "Late fee" },
        { key: "maintenanceFee", label: "Maintenance fee" },
        { key: "rentalFee", label: "Rental fee" },
        { key: "repoFee", label: "Repo fee" }
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{
            paper: {
                sx: {
                    backgroundColor: colors.primary[500], // Fondo del diálogo
                    padding: 2
                }
            }
        }}
        >
            <DialogTitle>Editar Precios</DialogTitle>
            <DialogContent>
                {feeFields.map(({ key, label }) => (
                    <TextField
                        key={key}
                        label={label}
                        fullWidth
                        margin="dense"
                        value={fees[key] ?? ""}
                        onChange={(e) => {
                            const updated = { ...fees, [key]: e.target.value };
                            onChange?.(updated);
                        }}
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