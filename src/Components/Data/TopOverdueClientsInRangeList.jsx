import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, CircularProgress, Box } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import loanService from "../../services/loan.service";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const TopOverdueClientsInRangeList = ({ dateFrom, dateTo }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const formatToLocalDate = (date) => {
        if (!date) return null;
        if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
        if (typeof date === 'string') return date.slice(0, 10);
        if (date.format) return date.format('YYYY-MM-DD'); // dayjs
        if (date instanceof Date) return date.toISOString().slice(0, 10);
        return String(date).slice(0, 10);
    };

    useEffect(() => {
        const startDate = formatToLocalDate(dateFrom);
        const endDate = formatToLocalDate(dateTo);
        if (!startDate || !endDate) return;
        setLoading(true);
        setError("");
        loanService.getClientsWithMostOverduesInRange(startDate, endDate)
            .then(res => setClients(res.data))
            .catch(() => setError("No se pudo cargar la información de entregas atrasadas."))
            .finally(() => setLoading(false));
    }, [dateFrom, dateTo]);

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
                height: '100%'
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
                {(!dateFrom || !dateTo) ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            Seleccione un rango de fechas
                        </Typography>
                    </Box>
                ) : loading ? (
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
                                            {client.rut}
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

export default TopOverdueClientsInRangeList;
