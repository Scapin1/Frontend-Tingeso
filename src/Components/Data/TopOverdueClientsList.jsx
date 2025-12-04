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
                minHeight: 250,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                ...sx
            }}
        >
            <CardContent
                sx={{
                    width: '100%',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexGrow: 1
                }}
            >
                <Typography
                    variant="h5"
                    color={colors.redAccent[400]}
                    gutterBottom
                    fontWeight={700}
                    textAlign="center"
                    sx={{ mb: 2 }}
                >
                    Clientes con más atrasos
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <CircularProgress color="error" size={32} />
                    </Box>
                ) : error ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography color={colors.redAccent[100]}>{error}</Typography>
                    </Box>
                ) : (
                    <List sx={{ width: '100%' }}>
                        {clients.length === 0 && (
                            <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                                <Typography variant="body1" color={colors.redAccent[100]}>
                                    No hay datos de atrasos.
                                </Typography>
                            </Box>
                        )}
                        {clients.map((client, idx) => (
                            <ListItem key={client.id || idx} disableGutters divider={idx !== clients.length - 1}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.redAccent[400], width: 40, height: 40 }}>
                                        <HighlightOffIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" fontWeight={600} color={colors.grey[100]}>
                                            {client.name || client.rut || 'Cliente'}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color={colors.redAccent[100]}>
                                            Atrasos: {client.overdueCount}
                                        </Typography>
                                    }
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
