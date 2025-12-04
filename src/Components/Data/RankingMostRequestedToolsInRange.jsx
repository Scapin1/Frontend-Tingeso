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
                    color={colors.greenAccent[400]}
                    gutterBottom
                    fontWeight={700}
                    textAlign="center"
                    sx={{ mb: 2 }}
                >
                    Ranking: Más Prestadas
                </Typography>
                {(!dateFrom || !dateTo) ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            Seleccione un rango de fechas
                        </Typography>
                    </Box>
                ) : loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <CircularProgress color="inherit" size={32} />
                    </Box>
                ) : error ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            {error}
                        </Typography>
                    </Box>
                ) : tools && tools.length > 0 ? (
                    <List sx={{ width: '100%' }}>
                        {tools.slice(0, 5).map((tool, index) => (
                            <ListItem key={index} disableGutters divider={index !== tools.length - 1}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.greenAccent[500], width: 40, height: 40 }}>
                                        <BuildIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" fontWeight={600} color={colors.grey[100]}>
                                            {tool.toolName}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color={colors.greenAccent[400]} fontWeight={500}>
                                            {tool.requestCount} préstamos
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            No hay datos de herramientas
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default RankingMostRequestedToolsInRange;
