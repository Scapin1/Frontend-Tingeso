import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    useTheme,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import { tokens } from "../../theme";
import kardexService from "../../Services/kardex.service";

const RankingMostRequestedToolsInRange = ({ dateFrom, dateTo }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatToLocalDateTime = (date) => {
        if (!date) return null;
        if (typeof date === 'string') return date;
        if (date.format) {
            return date.format('YYYY-MM-DD');
        }
        return date.toISOString().slice(0, 19);
    };

    useEffect(() => {
        const startDate = formatToLocalDateTime(dateFrom);
        const endDate = formatToLocalDateTime(dateTo);
        if (!startDate || !endDate) return;
        setLoading(true);
        setError(null);
        kardexService.getMostRequestedToolInRange(startDate, endDate)
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : [res.data];
                setTools(data);
            })
            .catch(() => setError("No se pudo obtener el ranking en el rango."))
            .finally(() => setLoading(false));
    }, [dateFrom, dateTo]);

    return (
        <Card
            sx={{
                background: colors.primary[600],
                color: theme.palette.text.primary,
                borderRadius: 3,
                boxShadow: 3,
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CardContent
                sx={{
                    width: '100%',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="subtitle1"
                    color={colors.greenAccent[400]}
                    gutterBottom
                    fontWeight={700}
                >
                    Ranking: Más Prestadas
                </Typography>
                {(!dateFrom || !dateTo) ? (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        Seleccione un rango de fechas
                    </Typography>
                ) : loading ? (
                    <CircularProgress color="inherit" size={32} sx={{ mt: 2 }} />
                ) : error ? (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        {error}
                    </Typography>
                ) : tools && tools.length > 0 ? (
                    <List sx={{ width: '100%' }}>
                        {tools.slice(0, 5).map((tool, index) => (
                            <ListItem key={index} disableGutters>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.greenAccent[500], width: 30, height: 30 }}>
                                        <BuildIcon fontSize="small" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" fontWeight={600} color={colors.blueAccent[200]}>
                                            {tool.toolName}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color={colors.greenAccent[200]} fontWeight={500}>
                                            {tool.requestCount} préstamos
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        No hay datos de herramientas
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default RankingMostRequestedToolsInRange;
