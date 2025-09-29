import React from 'react';
import {Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, useTheme} from '@mui/material';
import formatPhoneNumber from '../Format/PhoneFormatter.js';
import formatRut from "../Format/RutFormatter.js";
import {tokens} from "../../theme.js";

function ClientEditDialog({ open, client, onChange, onClose, onSave }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogContent>
                <TextField label="Nombre" fullWidth margin="dense" value={client.firstName} onChange={(e) => onChange({ ...client, firstName: e.target.value })} />
                <TextField label="Email" fullWidth margin="dense" value={client.email} onChange={(e) => onChange({ ...client, email: e.target.value })} />
                <TextField
                    label="Teléfono"
                    fullWidth
                    margin="dense"
                    value={client.phoneNumber}
                    onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        onChange({ ...client, phoneNumber: formatted });
                    }}
                />

                <TextField  label="RUT"
                            fullWidth margin="dense"
                            value={client.rut}
                            onChange={(e) => {
                                const formatted = formatRut(e.target.value);
                                onChange({...client, rut: formatted});
                            }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={() => onSave(client)} variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
export default ClientEditDialog;