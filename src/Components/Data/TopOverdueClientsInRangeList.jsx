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
        <Card sx={{
            background: colors.primary[600],
            color: colors.grey[100],
            borderRadius: 3,
            boxShadow: 3,
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <CardContent sx={{ width: '100%', p: 3 }}>
                <Box display="flex" alignItems="center" mb={2} p={1} borderRadius={2} sx={{ background: colors.redAccent[700], color: colors.redAccent[100] }}>
                    <ErrorIcon sx={{ color: colors.redAccent[200], mr: 1 }} />
                    <Typography variant="h6" color={colors.redAccent[100]}>
                        Clientes con más atrasos
                    </Typography>
                </Box>
                {(!dateFrom || !dateTo) ? (
                    <Typography variant="body2" color={colors.redAccent[100]}>
                        Seleccione un rango de fechas
                    </Typography>
                ) : loading ? (
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
                                    primary={client.rut}
                                    secondary={`Atrasos: ${client.overdueCount}`}
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
