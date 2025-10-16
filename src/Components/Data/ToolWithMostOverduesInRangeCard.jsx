import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    useTheme,
    CircularProgress
} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import BuildIcon from '@mui/icons-material/Build';
import loanService from "../../services/loan.service";
import { tokens } from "../../theme";

const ToolWithMostOverduesInRangeCard = ({ dateFrom, dateTo }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [tool, setTool] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
        loanService.getToolWithMostOverduesInRange(startDate, endDate)
            .then(res => setTool(res.data))
            .catch(() => setError("No se pudo cargar la información de herramienta con más atrasos."))
            .finally(() => setLoading(false));
    }, [dateFrom, dateTo]);

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
                <Avatar sx={{ bgcolor: colors.redAccent[400], width: 50, height: 50, mb: 2 }}>
                    <ErrorIcon fontSize="large" />
                </Avatar>
                <Typography
                    variant="subtitle1"
                    color={colors.redAccent[400]}
                    gutterBottom
                    fontWeight={700}
                >
                    Herramienta con más atrasos
                </Typography>
                {(!dateFrom || !dateTo) ? (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        Seleccione un rango de fechas
                    </Typography>
                ) : loading ? (
                    <CircularProgress color="error" size={28} />
                ) : error ? (
                    <Typography color={colors.redAccent[100]}>{error}</Typography>
                ) : !tool || !tool.toolName ? (
                    <Typography color={theme.palette.text.secondary}>No hay datos.</Typography>
                ) : (
                    <Box textAlign="center">
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>{tool.toolName}</Typography>
                            <Typography variant="body2" color={colors.redAccent[100]}>
                                {tool.overdueCount} Atrasos
                            </Typography>
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ToolWithMostOverduesInRangeCard;
