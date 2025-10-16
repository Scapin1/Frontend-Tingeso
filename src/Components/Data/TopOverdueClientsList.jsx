import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, CircularProgress, Box } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import loanService from "../../services/loan.service";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const TopOverdueClientsList = ({ sx }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        loanService.getClientsWithMostOverdues()
            .then(res => setClients(res.data))
            .catch(() => setError("No se pudo cargar la información de entregas atrasadas."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card
            sx={{
                background: colors.primary[600],
                color: theme.palette.text.primary,
                borderRadius: 3,
                boxShadow: 3,
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                ...sx
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" mb={2} p={1} borderRadius={2} sx={{ background: colors.redAccent[700], color: colors.redAccent[100] }}>
                    <ErrorIcon sx={{ color: colors.redAccent[200], mr: 1 }} />
                    <Typography variant="h6" color={colors.redAccent[100]}>
                        Clientes con más atrasos
                    </Typography>
                </Box>
                {loading ? (
                    <CircularProgress color="error" size={28} />
                ) : error ? (
                    <Typography color={colors.redAccent[100]}>{error}</Typography>
                ) : (
                    <List dense>
                        {clients.length === 0 && (
                            <Typography color={colors.redAccent[100]}>No hay datos de atrasos.</Typography>
                        )}
                        {clients.map((client, idx) => (
                            <ListItem key={client.id || idx}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.redAccent[400] }}>
                                        <HighlightOffIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<span style={{ fontWeight: 600 }}>{client.name || client.rut || 'Cliente'}</span>}
                                    secondary={<span style={{ color: colors.redAccent[100] }}>Atrasos: {client.overdueCount}</span>}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default TopOverdueClientsList;
