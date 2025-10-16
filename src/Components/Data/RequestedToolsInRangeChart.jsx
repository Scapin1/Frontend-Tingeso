import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, Typography, Box, useTheme, CircularProgress } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { tokens } from "../../theme";
import kardexService from "../../services/kardex.service";

const RequestedToolsInRangeChart = ({ dateFrom, dateTo }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Convierte a string ISO con formato 'YYYY-MM-DDTHH:mm:ss'
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
        kardexService.getRequestedToolsInRange(startDate, endDate)
            .then(res => setData(res.data))
            .catch(() => setError("No se pudo obtener los datos de herramientas en el rango."))
            .finally(() => setLoading(false));
    }, [dateFrom, dateTo]);

    // Preparar datos para el gráfico (una serie por herramienta)
    const { toolNames, series } = useMemo(() => {
        if (!data || data.length === 0) return { toolNames: [], series: [] };
        const toolNames = data.map(item => item.toolName || "Sin herramienta");
        const counts = data.map(item => item.requestCount || 0);
        const barPalette = [
            "#1976d2", "#9c27b0", "#ff9800", "#43a047", "#e53935", "#00acc1",
            "#f44336", "#3f51b5", "#4caf50", "#ffeb3b", "#795548", "#607d8b"
        ];
        const series = toolNames.map((tool, idx) => ({
            data: [counts[idx]],
            label: tool,
            color: barPalette[idx % barPalette.length],
        }));
        return { toolNames, series };
    }, [data]);

    return (
        <Card sx={{ background: colors.primary[600], display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    sx={{ color: colors.greenAccent[400], fontWeight: 700 }}
                >
                    Préstamos por Herramienta (Rango de Fechas)
                </Typography>
                {(!dateFrom || !dateTo) ? (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        Seleccione un rango de fechas para ver el gráfico
                    </Typography>
                ) : loading ? (
                    <CircularProgress color="inherit" size={32} sx={{ mt: 2 }} />
                ) : error ? (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        {error}
                    </Typography>
                ) : (toolNames.length === 0) ? (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        No hay datos para el rango seleccionado
                    </Typography>
                ) : (
                    <Box sx={{ borderRadius: 2, p: 2, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <BarChart
                            xAxis={[{ data: ["Préstamos"], scaleType: "band", label: "" }]}
                            series={series}
                            height={350}
                            legend={{ position: { vertical: "top", horizontal: "right" } }}
                            sx={{
                                borderRadius: 2,
                                "& .MuiChartsAxis-root": { color: colors.primary[200] },
                                "& .MuiChartsLegend-root": { color: colors.primary[200] },
                            }}
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default RequestedToolsInRangeChart;
